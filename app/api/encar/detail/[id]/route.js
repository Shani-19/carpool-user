import { NextResponse } from 'next/server';
import axios from 'axios';

const ENCAR_HEADERS = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
};

export async function GET(request, { params }) {
    console.log("HIT ENCAR DETAIL PROUTE", params);
    const id = params.id;

    try {
        console.log(`Proxying Encar detail request for ID: ${id}`);
        const res = await axios.get(`https://api.encar.com/v1/readside/vehicle/${id}/`, {
            headers: {
                ...ENCAR_HEADERS,
                'Origin': 'https://fem.encar.com',
                'Referer': `https://fem.encar.com/cars/detail/${id}`
            }
        });

        console.log(`Encar API response status for ${id}: ${res.status}`);

        if (!res.data) {
            console.warn(`Empty response from Encar for ID: ${id}`);
            return NextResponse.json({ error: 'Empty response from Encar' }, { status: 404 });
        }

        return NextResponse.json(res.data);
    } catch (error) {
        console.error(`Error proxying Encar detail for ${id}:`, error.message);
        if (error.response) {
            console.error('Encar API response error:', error.response.status, error.response.data);
        }
        return NextResponse.json({ error: 'Failed to fetch vehicle detail', message: error.message }, { status: 500 });
    }
}
