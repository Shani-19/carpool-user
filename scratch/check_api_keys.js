
const axios = require('axios');

async function checkApi(orderNum) {
    try {
        const response = await axios.get(`https://partners.carpoolkr.com/api/orders/${orderNum}`);
        console.log(`--- Keys for ${orderNum} ---`);
        console.log(Object.keys(response.data));
        // console.log(JSON.stringify(response.data.data, null, 2));
    } catch (error) {
        console.error(`Error fetching ${orderNum}:`, error.message);
    }
}

checkApi('CP003154');
checkApi('CP002705');
