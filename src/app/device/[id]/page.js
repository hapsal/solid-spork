import { MongoClient, ObjectId } from 'mongodb'
import Link from 'next/link'

async function getDeviceById(id) {
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect()
        const db = client.db('register-form')
        const collection = db.collection('registered-devices')

        const device = await collection.findOne({ _id: new ObjectId(id) });
        
        return device
    } catch (error) {
        console.error('Error fetching device:', error);
        throw error
    } finally {
        await client.close()
    }
}

async function getAllDeviceIds() {
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    await client.connect()
    const db = client.db('register-form')
    const devices = await db.collection('registered-devices').find({}, { projection: { _id: 1 } }).toArray()
    await client.close()

    return devices.map(device => ({ params: { id: device._id.toString() } }))
}

export async function getStaticPaths() {
    const paths = await getAllDeviceIds()
    return {
        paths,
        fallback: 'blocking', 
    }
}

export default async function Device({ params }) {
    const device = await getDeviceById(params.id)

    //console.log(device)

    if (!device) {
        return <div>Device not found</div>
    }

    return (
        <div>
            <h1>Device information: </h1>
            <section>
                <article>
                    <h2>User information</h2>
                    <p>Name: {device.name}</p>
                    <p>Email: {device.email}</p>
                </article>
                <article>
                    <h2>Organization</h2>
                    <p>Cost Center: {device.costcenter}</p>
                    <p>Location: {device.location}</p>
                    <p>Home CO-Domain: {device.homedomain}</p>
                </article>
                <article>
                    <h2>Device</h2>
                    <p>Device name: {device.deviceName}</p>
                    <p>Device type: {device.devicetype}</p>
                    <p>Manufacturer: {device.manufacturer}</p>
                    <p>Model: {device.model}</p>
                    <p>MAC-Address: {device.mac}</p>
                    <p>UUID: {device.uuid}</p>
                    <p>Registered on: {new Date(device.entryDate).toLocaleDateString()}</p>
                    <p>Warranty: {device.warranty ? device.warranty : "Not set"}</p>
                    <p>BIOS-password: {device.biospass ? device.biospass : "Not set"}</p>
                    <p>Wake-On-Lan: {device.wol ? device.wol : "Not set"}</p>
                    <p>Wake-On-Lan-Omit: {device.wolo ? device.wolo : "Not set"}</p>
                    <p>DirectAccess: {device.da ? device.da : "Not set"}</p>
                    <p>Local admin-password: WORK IN PROGRESS</p>
                    <p>Password expires: WORK IN PROGRESS</p>
                    <p>Extra information: {device.extrainfo ? device.extrainfo : "None"}</p>
                </article>
                <div>
                    <button><Link href="#">Delete device</Link></button>
                    <button type="submit">Edit device</button>
                </div>
            </section>
        </div>
    )
}
