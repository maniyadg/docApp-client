import React from 'react'
import { Cookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';


const PublicRoute = ({children}) => {

    const cookies = new Cookies();

    const token = cookies.get('accessToken')

    if (token) {
        return <Navigate to='/mainpage' />
    } else {
        return children
    }
}

export default PublicRoute
