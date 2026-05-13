import React, { useState, useEffect } from 'react';

const RangeInput = ({
    value,
    onChange,
    placeholder,
    prefix = "",
    suffix = ""
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [localValue, setLocalValue] = useState("");

    // Sync from props when not focused
    useEffect(() => {
        if (!isFocused) {
            setLocalValue(value === "" || value === undefined || value === null ? "" : String(value));
        }
    }, [value, isFocused]);

    const formatNumber = (num) => {
        if (num === "" || num === undefined || num === null) return "";
        if (typeof num === 'string' && num.endsWith('+')) {
            const val = num.slice(0, -1);
            return Number(val).toLocaleString("en-US") + "+";
        }
        return Number(num).toLocaleString("en-US");
    };

    const getDisplayValue = () => {
        if (isFocused) {
            if (typeof localValue === 'string' && localValue.endsWith('+')) {
                return localValue.slice(0, -1);
            }
            return localValue;
        }
        if (value === "" || value === undefined) return "";
        return `${prefix}${formatNumber(value)}${suffix ? " " + suffix : ""}`;
    };

    const handleChange = (e) => {
        const val = e.target.value;
        const numeric = val.replace(/[^0-9]/g, '');
        setLocalValue(numeric);
    };

    const handleCommit = () => {
        setIsFocused(false);
        const submitVal = localValue === "" ? "" : Number(localValue);

        // value contains + sometimes if max, so we compare numeric representation
        const currentPropNumeric = (typeof value === 'string' && value.endsWith('+'))
            ? Number(value.slice(0, -1))
            : (value === "" || value === undefined || value === null ? "" : Number(value));

        // Prevent unnecessary submissions if value hasn't changed
        if (submitVal !== currentPropNumeric && onChange) {
            onChange(submitVal);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur(); // Triggers onBlur
        }
    };

    return (
        <input
            type="text"
            className="drop-menu"
            style={{ width: '100%', border: 'none', background: 'transparent' }}
            placeholder={placeholder}
            value={getDisplayValue()}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={handleCommit}
            onKeyDown={handleKeyDown}
        />
    );
};

export default RangeInput;
