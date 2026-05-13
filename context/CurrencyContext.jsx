"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const CurrencyContext = createContext();

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
};

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState("USD");
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchRates = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("https://open.er-api.com/v6/latest/USD");
            const data = await res.json();
            if (data && data.rates) {
                setRates(data.rates);
                localStorage.setItem("currency_rates", JSON.stringify({
                    rates: data.rates,
                    timestamp: Date.now()
                }));
            }
        } catch (error) {
            console.error("Failed to fetch exchange rates:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Load preferred currency
        const savedCurrency = localStorage.getItem("preferred_currency") || "USD";
        setCurrency(savedCurrency);

        // Load cached rates
        const cached = localStorage.getItem("currency_rates");
        if (cached) {
            const { rates: cachedRates, timestamp } = JSON.parse(cached);
            // Refresh rates every 24 hours
            if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
                setRates(cachedRates);
                setLoading(false);
                return;
            }
        }
        fetchRates();
    }, [fetchRates]);

    const changeCurrency = (newCurrency) => {
        setCurrency(newCurrency);
        localStorage.setItem("preferred_currency", newCurrency);
    };

    // Convert an amount from one currency to another
    const convert = (amount, from = "USD") => {
        if (!amount || isNaN(amount)) return 0;
        if (!rates || Object.keys(rates).length === 0) return amount;

        // Convert to USD first if not already
        const amountInUSD = from === "USD" ? amount : amount / rates[from];

        // Convert from USD to target currency
        return amountInUSD * rates[currency];
    };

    // Format a numerical value as currency
    const format = (amount, currencyCode = currency) => {
        const locale = currencyCode === "KRW" ? "ko-KR" : "en-US";
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currencyCode,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const value = {
        currency,
        rates,
        loading,
        changeCurrency,
        convert,
        format
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};
