const domain = 'https://jsonplaceholder.typicode.com';

let headers = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
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