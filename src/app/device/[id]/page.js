import { MongoClient, ObjectId } from 'mongodb'
import DeviceInfo from "./deviceinfo.js"

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


    //console.log(device)

    if (!device) {
        return <div>Device not found</div>
    }

    const plainDevice = {
        ...JSON.parse(JSON.stringify(device))
    };

    return (
        <div>
            <DeviceInfo deviceId={device._id.toString()} deviceData={plainDevice} />
        </div>
    )
}
