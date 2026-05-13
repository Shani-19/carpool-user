
const axios = require('axios');

async function checkApi(orderNum) {
    try {
        const response = await axios.get(`https://partners.carpoolkr.com/api/orders/${orderNum}`);
        const data = response.data.data;
        console.log(`--- More Values for ${orderNum} ---`);
        const keys = ['bl_document_pdf', 'bl_receipt_pdf', 'container'];
        keys.forEach(k => {
            console.log(`${k}:`, data[k]);
        });
    } catch (error) {
        console.error(`Error fetching ${orderNum}:`, error.message);
    }
}

checkApi('CP003154');
checkApi('CP002705');
