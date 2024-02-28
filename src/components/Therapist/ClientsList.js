import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        // Replace this URL with your actual API endpoint
        // const response = await fetch('https://yourapi/clients');
        // const data = await response.json();
        setClients([
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' }
          ]);
      } catch (error) {
        console.error("Error fetching clients:", error);
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []); // The empty array ensures this effect runs only once after the initial render

  if (isLoading) {
    return <div className="loading-container"><img src="/loading.gif" alt="Loading..." /></div>;
  }

  return (
    <div>
      <h2>Clients</h2>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            <Link to={`/client/${client.id}`}>{client.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsList;
