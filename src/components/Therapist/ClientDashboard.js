import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import DBTAnalysis from './DBTAnalysis';
import { useAuth } from '../../contexts/AuthContext';
import axios from "axios";
import {dbtLammbda} from "../../config/baseurl";
import "../../css/clientdashboard.css"

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
    <div className="container">
      <div className="menu-card">
        <NavLink to="/beck" className={({ isActive }) => isActive ? "menu-item menu-item-active" : "menu-item"}>Beck report</NavLink>
        <NavLink to="/dbt" className={({ isActive }) => isActive ? "menu-item menu-item-active" : "menu-item"}>DBT Report</NavLink>
        <NavLink to="/personal-progress" className={({ isActive }) => isActive ? "menu-item menu-item-active" : "menu-item"}>Personal Progress</NavLink>
      </div>
      <div className="content">
      <Outlet /> {dbtData && <DBTAnalysis data={dbtData} />}
      </div>

    </div>
  );

};

export default ClientDashboard;
