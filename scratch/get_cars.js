const axios = require('axios');

axios.get('https://partners.carpoolkr.com/api/cars')
  .then(res => {
    const cars = res.data?.data || res.data;
    if (Array.isArray(cars)) {
      console.log("Found cars:");
      cars.slice(0, 5).forEach(car => {
        console.log(`- Slug: ${car.slug}, Name: ${car.name}, VIN: ${car.vin}`);
      });
    } else {
      console.log("No array returned. Keys:", Object.keys(res.data));
      if (res.data?.data && typeof res.data.data === 'object') {
        const nestedData = res.data.data.data || res.data.data;
        if (Array.isArray(nestedData)) {
          console.log("Found nested cars:");
          nestedData.slice(0, 5).forEach(car => {
            console.log(`- Slug: ${car.slug}, Name: ${car.name}, VIN: ${car.vin}`);
          });
        } else {
          console.log("Nested data keys:", Object.keys(res.data.data));
        }
      }
    }
  })
  .catch(err => {
    console.error("Error fetching cars:", err.message);
  });
