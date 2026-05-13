"use client";
import React from "react";
import SearchableDropdown from "../common/SearchableDropdown";

export default function EncarSidebar({ filters, onFilterChange, options }) {
    const [labels, setLabels] = React.useState({
        manufacturer: '',
        model_group: '',
        model: '',
        badge_group: ''
    });

    // Reset labels when filters are cleared by parental change
    React.useEffect(() => {
        setLabels(prev => ({
            manufacturer: filters.manufacturer ? prev.manufacturer : '',
            model_group: filters.model_group ? prev.model_group : '',
            model: filters.model ? prev.model : '',
            badge_group: filters.badge_group ? prev.badge_group : ''
        }));
    }, [filters]);

    // Handler to update a specific filter
    const handleFilterUpdate = (key, value, option) => {
        if (option && option.name) {
            setLabels(prev => ({ ...prev, [key]: option.name }));
        } else if (value === "") {
            setLabels(prev => ({ ...prev, [key]: "" }));
        }

        onFilterChange({ [key]: value });
    };

    // Helper to prepend "All" option
    const withAll = (list, label, valueKey = "value") => {
        if (!list || list.length === 0) return [];
        return [{ name: label, [valueKey]: "" }, ...list];
    };

    return (
        <div className="wrap-sidebar-dk side-bar col-xl-3 col-md-12 col-sm-12">
            <div className="sidebar-handle">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.75 4.50903C13.9446 4.50903 12.4263 5.80309 12.0762 7.50903H2.25C1.83579 7.50903 1.5 7.84482 1.5 8.25903C1.5 8.67324 1.83579 9.00903 2.25 9.00903H12.0762C12.4263 10.715 13.9446 12.009 15.75 12.009C17.5554 12.009 19.0737 10.715 19.4238 9.00903H21.75C22.1642 9.00903 22.5 8.67324 22.5 8.25903C22.5 7.84482 22.1642 7.50903 21.75 7.50903H19.4238C19.0737 5.80309 17.5554 4.50903 15.75 4.50903ZM15.75 6.00903C17.0015 6.00903 18 7.00753 18 8.25903C18 9.51054 17.0015 10.509 15.75 10.509C14.4985 10.509 13.5 9.51054 13.5 8.25903C13.5 7.00753 14.4985 6.00903 15.75 6.00903Z" fill="#050B20" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.25 12.009C6.44461 12.009 4.92634 13.3031 4.57617 15.009H2.25C1.83579 15.009 1.5 15.3448 1.5 15.759C1.5 16.1732 1.83579 16.509 2.25 16.509H4.57617C4.92634 18.215 6.44461 19.509 8.25 19.509C10.0554 19.509 11.5737 18.215 11.9238 16.509H21.75C22.1642 16.509 22.5 16.1732 22.5 15.759C22.5 15.3448 22.1642 15.009 21.75 15.009H11.9238C11.5737 13.3031 10.0554 12.009 8.25 12.009ZM8.25 13.509C9.5015 13.509 10.5 14.5075 10.5 15.759C10.5 17.0105 9.5015 18.009 8.25 18.009C6.9985 18.009 6 17.0105 6 15.759C6 14.5075 6.9985 13.509 8.25 13.509Z" fill="#050B20" />
                </svg>
                Show Filter
            </div>

            <div className="inventory-sidebar">
                <div className="inventroy-widget widget-location">
                    <div className="row">
                        {/* Manufacturer */}
                        <div className="col-lg-12">
                            <div className="form_boxes">
                                <label>Manufacturer</label>
                                <SearchableDropdown
                                    options={withAll(options.manufacturers, "All Manufacturers")}
                                    defaultValue={filters.manufacturer || ""}
                                    placeholder="All Manufacturers"
                                    onSelect={(val, opt) => handleFilterUpdate("manufacturer", val, opt)}
                                    displayKey="name"
                                    valueKey="value"
                                    selectedLabel={labels.manufacturer}
                                />
                            </div>
                        </div>

                        {/* Model Group */}
                        <div className="col-lg-12">
                            <div className="form_boxes">
                                <label>Model Group</label>
                                <SearchableDropdown
                                    options={withAll(options.modelGroups, "All Model Groups")}
                                    defaultValue={filters.model_group || ""}
                                    placeholder="All Model Groups"
                                    onSelect={(val, opt) => handleFilterUpdate("model_group", val, opt)}
                                    displayKey="name"
                                    valueKey="value"
                                    disabled={!filters.manufacturer}
                                    selectedLabel={labels.model_group}
                                />
                            </div>
                        </div>

                        {/* Model */}
                        <div className="col-lg-12">
                            <div className="form_boxes">
                                <label>Model</label>
                                <SearchableDropdown
                                    options={withAll(options.models, "All Models")}
                                    defaultValue={filters.model || ""}
                                    placeholder="All Models"
                                    onSelect={(val, opt) => handleFilterUpdate("model", val, opt)}
                                    displayKey="name"
                                    valueKey="value"
                                    disabled={!filters.model_group}
                                    selectedLabel={labels.model}
                                />
                            </div>
                        </div>

                        {/* Badge Group */}
                        <div className="col-lg-12">
                            <div className="form_boxes">
                                <label>Badge Group</label>
                                <SearchableDropdown
                                    options={withAll(options.badges, "All Badges")}
                                    defaultValue={filters.badge_group || ""}
                                    placeholder="All Badges"
                                    onSelect={(val, opt) => handleFilterUpdate("badge_group", val, opt)}
                                    displayKey="name"
                                    valueKey="value"
                                    disabled={!filters.model}
                                    selectedLabel={labels.badge_group}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
