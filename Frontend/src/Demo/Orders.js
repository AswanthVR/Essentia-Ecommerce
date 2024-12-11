import React, { useState, useEffect } from 'react';
import { getAuthorizationHeaders } from '../Security/TokenManager';
import axios from 'axios';
import Sidebar from './AdminSideBar';
import Modal from 'react-modal'; // Import the modal library

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orders/getAll', getAuthorizationHeaders());
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleViewProducts = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const TdStyle = {
    ThStyle: `p-4 border bg-gray-300 font-medium text-center`,
    TdStyle: `p-4 border text-center text-dark bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7`,
    TdStyle2: `p-4 border text-center bg-white dark:bg-dark-2 dark:text-dark-7`,
    TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-blue-500 hover:text-white font-medium`,
  }

  return (
    <>
      <Sidebar />
      <div className="ml-[20%] p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl mb-6 text-center">Order Details</h1>
        {orders.length > 0 && (
          <table className="min-w-full border border-collapse">
          <thead>
            <tr className="bg-gray-300">
              <th className={TdStyle.ThStyle}>Order ID</th>
              <th className={TdStyle.ThStyle}>Order Date</th>
              <th className={TdStyle.ThStyle}>Order Total</th>
              <th className={TdStyle.ThStyle}>Order Address</th>
              <th className={TdStyle.ThStyle}>Payment Mode</th>
              <th className={TdStyle.ThStyle}>Order Status </th>
              <th className={TdStyle.ThStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.oid}>
                <td className={TdStyle.TdStyle}>{order.oid}</td>
                <td className={TdStyle.TdStyle}>{order.orderDate}</td>
                <td className={TdStyle.TdStyle}>{order.orderTotal}</td>
                <td className={TdStyle.TdStyle}>{order.orderAddress}</td>
                <td className={TdStyle.TdStyle}>{order.paymentMode}</td>
                <td className={TdStyle.TdStyle}>{order.orderStatus}</td>
                <td className={TdStyle.TdStyle}>
                  <button
                    className={TdStyle.TdButton}
                    onClick={() => handleViewProducts(order)}
                  >
                    View Products
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
        {orders.length === 0 && (
          <p className="text-center mt-4">No orders available.</p>
        )}

        {/* Modal */}
        <Modal className="ml-[20%]"
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  contentLabel="View Products Modal"
>
  <h2 className="text-2xl mb-4">Products for Order ID: {selectedOrder?.oid}</h2>
  <button className='text-red-500' onClick={() => setModalIsOpen(false)}>Close</button>
  {selectedOrder && (
    <table>
      <thead>
        <tr>
          <th  className={TdStyle.ThStyle}>ID</th>
          <th  className={TdStyle.ThStyle}>Product Name</th>
          {/* Add more table headers if needed */}
        </tr>
      </thead>
      <tbody>
        {selectedOrder.products.map(product => (
          <tr key={product.productId}>
            <td className={TdStyle.TdStyle}>{product.productId}</td>
            <td className={TdStyle.TdStyle}>{product.productName}</td>
            {/* Add more table cells if needed */}
          </tr>
        ))}
      </tbody>
    </table>
  )}
</Modal>

      </div>
    </>
  )
}

export default CustomerOrders;
