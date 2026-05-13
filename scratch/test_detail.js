const axios = require('axios');

async function testDetail() {
    const id = '41769411';
    const url = `https://api.encar.com/v1/readside/vehicle/${id}/`;
    
    try {
        console.log('Testing detail connection to:', url);
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Origin': 'https://fem.encar.com',
                'Referer': `https://fem.encar.com/cars/detail/${id}`
            }
        });
        console.log('Response status:', response.status);
        console.log('Response data:', JSON.stringify(response.data).substring(0, 100));
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

testDetail();
