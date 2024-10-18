import { z } from 'zod'
import { isMACAddress, isUUID } from 'validator'
import { MongoClient } from 'mongodb'

const schema = z.object({
    mac: z.string().refine(
        val => isMACAddress(val),
        { message: 'Please enter a valid MAC address' }
    ),
    uuid: z.string().refine(
        val => isUUID(val),
        { message: 'Please enter a valid UUID' }
    )
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

async function generateDeviceName(collection) {
    const newDate = new Date()
    const orgInitials = "CO-"

    const lastDeviceName = await getLastDeviceName(collection)

    let lastIncrement = 0
    if (lastDeviceName) {
        lastIncrement = parseInt(lastDeviceName.slice(-3), 10)
    }

    const newIncrement = lastIncrement + 1

    const deviceName = orgInitials +
        Number(String(newDate.getFullYear()).slice(2)) +
        String(newDate.getMonth() + 1).padStart(2, '0') +
        String(newIncrement).padStart(2, '0')

    return deviceName
}

export async function POST(req, { params }) {
    const slug = params.slug

    if (slug === 'register-form') {
        try {
            const data = await req.json()

            schema.parse(data);

            const { client, db } = await connectToDatabase()
            const collection = db.collection('registered-devices')

            try {
                const deviceName = await generateDeviceName(collection)
                
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
                    printqueue: data.printqueue,
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