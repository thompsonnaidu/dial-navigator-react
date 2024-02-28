import Button from '@restart/ui/esm/Button';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext'
import BeckDepressionForm from '../../components/BeckForm/BeckDepressionForm';
import DBTFormComponent from '../../components/DBTForm/DBTFormComponent';
import ClientList from '../../components/Therapist/ClientsList' 

const Dashboard = (props) => {
    
    const {currentUser,logOut}=useAuth();
    console.log(currentUser)
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
            {currentUser["userInfo"]["role"]["name"] === 'therapist' ? (
                <div>
                    Hello Doctor {currentUser.email}
                    <button onClick={handleLogOut}>Logout</button>
                    <ClientList />
                </div>
            ) : (
                <div>
                    Hello {currentUser?.email}
                    <button onClick={handleLogOut}>Logout</button>
                    <BeckDepressionForm />
                    <DBTFormComponent />
                </div>
            )}
        </div>
    )
}

export default Dashboard
