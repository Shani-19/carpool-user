
export const consigneeConfig = [
    { label: 'Consignee Name', accessor: 'name', type: 'text' },
    { label: 'Email Address', accessor: 'email', type: 'email' },

    { label: 'RNC', accessor: 'rnc', type: 'text' },
    { label: 'Phone Number', accessor: 'mobile', type: 'tel' },

    { label: 'Country', accessor: 'shipping.name', type: 'select-country' },
    { label: 'Postal Code', accessor: 'zip_code', type: 'text', optional: true },

    { label: 'Registered Address', accessor: 'address', type: 'textarea', fullWidth: true },
    { label: null, accessor: null },
];

export const quotationConfig = [
    // { label: 'Destination Country', accessor: 'country.name', type: 'select' },
    { label: 'Destination Country', accessor: 'shipping.name', type: 'select-country' },
    { label: 'Destination Port', accessor: 'port.port', type: 'select-port' },

    { label: 'Shipping Method', accessor: 'port_charges.size', type: 'select-charges' },
    { label: 'Estimated Transit Time', accessor: 'port_charges.shipping_time', type: 'text' },
];

export const documentConfig = [
    { label: 'Recipient Name', accessor: 'd_name', type: 'text' },
    { label: 'Phone Number', accessor: 'd_mobile', type: 'tel' },

    { label: 'Country', accessor: 'shipping.name', type: 'select-country' },
    { label: 'Postal Code', accessor: 'd_zip_code', type: 'text', optional: true },

    { label: 'Delivery Address', accessor: 'd_address', type: 'textarea', fullWidth: true },
    { label: null, accessor: null },

    { label: 'Special Instructions', accessor: 'comment', type: 'textarea', fullWidth: true },
    { label: null, accessor: null }
];
