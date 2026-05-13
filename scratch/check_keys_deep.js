
const axios = require('axios');

async function checkApi(orderNum) {
    try {
        const response = await axios.get(`https://partners.carpoolkr.com/api/orders/${orderNum}`);
        const data = response.data.data;
        console.log(`--- Keys for ${orderNum} ---`);
        console.log(Object.keys(data));
        if (data.container) console.log('container:', data.container);
        if (data.containers) console.log('containers:', data.containers);
    } catch (error) {
        console.error(`Error fetching ${orderNum}:`, error.message);
    }
}

checkApi('CP002705');
