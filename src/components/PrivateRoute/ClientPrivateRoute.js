import React from 'react'
import { Route , Navigate,Outlet} from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext'
import RoleConstants from "../../constants/RoleConstants";
function ClientPrivateRoute({component:Component, ...rest}) {
    const {currentUser}= useAuth();
    return (
        currentUser  && currentUser?.userInfo?.role?.name===RoleConstants.CLIENT_ROLE? <Outlet/>:<Navigate to="/login"/>
         

    )
}

export default ClientPrivateRoute
