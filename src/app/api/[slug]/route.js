import { z } from 'zod'
import { isMACAddress, isUUID } from 'validator'

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

export async function POST(req, { params }) {
    const slug = params.slug

    if (slug === 'register-form') {
        try {
            const data = await req.json()

            schema.parse(data)

            return new Response(JSON.stringify({ message: "Device registered!" }), { status: 200 })
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message
                    return acc
                }, {})

                return new Response(JSON.stringify({ errors: fieldErrors }), { status: 400 })
            }

            return new Response(JSON.stringify({ message: "An unexpected error occurred" }), { status: 500 })
        }
    }

    return new Response(JSON.stringify({ message: "Endpoint not found" }), { status: 404 })
}
