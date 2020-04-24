const domain = 'https://jsonplaceholder.typicode.com';

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin":"*",
    'Origin': window.location.origin
}


const getRequest = async (route) => {
    const rawResponse = await fetch(`${domain}${route}`, {
        cors: 'cors',
        method: "GET",
        headers
    });
    return await rawResponse.json();
}

export default getRequest;