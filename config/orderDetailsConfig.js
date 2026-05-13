
export const consigneeConfig = [
    { label: 'Name', accessor: 'name', type: 'text' }, 
    { label: 'Email', accessor: 'email', type: 'email' }, 

    { label: 'RNC', accessor: 'rnc', type: 'text' }, 
    { label: 'Mobile', accessor: 'mobile', type: 'tel' }, 

    { label: 'Country', accessor: 'shipping.name', type: 'select-country' },
    { label: 'Zip Code', accessor: 'zip_code', type: 'text', optional: true },

    { label: 'Address', accessor: 'address', type: 'textarea', fullWidth: true },
    { label: null, accessor: null },
];

export const quotationConfig = [
    // { label: 'Destination Country', accessor: 'country.name', type: 'select' },
    { label: 'Destination Country', accessor: 'shipping.name', type: 'select-country' },
    { label: 'Destination Port', accessor: 'port.port', type: 'select-port' },
    
    { label: 'Shipping Type', accessor: 'port_charges.size', type: 'select-charges' },
    { label: 'Shipping Time', accessor: 'port_charges.shipping_time', type: 'text' },
];

export const documentConfig = [
    { label: 'Name', accessor: 'd_name', type: 'text' },
    { label: 'Mobile', accessor: 'd_mobile', type: 'tel' },

    { label: 'Country', accessor: 'shipping.name', type: 'select-country' },
    { label: 'Zip Code', accessor: 'd_zip_code', type: 'text', optional: true },

    { label: 'Address', accessor: 'd_address', type: 'textarea', fullWidth: true },
    { label: null, accessor: null },
    
    { label: 'Comment', accessor: 'comment', type: 'textarea', fullWidth: true },
    { label: null, accessor: null }
];
