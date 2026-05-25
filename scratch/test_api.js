const axios = require('axios');

async function checkVin() {
  try {
    const res = await axios.post('https://partners.carpoolkr.com/api/report-check', {
      vin: 'KNANE81BBSS585699'
    }, {
      headers: {
        'Accept': 'application/json'
      }
    });
    console.log("Status:", res.status);
    console.log("Data:", res.data);
  } catch (err) {
    console.error("Error Status:", err.response ? err.response.status : err.message);
    console.error("Error Data:", err.response ? err.response.data : null);
  }
}

checkVin();
