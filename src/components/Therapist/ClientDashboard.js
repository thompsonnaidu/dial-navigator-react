import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import DBTAnalysis from './DBTAnalysis';
import { useAuth } from '../../contexts/AuthContext';
import axios from "axios";
import {dbtLammbda} from "../../config/baseurl";

const ClientDashboard = () => {
  const { clientId } = useParams();
  const [dbtData, setDbtData] = React.useState(null);
  const {currentUser}= useAuth();

  React.useEffect(() => {

    async function fetchDbtData(clientId) {
      const response = await axios.get(`${dbtLammbda}?clientId=${clientId}&therapistId=${currentUser.userInfo._id}`);

      setDbtData(response.data["param"]);
    }

    fetchDbtData(clientId);
  }, [clientId]);

  return (
    <div className="client-dashboard">
      <div className="content">
        <Outlet /> 
        {dbtData && <DBTAnalysis data={dbtData} />}
      </div>
      <div className="menu-card">
        <ul>
          <li>
            <Link to={`beck`}>BECK</Link>
          </li>
          <li>
            <Link to={`dbt`}>DBT</Link>
          </li>
          <li>
            <Link to={`personal-progress`}>Personal Progress</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ClientDashboard;
