const axios = require('axios');

async function test() {
  try {
    let res = await axios.get('https://partners.carpoolkr.com/api/countries');
    console.log('/countries:', res.status);
  } catch(e) { console.log('/countries:', e.response?.status); }

  try {
    let res = await axios.get('https://partners.carpoolkr.com/api/ports-by-country?country_id=1');
    console.log('/ports-by-country:', res.status);
  } catch(e) { console.log('/ports-by-country:', e.response?.status); }

  try {
    let res = await axios.get('https://partners.carpoolkr.com/api/port-charges?country_id=1&port_id=1&port_size_id=1');
    console.log('/port-charges:', res.status);
  } catch(e) { console.log('/port-charges:', e.response?.status); }

  try {
    let res = await axios.get('https://partners.carpoolkr.com/api/bookings/ports-by-country?country_id=1');
    console.log('/bookings/ports-by-country:', res.status);
  } catch(e) { console.log('/bookings/ports-by-country:', e.response?.status); }
}

test();
