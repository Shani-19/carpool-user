import { NextResponse } from 'next/server';
import axios from 'axios';

const ENCAR_HEADERS = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'Origin': 'https://fem.encar.com',
    'Referer': 'https://fem.encar.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
};

export async function GET(request, { params }) {
    const id = params.id;

    try {
        console.log(`Proxying Encar recommend request for ID: ${id}`);
        const res = await axios.get(`https://api.encar.com/legacy/usedcar/sale/cars/recommend/${id}`, {
            headers: {
                ...ENCAR_HEADERS,
                'Referer': `https://fem.encar.com/cars/detail/${id}`
            }
        });

        return NextResponse.json(res.data);
    } catch (error) {
        console.error(`Error proxying Encar recommend for ${id}:`, error.message);
        return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
    }
}
