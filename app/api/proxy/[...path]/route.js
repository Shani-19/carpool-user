import { NextResponse } from 'next/server';

async function handleProxy(request, { params }) {
    const path = params.path.join('/');
    const url = new URL(request.url);
    const targetUrl = `https://partners.carpoolkr.com/${path}${url.search}`;

    console.log(`Proxying ${request.method} request to: ${targetUrl}`);

    const headers = new Headers();
    request.headers.forEach((value, key) => {
        // Skip host and other headers that should be set by fetch
        if (!['host', 'connection', 'content-length'].includes(key.toLowerCase())) {
            headers.set(key, value);
        }
    });

    try {
        let body;
        if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
            const contentType = request.headers.get('content-type');
            if (contentType?.includes('multipart/form-data')) {
                body = await request.formData();
            } else {
                body = await request.text();
            }
        }

        const response = await fetch(targetUrl, {
            method: request.method,
            headers,
            body,
            redirect: 'manual',
            cache: 'no-store'
        });

        const newHeaders = new Headers();
        response.headers.forEach((value, key) => {
            if (key.toLowerCase() === 'set-cookie') {
                // IMPORTANT: Fetch merges multiple Set-Cookie headers into one with commas.
                // However, some environments support getSetCookie().
                // Here we handle the string and strip Domain attributes.
                const cookies = response.headers.getSetCookie 
                    ? response.headers.getSetCookie() 
                    : [value];
                
                cookies.forEach(cookie => {
                    const modifiedCookie = cookie.replace(/Domain=[^;]+;?\s*/gi, '');
                    newHeaders.append('Set-Cookie', modifiedCookie);
                });
            } else {
                newHeaders.set(key, value);
            }
        });

        const data = await response.arrayBuffer();

        return new NextResponse(data, {
            status: response.status,
            headers: newHeaders
        });
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json({ error: 'Proxy failed', message: error.message }, { status: 500 });
    }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
