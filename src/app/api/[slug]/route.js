export async function POST(res, {params}) {
    let response = {message: 'Invalid request'}
    const slug = params.slug

    if (slug === 'register-form') {
        const data = await res.json()

        if (!data) {
            response = {message: "Error"}
        } else {
            response = {message: "Device registered!"}
        }

       //return Response.json(JSON.stringify(data))
       return Response.json(response)
    } else {

    }
}