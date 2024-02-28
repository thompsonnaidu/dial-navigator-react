import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DBTAnalysis from './DBTAnalysis';
import BeckReport from './BECK';
import PersonalProgress from './PersonalProgress';
import { useAuth } from '../../contexts/AuthContext';
import axios from "axios";
import { dbtLammbda } from "../../config/baseurl";
import "../../css/clientdashboard.css"

const ClientDashboard = () => {
  const { clientId } = useParams();
  const [dbtData, setDbtData] = useState(null);
  const [activeComponent, setActiveComponent] = useState('dbt');
  const { currentUser } = useAuth();
  const [beckData, setBeckData] = useState(null);

  useEffect(() => {
    async function fetchDbtData(clientId) {
      const response = await axios.get(`${dbtLammbda}/dbt?clientId=${clientId}&therapistId=${currentUser.userInfo._id}`);
      setDbtData(response.data["param"]);
    }

    if(clientId && currentUser){
      fetchDbtData(clientId);
    }
  }, [clientId, currentUser]);

  const handleClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const fetchBeckData = async () => {
    // Call your API to fetch Beck data
    const response = await axios.get(`${dbtLammbda}/beckreport?clientId=${clientId}&therapistId=${currentUser.userInfo._id}`);
    setBeckData(response.data["param"]);
  };

  const handleBeckClick = async() => {
    await fetchBeckData();
    setActiveComponent('beck');
  };

  return (
    <div id="container">
      <div id="menu-card">
        <div className={activeComponent === 'beck' ? "menu-item menu-item-active" : "menu-item"} onClick={handleBeckClick} id="menu-item-1">Beck report</div>
        <div className={activeComponent === 'dbt' ? "menu-item menu-item-active" : "menu-item"} onClick={() => handleClick('dbt')} id="menu-item-2">DBT Report</div>
        <div className={activeComponent === 'personal-progress' ? "menu-item menu-item-active" : "menu-item"} onClick={() => handleClick('personal-progress')} id="menu-item-3">Personal Progress</div>
      </div>
      <div id="content">
        {activeComponent === 'beck' && beckData && <BeckReport beckData={beckData}/>}
        {activeComponent === 'dbt' && dbtData && <DBTAnalysis data={dbtData} />}
        {activeComponent === 'personal-progress' && <PersonalProgress />}
      </div>
    </div>
  );
};

export default ClientDashboard;
