import { MongoClient, ObjectId } from 'mongodb'
import Link from 'next/link'
import styles from "./device.module.css";

async function getDeviceById(id) {
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    try {
        await client.connect()
        const db = client.db('register-form')
        const collection = db.collection('registered-devices')

        const device = await collection.findOne({ _id: new ObjectId(id) })
        
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

    console.log(device)

    if (!device) {
        return <div>Device not found</div>
    }

    return (
        <div>
            <section className={styles.devicesection}>
                <h1>Device information for: <label className={styles.deviceinfoname}>{device.deviceName}</label></h1>
                <article>
                    <h2>User information</h2>
                    <p>Name: <label>{device.name}</label></p>
                    <p>Email: <label>{device.email}</label></p>
                </article>
                <article>
                    <h2>Organization</h2>
                    <p>Cost Center: <label>{device.costcenter}</label></p>
                    <p>Location: <label>{device.location}</label></p>
                    <p>Home CO-Domain: <label>{device.homedomain}</label></p>
                </article>
                <article>
                    <h2>Device</h2>
                    <p>Device name: <label>{device.deviceName}</label></p>
                    <p>Device type: <label>{device.devicetype}</label></p>
                    <p>Manufacturer: <label>{device.manufacturer}</label></p>
                    <p>Model: <label>{device.model}</label></p>
                    <p>MAC-Address: <label>{device.mac}</label></p>
                    <p>UUID: <label>{device.uuid}</label></p>
                    <p>Registered on: <label>{new Date(device.entryDate).toLocaleDateString()}</label></p>
                    <p>Warranty Expiry: <label>{device.entryDate ? new Date(new Date(device.entryDate).setFullYear(new Date(device.entryDate).getFullYear() + 3)).toLocaleDateString() : "Not set"}</label></p>
                    <p>BIOS-password: <label>{device.biospass ? device.biospass : "Not set"}</label></p>
                    <p>Wake-On-Lan: <label>{device.wol ? device.wol : "Not set"}</label></p>
                    <p>Wake-On-Lan-Omit: <label>{device.wolo ? device.wolo : "Not set"}</label></p>
                    <p>DirectAccess: <label>{device.da ? "Set": "Not set"}</label></p>
                    <p>Local admin-password: <label>WORK IN PROGRESS</label></p>
                    <p>Password expires: <label>WORK IN PROGRESS</label></p>
                    <p>Extra information: <label>{device.extrainfo ? device.extrainfo : "None"}</label></p>
                </article>
                <div className={styles.deviceinfobuttons}>
                    <button className={styles.deletebutton}><Link href="#">Delete device</Link></button>
                    <button className={styles.editbutton} type="submit">Edit device</button>
                </div>
            </section>
        </div>
    )
}
