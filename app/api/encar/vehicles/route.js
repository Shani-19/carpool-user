import { NextResponse } from 'next/server';
import axios from 'axios';

const ENCAR_HEADERS = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'Origin': 'https://fem.encar.com',
    'Referer': 'https://fem.encar.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
};

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const vehicleIds = searchParams.get('vehicleIds');
    const include = searchParams.get('include') || 'SPEC,PHOTOS,CATEGORY,ADVERTISEMENT';

    if (!vehicleIds) {
        return NextResponse.json({ error: 'vehicleIds parameter is required' }, { status: 400 });
    }

    try {
        console.log(`Proxying Encar multi-vehicle request for IDs: ${vehicleIds}`);
        const res = await axios.get(`https://api.encar.com/v1/readside/vehicles`, {
            params: { vehicleIds, include },
            headers: {
                ...ENCAR_HEADERS,
                'Referer': 'https://fem.encar.com/'
            }
        });

        return NextResponse.json(res.data);
    } catch (error) {
        console.error(`Error proxying Encar multi-vehicle request:`, error.message);
        return NextResponse.json({ error: 'Failed to fetch vehicles list' }, { status: 500 });
    }
}
