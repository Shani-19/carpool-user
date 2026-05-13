
const axios = require('axios');

async function checkApi(orderNum) {
    try {
        const response = await axios.get(`https://partners.carpoolkr.com/api/orders/${orderNum}`);
        const data = response.data.data;
        console.log(`--- Values for ${orderNum} ---`);
        const keys = ['Invoice', 'payment_receipt', 'bl', 'payment_receipt_1', 'bl_slander', 'container', 'receipt_status', 'receipt_status_1'];
        keys.forEach(k => {
            console.log(`${k}: ${data[k]}`);
        });
    } catch (error) {
        console.error(`Error fetching ${orderNum}:`, error.message);
    }
}

checkApi('CP003154');
checkApi('CP002705');
