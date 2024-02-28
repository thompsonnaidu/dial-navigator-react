import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../../contexts/AuthContext';
import BASEURL from "../../config/baseurl";
import "../../css/client.css"

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {currentUser}= useAuth();


  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        console.log(currentUser)
        const response = await axios.get(`${BASEURL}/api/client/${currentUser.userInfo._id}`,{headers:{authtoken:currentUser["accessToken"]}});
        setClients(response.data);
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

// Inside ClientsList component

return (
    <div className="d-flex justify-content-center">
      <div className="table-responsive w-75">
        <table className="table clients-table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Client Name</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={client.id} className={index % 2 ? "table-primary" : "table-light"}>
                <td>
                  <Link to={`/client-dashboard/${client.clientId}`}>{client.name}</Link>
                </td>
                <td>
                  <Link to={`/client-dashboard/${client.clientId}`}>{client.email}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  
  
};

export default ClientsList;
