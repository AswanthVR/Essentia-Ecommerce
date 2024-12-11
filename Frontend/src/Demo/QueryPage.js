import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthorizationHeaders } from '../Security/TokenManager';
import Sidebar from './AdminSideBar';

const QueryPage = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    // Fetch queries from the backend API
    axios.get('http://localhost:8080/contacts' , getAuthorizationHeaders())
      .then(response => {
        setQueries(response.data);
      })
      .catch(error => {
        console.error('Error fetching queries:', error);
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className='flex w-screen'>
           <div className='w-1/5'> <Sidebar/>
           </div>
    <div className='w-4/5 mr-10'>
      <h2 className="text-2xl font-bold mb-4">Customer Queries</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border bg-gray-200 p-2">ID</th>
            <th className="border bg-gray-200 p-2">Email</th>
            <th className="border bg-gray-200 p-2">Query</th>
          </tr>
        </thead>
        <tbody>
          {queries.map(query => (
            <tr key={query.id}>
              <td className="border p-2">{query.id}</td>
              <td className="border p-2">{query.email}</td>
              <td className="border p-2">{query.query}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

  );
};

export default QueryPage;
