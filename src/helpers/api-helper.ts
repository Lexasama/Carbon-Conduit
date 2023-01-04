export async function toJSON(resp: Response) {
    const result = await resp.text();
    if (result) return JSON.parse(result);
}

type RequestMethod = 'POST' | 'PUT' | 'DELETE' | 'GET';

async function send(url: string, method: RequestMethod, data?: any, contentType?: string, isRetrying = false): Promise<Response> {
    const jwtToken = localStorage.getItem('jwtToken');
    let options: any = {
        method: method,
        headers: {
            "Content-Type": contentType,
            'Authorization': `Token ${jwtToken}`
        },
        mode: 'cors',
    };
    if (data) options.body = JSON.stringify(data);
    if (contentType) options.headers['Content-Type'] = contentType;

    const result = await fetch(url, options);

    if(result.status === 401 && !isRetrying){
        await send(url, method, contentType, contentType, true);
    }

    return result;
}

export function postAsync(url: string, data: any) {
    return send(url, 'POST', data, 'application/json');
}

export function putAsync(url: string, data: any) {
    return send(url, "PUT", data, 'application/json');
}

export function getAsync(url: string) {
    return send(url, 'GET');
}

export function deleteAsync(url: string) {
    return send(url, 'DELETE');
}