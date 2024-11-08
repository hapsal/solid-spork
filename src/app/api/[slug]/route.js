import { z } from 'zod'
import { isMACAddress, isUUID } from 'validator'
import { MongoClient, ObjectId } from 'mongodb'


const schema = z.object({
    mac: z.string().refine(
        val => isMACAddress(val),
        { message: 'Please enter a valid MAC address e.g.: B2:99:F4:75:A1:82' }
    ),

    /* doesnt work exactly as it should
     uuid: z.string().refine(
        val => isUUID(val),
        { message: 'Please enter a valid UUID e.g.: f47ac10b-58cc-4372-a567-0e02b2c3d479' }
    ),
    */
})

async function connectToDatabase() {
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    await client.connect()
    return { client, db: client.db('register-form') }
}

async function getLastDeviceName(collection) {
    const lastDevice = await collection
        .find({})
        .sort({ entryDate: -1 })
        .limit(1)
        .toArray()

    return lastDevice.length ? lastDevice[0].deviceName : null
}

async function isDeviceNameExists(collection, deviceName) {
    const count = await collection.countDocuments({ deviceName })
    return count > 0
}

async function generateDeviceName(collection) {
    const newDate = new Date()
    const orgInitials = "CO-"
    
    let lastDeviceName = await getLastDeviceName(collection)
    let lastIncrement = 0

    if (lastDeviceName) {
        const lastIncrementString = lastDeviceName.slice(-2)
        lastIncrement = parseInt(lastIncrementString, 10)
    }

    let newIncrement = lastIncrement + 1

    let deviceName
    
    while (true) {
        deviceName = orgInitials +
            Number(String(newDate.getFullYear()).slice(2)) +
            String(newDate.getMonth() + 1).padStart(2, '0') +
            String(newIncrement).padStart(2, '0')

        if (!(await isDeviceNameExists(collection, deviceName))) {
            break
        }
        
        newIncrement++
    }

    return deviceName
}

async function generateLocalPassword() {
    const length = 15
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0

    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
        counter += 1
    }
    return result

}


export async function POST(req, { params }) {
    const slug = params.slug

    if (slug === 'register-form') {
        try {
            const data = await req.json()

            schema.parse(data)

            const { client, db } = await connectToDatabase()
            const collection = db.collection('registered-devices')

            try {
                const deviceName = await generateDeviceName(collection)

                const localPass = data.devicetype !== 'Printer' ? await generateLocalPassword() : null

                let existingDevice

                if (data.devicetype !== 'Printer') {
                    existingDevice = await collection.findOne({
                        $or: [
                            { mac: data.mac },
                            { uuid: data.uuid },
                            { serviceid: data.serviceid }
                        ]
                    })
                } else {
                    existingDevice = await collection.findOne({
                        mac: data.mac
                    })
                }

                if (existingDevice) {
                    const errors = {}
                
                    if (existingDevice.mac === data.mac) {
                        errors["mac"] = `MAC address is already registered`
                    }
                
                    if (existingDevice.uuid === data.uuid) {
                        errors["uuid"] = "UUID is already registered"
                    }

                    if (existingDevice.serviceid === data.serviceid) {
                        errors["serviceid"] = "Service ID is already registered"
                    }

                
                    if (Object.keys(errors).length > 0) {
                        return new Response(JSON.stringify({ errors }), {
                            status: 400,
                            headers: { 'Content-Type': 'application/json' }
                        })
                    }
                }

                const rawRegisterData = {
                    deviceName: deviceName,
                    name: data.name,
                    email: data.email,
                    costcenter: data.costcenter,
                    location: data.location,
                    homedomain: data.homedomain,
                    addtodomain: data.addtodomain,
                    devicetype: data.devicetype,
                    manufacturer: data.manufacturer,
                    model: data.model,
                    mac: data.mac,
                    uuid: data.uuid,
                    serviceid: data.serviceid,
                    date: data.date,
                    warranty: data.warranty,
                    biospass: data.biospass,
                    wol: data.wol,
                    wolo: data.wolo,
                    da: data.da,
                    localpass: localPass,
                    printqueue: data.printqueue,
                    printerpurpose: data.printerpurpose,
                    extrainfo: data.extrainfo,
                    entryDate: new Date()
                }

                await collection.insertOne(rawRegisterData)

                return new Response(JSON.stringify({ message: "Device registered successfully!", deviceName }), { status: 201 })
            } catch (error) {
                console.error('Database error:', error)
                return new Response(JSON.stringify({ message: "Database error occurred!" }), { status: 500 })
            } finally {
                await client.close()
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message
                    return acc
                }, {})

                return new Response(JSON.stringify({ errors: fieldErrors }), { status: 400 })
            }

            console.error('Unexpected error:', error)
            return new Response(JSON.stringify({ message: "Unexpected server error!" }), { status: 500 })
        }
    }
    return new Response(JSON.stringify({ message: "Endpoint not found" }), { status: 404 })
}

export async function GET(res, { params }) {
    const slug = params.slug

    if (slug === 'devicelist') {
        try {
            const { client, db } = await connectToDatabase()
            const collection = db.collection('registered-devices')
    
            const devices = await collection.find().sort({ entryDate: -1 }).limit(10).toArray()
    
            await client.close()
    
            return new Response(JSON.stringify(devices), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            })
        } catch (error) {
            console.error('Database error:', error)
            return new Response(JSON.stringify({ message: 'Failed to retrieve devices' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            })
        }
    }
    
}

export async function DELETE(req, { params }) {
    const slug = params.slug

    if (slug === 'delete') {
        const data = await req.json()
        const { id } = data

        if (!id) {
            return new Response(JSON.stringify({ message: 'ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            })
        }

        let client
        let db
        try {
            ({ client, db } = await connectToDatabase())
            const collection = db.collection('registered-devices')
            const result = await collection.deleteOne({ _id: new ObjectId(id) })

            if (result.deletedCount === 1) {
                return new Response(JSON.stringify({ message: 'Device deleted successfully' }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                })
            } else {
                return new Response(JSON.stringify({ message: 'Device not found' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                })
            }
        } catch (error) {
            console.error('Error deleting device:', error)
            return new Response(JSON.stringify({ message: 'Internal server error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            })
        } finally {
            if (client) {
                await client.close()
            }
        }
    } else {
        return new Response(JSON.stringify({ message: `Method Not Allowed` }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}

export async function PUT(req, { params }) {
    const slug = params.slug

    if (slug === 'update-device') {
        const data = await req.json();
        //console.log("Data received for update:", data)

        const { id, ...updateFields } = data

        if (!id) {
            return new Response(JSON.stringify({ message: 'ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            })
        }

        if (Object.keys(updateFields).length === 0) {
            return new Response(JSON.stringify({ message: 'No fields to update' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            })
        }

        let client
        let db

        try {
            ({ client, db } = await connectToDatabase())
            const collection = db.collection('registered-devices')

            const result = await collection.updateOne(
                { _id: new ObjectId(id) }, 
                { $set: updateFields } 
            );

            if (result.modifiedCount === 1) {
                return new Response(JSON.stringify({ message: 'Device updated successfully' }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                })
            } else {
                return new Response(JSON.stringify({ message: 'Device not found or no changes made' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                })
            }
        } catch (error) {
            console.error('Error updating device:', error)
            return new Response(JSON.stringify({ message: 'Internal server error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            })
        } finally {
            await client.close()
        }
    } else {
        return new Response(JSON.stringify({ message: `Method Not Allowed` }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}