import Button from '@restart/ui/esm/Button';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext'
import BeckDepressionForm from '../../components/BeckForm/BeckDepressionForm';
import DBTFormComponent from '../../components/DBTForm/DBTFormComponent';

const Dashboard = (props) => {
    
    const {currentUser,logOut}=useAuth();
    const [loading, setLoading] = useState(false);
    const navigate= useNavigate();
    const handleLogOut=async (event)=>{
        event.preventDefault();
        try{
            setLoading(true);
            await logOut();
            navigate("/login");
        }catch{

        }
        setLoading(true);
    }
    return (
        <div>
            Hello {currentUser && currentUser.email}
                <button onClick={handleLogOut}>Logout</button>
            <BeckDepressionForm/>

            <DBTFormComponent/>
        </div>
    )
}

export default Dashboard
