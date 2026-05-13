import React, { useState } from 'react';
import { authAPI } from "@/utils/api";
import './DetailCard.css';

// --- Utilities --------------------------------------------------------------------------------
const getNestedValue = (obj, path) => {
    if (!obj || !path || typeof path !== 'string') return null;
    return path.split('.').reduce((current, key) =>
        (current && current[key] !== undefined) ? current[key] : null, obj
    );
};

const chunkArray = (arr, size) => {
    if (!arr || arr.length === 0) return [];
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
        chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
};

// --- Sub Components -----------------------------------------------------------------------------------------
const DataDisplayItem = ({ label, value, customClass = '' }) => {
    if (label === null) return null; // Placeholder item

    return (
        <div className={`dt-info-item ${customClass}`}>
            <label>{label}</label>
            <p className="font-semibold">{value ? value : '-'}</p>
        </div>
    );
};

const renderConfigItem = (item, itemIndex, data) => {
    // Handle placeholder (label: null)
    if (item.label === null) return null;
    // Default rendering using accessor
    const value = getNestedValue(data, item.accessor);

    const dynamicLabel = (item.label == 'RNC' ? (data.label ? data.label : 'RNC') : item.label);
    // console.log(dynamicLabel);
    return (
        <DataDisplayItem
            key={`item-${itemIndex}`}
            // label={item.label}
            label={dynamicLabel}
            value={value}
        />
    );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className="modal d-block show" tabIndex="-1" role="dialog"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1050,
                paddingRight: '17px'
            }}
            onClick={onClose}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document"
                onClick={e => e.stopPropagation()}
            >
                <div className="modal-content shadow-lg rounded">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="modal-body">
                            <div className="row g-3">
                                {children}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// --- Main Component -----------------------------------------------------------------------------------------
const DetailCard = ({ title, data, countries = [], PortCharges = [], ports = [], config = [], editable, bookingType, section, vehicles = null, portSizeId }) => {
    const [tableData, setTableData] = useState(data);
    const [vehiclesData, setVehiclesData] = useState(vehicles || []);
    const [updateErrors, setUpdateErrors] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({});

    // Quotation Section > dynamic dropdowns
    const [dynamicPorts, setDynamicPorts] = useState(ports);
    const [dynamicPortCharges, setDynamicPortCharges] = useState(PortCharges);
    const [loadingPorts, setLoadingPorts] = useState(false);
    const [loadingCharges, setLoadingCharges] = useState(false);

    editable = section == 'quotation' ? (bookingType == 'Single' && editable ? true : false) : editable;
    // console.log(editable, bookingType)

    // Handler to open the modal
    const handleEditClick = () => {
        const initialFormState = {};
        config.forEach(item => {
            if (item.accessor) {
                if (item.accessor === 'shipping.name' && tableData.shipping) {
                    initialFormState['shipping_country_id'] = tableData.shipping.id || '';
                } else if (item.accessor === 'port.port' && tableData.port) {
                    initialFormState['port_id'] = tableData.port.id || '';
                } else if (item.accessor === 'port_charges.size' && tableData.port_charges) {
                    initialFormState['port_charges_id'] = +tableData.port_charges.id || '';
                    initialFormState['shipping_time'] = tableData.port_charges.shipping_time || '';
                    initialFormState['size'] = tableData.port_charges.size || '';
                    initialFormState['port_size_id'] = portSizeId || '';
                } else {
                    initialFormState[item.accessor] = getNestedValue(tableData, item.accessor) || '';
                }
            } else if (item.label && item.label !== null) {
                initialFormState[item.label] = '';
            }
        });

        // for RNC label in edit model
        // initialFormState.label = 'RNC (Test Label)'
        initialFormState.label = tableData.label;
        // console.log(initialFormState)
        setEditFormData(initialFormState);
        setIsModalOpen(true);
        setUpdateErrors({});

        // Initialize dynamic data
        if (section === 'quotation' && initialFormState.shipping_country_id) {
            fetchPorts(initialFormState.shipping_country_id);
            if (initialFormState.port_id && portSizeId) {
                fetchPortCharges(initialFormState.shipping_country_id, initialFormState.port_id);
            }
        }
    };

    // Fetch ports based on country
    const fetchPorts = async (countryId) => {
        if (!countryId) return;

        try {
            setLoadingPorts(true);
            const response = await authAPI.getPortsByCountry({ country_id: countryId });

            // console.log(response)
            if (response.data.success) {
                setDynamicPorts(response.data.ports);
            }
        } catch (error) {
            console.error('Error fetching ports:', error);
            setDynamicPorts([]);
        } finally {
            setLoadingPorts(false);
        }
    };

    // Fetch port charges based on country and port
    const fetchPortCharges = async (countryId, portId) => {
        if (!countryId || !portId || !portSizeId) return;

        try {
            setLoadingCharges(true);
            const response = await authAPI.getPortCharges({
                country_id: countryId,
                port_id: portId,
                port_size_id: portSizeId
            });

            if (response.data.success) {
                // console.log(response.data.port_charges)
                setDynamicPortCharges(response.data.port_charges);
            }
        } catch (error) {
            console.error('Error fetching port charges:', error);
            setDynamicPortCharges([]);
        } finally {
            setLoadingCharges(false);
        }
    };

    // Handler for updating form fields
    const handleFormChange = async (e) => {
        const { name, value } = e.target;
        const newFormData = {
            ...editFormData,
            [name]: value
        };

        // console.log(newFormData)
        if (section === 'quotation' && name === 'port_charges_id' && value) {
            // Find the selected port charge by id to get shipping time
            const selectedCharge = dynamicPortCharges.find(charge => charge.id == value);
            if (selectedCharge) {
                newFormData.shipping_time = selectedCharge.shipping_time;
            }
        }

        setEditFormData(newFormData);
        // console.log(editFormData)

        // Clear errors
        if (updateErrors[name]) {
            setUpdateErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }

        // Handle dynamic updates for quotation section
        if (section === 'quotation') {
            if (name === 'shipping_country_id') {
                // Clear port and charges when country changes
                newFormData.port_id = '';
                newFormData.port_size_id = '';
                newFormData.shipping_time = '';
                setEditFormData(newFormData);
                setDynamicPorts([]);
                setDynamicPortCharges([]);

                // Fetch new ports
                if (value) {
                    await fetchPorts(value);
                }
            } else if (name === 'port_id') {
                // Clear charges when port changes
                newFormData.port_size_id = '';
                newFormData.shipping_time = '';
                setEditFormData(newFormData);
                setDynamicPortCharges([]);

                // Fetch new port charges
                if (value && newFormData.shipping_country_id && portSizeId) {
                    await fetchPortCharges(newFormData.shipping_country_id, value);
                }
            }
        }
    };

    // Handler for saving the form
    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const refinedData = { ...editFormData };
            // console.log(refinedData)

            // Remove unnecessary fields
            if (refinedData['shipping.name']) {
                delete refinedData['shipping.name'];
            }
            // delete refinedData['shipping.name'];
            delete refinedData['port.port'];
            delete refinedData['port_charges.size'];
            delete refinedData['shipping_time'];
            delete refinedData['label'];
            // console.log(refinedData)

            const payload = {
                id: data.id,
                section: section,
                data: refinedData
            };
            // console.log('payload:', payload);

            const response = await authAPI.bookingDetailUpdate(payload);
            // console.log(response, vehiclesData[0].shipping_cost)

            if (response.status === 201) {
                setUpdateSuccess(true);
                setIsModalOpen(false);
                setTableData(response.data.data);

                if (section === 'quotation' && response.data.data.port_charges) {
                    const updatedShippingCost = response.data.data.port_charges.charges;

                    setVehiclesData(prevVehicles =>
                        prevVehicles.map(vehicle => ({
                            ...vehicle,
                            shipping_cost: updatedShippingCost // Update ALL vehicles
                        }))
                    );
                }
                // console.log(vehiclesData, response.data.data.port_charges.charges);

                setUpdateErrors({});
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                const formattedErrors = {};

                Object.keys(validationErrors).forEach(key => {
                    const fieldName = key.replace('data.', '');
                    formattedErrors[fieldName] = validationErrors[key][0];
                });

                setUpdateErrors(formattedErrors);
            } else if (error.response && error.response.status === 404) {
                setUpdateErrors({ general: 'Record not found. Please refresh the page.' });
            } else {
                setUpdateErrors({ general: 'Something went wrong. Please try again.' });
            }
        }
    };

    // Generating Config Based Form Fields
    const modalFormFields = config.map((item, index) => {
        if (item.label === null) return null;

        const inputName = item.accessor || item.label;

        // Determine the actual field names
        let fieldName = inputName;
        if (item.accessor === 'shipping.name') {
            fieldName = 'shipping_country_id';
        } else if (item.accessor === 'port.port') {
            fieldName = 'port_id';
        } else if (item.accessor === 'port_charges.size') {
            fieldName = 'port_charges_id';
        } else if (item.accessor === 'port_charges.shipping_time') {
            fieldName = 'shipping_time'; // read-only field
        }

        const inputValue = editFormData[fieldName] !== undefined ? editFormData[fieldName] : '';
        const colClass = item.fullWidth ? 'col-12' : 'col-md-6';

        const fieldLabel = (item.label == 'RNC' ? (editFormData.label ? editFormData.label : 'RNC') : item.label);

        // const isRequired = !fieldName.includes('zip_code');
        const excludedFieldNames = ['zip_code', 'shipping_time'];
        const isRequired = !excludedFieldNames.some(term => fieldName.includes(term));

        // Determine field type
        let fieldType = item.type;
        if (!fieldType) {
            if (fieldLabel.toLowerCase().includes('country')) fieldType = 'select-country';
            else if (fieldLabel.toLowerCase().includes('port')) fieldType = 'select-port';
            else if (fieldLabel.toLowerCase().includes('shipping') || fieldLabel.toLowerCase().includes('type')) fieldType = 'select-charges';
            else if (fieldLabel === 'Address' || fieldLabel === 'Comment') fieldType = 'textarea';
            else if (fieldName.includes('email')) fieldType = 'email';
            else if (fieldName.includes('mobile')) fieldType = 'tel';
            else fieldType = 'text';
        }

        return (
            <div key={`form-field-${index}`} className={colClass}>
                <label htmlFor={fieldName} className="form-label">
                    {/* {item.label} */}
                    {fieldLabel}
                    {isRequired && <span className="text-danger"> *</span>}
                </label>

                {loadingPorts && fieldType === 'select-port' && (
                    <span className="text-muted small ms-3 mt-1">Loading ports...</span>
                )}

                {loadingCharges && fieldType === 'select-charges' && (
                    <span className="text-muted small ms-3 mt-1">Loading shipping types...</span>
                )}

                {fieldType === 'textarea' ? (
                    <textarea
                        id={fieldName}
                        name={fieldName}
                        value={inputValue}
                        onChange={handleFormChange}
                        rows="3"
                        className={`form-control ${updateErrors[fieldName] ? 'is-invalid' : ''}`}
                        required={isRequired}
                        placeholder={`Enter ${item.label}`}
                    />
                ) : fieldType === 'select-country' ? (
                    <select
                        id={fieldName}
                        name={fieldName}
                        value={inputValue || ''}
                        onChange={handleFormChange}
                        className={`form-select form-control ${updateErrors[fieldName] ? 'is-invalid' : ''}`}
                        required={isRequired}
                    >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                ) :
                    fieldType === 'select-port' ? (
                        <select
                            id={fieldName}
                            name={fieldName}
                            value={inputValue || ''}
                            onChange={handleFormChange}
                            className={`form-select form-control ${updateErrors[fieldName] ? 'is-invalid' : ''}`}
                            required={isRequired}
                            disabled={loadingPorts || !editFormData.shipping_country_id}
                        >
                            <option value="">Select Port</option>
                            {dynamicPorts.map((port) => (
                                <option key={port.id} value={port.id}>
                                    {port.port}
                                </option>
                            ))}
                        </select>
                    ) :
                        fieldType === 'select-charges' ? (
                            <select
                                id={fieldName}
                                name={fieldName}
                                value={inputValue || ''}
                                onChange={handleFormChange}
                                className={`form-select form-control ${updateErrors[fieldName] ? 'is-invalid' : ''}`}
                                required={isRequired}
                                disabled={loadingCharges || !editFormData.port_id}
                            >
                                <option value="">Select Shipping Type</option>
                                {dynamicPortCharges.map((charge) => (
                                    <option key={charge.id} value={charge.id}>
                                        {charge.size}
                                        {/* {charge.shipping_time} - USD {charge.charges} ({charge.size}) */}
                                    </option>
                                ))}
                            </select>

                        ) :
                            fieldType === 'text' && fieldName.includes('shipping_time') ? (
                                <input
                                    id={fieldName}
                                    name={fieldName}
                                    type={fieldType}
                                    value={inputValue}
                                    onChange={handleFormChange}
                                    className={`form-control ${updateErrors[fieldName] ? 'is-invalid' : ''}`}
                                    required={isRequired}
                                    placeholder={`Enter ${item.label}`}
                                    disabled
                                />
                            ) : (
                                <input
                                    id={fieldName}
                                    name={fieldName}
                                    type={fieldType}
                                    value={inputValue}
                                    onChange={handleFormChange}
                                    className={`form-control ${updateErrors[fieldName] ? 'is-invalid' : ''}`}
                                    required={isRequired}
                                    placeholder={`Enter ${item.label}`}
                                />
                            )}

                {updateErrors[fieldName] && (
                    <div className="invalid-feedback d-block">
                        {updateErrors[fieldName]}
                    </div>
                )}
            </div>
        );
    }).filter(Boolean);

    if (updateErrors.general) {
        modalFormFields.unshift(
            <div key="general-error" className="col-12">
                <div className="alert alert-danger">
                    {updateErrors.general}
                </div>
            </div>
        );
    }

    // --- Content Generation ---
    const safeConfig = config || [];
    const configRows = chunkArray(safeConfig, 2);

    const standardContent = configRows.map((row, rowIndex) => {
        const isFullWidthRow = row.some(item => item.fullWidth);
        const rowClasses = `dt-info-row ${isFullWidthRow ? 'dt-row-full-width' : ''}`;

        return (
            <div key={`config-row-${rowIndex}`} className={rowClasses}>
                {row.map((item, itemIndex) => renderConfigItem(item, itemIndex, tableData))}
            </div>
        );
    });

    const vehicleContent = (vehiclesData && vehiclesData.length > 0) ? (

        <div className="vehicle-list-wrapper">
            {vehiclesData.map((item, itemIndex) => (
                <div key={`vehicle-${item.id || itemIndex}`} className="dt-info-row">
                    <DataDisplayItem
                        label={`Vehicle Cost ${bookingType !== 'Single' ? '(' + item.vehicleNo + ')' : ''}`}
                        value={`USD ${item.price}`}
                    />
                    <DataDisplayItem
                        label='Shipping Cost'
                        value={item.shipping_cost && item.shipping_cost !== '-' ? `USD ${item.shipping_cost}` : '-'}
                    />
                </div>
            ))}
        </div>
    ) : null;

    return (
        <>
            <div className='dt-section-card shadow-sm'>
                <div className="dt-section-header">
                    <h4>{title}</h4>
                    {/* {true && ( */}
                    {editable && (
                        <button
                            className="dt-btn-primary"
                            onClick={handleEditClick}
                            aria-label={`Edit ${title}`}>
                            Edit
                        </button>
                    )}
                </div>

                {standardContent}
                {/* quotation request detaials section */}
                {vehicleContent}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Edit ${title}`}
                onSubmit={handleSave}
            >
                {modalFormFields}
            </Modal>
        </>
    );
};

export default DetailCard;