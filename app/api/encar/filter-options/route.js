import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const targetUrl = `https://partners.carpoolkr.com/api/encar/filter-options?${queryString}`;

    try {
        console.log(`Manual proxying (fetch) to: ${targetUrl}`);
        
        const headers = new Headers();
        request.headers.forEach((value, key) => {
            if (key.toLowerCase() !== 'host') {
                headers.set(key, value);
            }
        });
        
        headers.set('origin', 'https://partners.carpoolkr.com');
        headers.set('referer', 'https://partners.carpoolkr.com/');

        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: headers,
            cache: 'no-store'
        });

        console.log(`Manual proxy (fetch) response status: ${response.status}`);
        
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error(`Manual proxy (fetch) CRITICAL error:`, error.message);
        return NextResponse.json({ 
            error: 'Failed to fetch filter options', 
            message: error.message 
        }, { status: 500 });
    }
}
