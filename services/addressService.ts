
"use server"
var url = process.env.API_ADDRESS_URL

export  async function getProvince() {

    const result = await fetch(url + '/1/0.htm')

    return await handleResponse(result)
}

export  async function getDistrict(id: string) {

    const result = await fetch(url + `/2/${id}.htm`)

    return await handleResponse(result)
}

export  async function getWard(id: string) {

    const result = await fetch(url + `/3/${id}.htm`)

    return await handleResponse(result)
}


async function handleResponse(response: Response) {
    const data = await response.json();
    const res = {
        status: response.status,
        data: response.status === 200 ? data.data : {},
    }
    return res;
}
