import Footer1 from "@/components/footers/Footer1";
import HeaderDashboard from "@/components/headers/HeaderDashboard";
import React from "react";
import OrderDetailPage from "@/components/dashboard/orderDetails/OrderDetailPage";
import { cookies } from 'next/headers';
import axios from 'axios';

export const metadata = {
  title: "Order Detail || Carpool Korea",
  description: "Carpool - Carpool Korea",
};

export default async function myOrdersPage({ params }) {
  const { order_num } = params;
  let orderData = null;

  try {
    const cookieStore = cookies();
    const API_BASE = 'https://partners.carpoolkr.com/api';
    
    const response = await axios.get(`${API_BASE}/orders/${order_num}`, {
      headers: {
        'Cookie': cookieStore.toString(),
        'Accept': 'application/json',
      },
    });

    orderData = response.data.data;
    
    // This will appear in your VS Code terminal
    console.log('--- API Response for Order:', order_num, '---');
    console.dir(response.data, { depth: null });
    console.log('------------------------------------------');

  } catch (error) {
    console.error('Error fetching order details on server:', error.response?.data || error.message);
  }

  return (
    <>
      <div style={{ background: "var(--theme-color-dark)" }}>
        <HeaderDashboard />

        <OrderDetailPage initialData={orderData} order_num={order_num} />
        <Footer1 parentClass="boxcar-footer footer-style-one v2" />
      </div>
    </>
  );
}

