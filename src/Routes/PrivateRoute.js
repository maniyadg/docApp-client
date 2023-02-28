import React, { useEffect } from 'react'
import { Cookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { setUser } from '../redux/features/userSlice';


const PrivateRoute = ({ children }) => {
    const cookies = new Cookies();
    // const dispatch = useDispatch()

    // const getUser = async () => {
    //     try {
    //         dispatch(showLoading())
    //         const response = await axios.post(`http://localhost:4000/api/getUserData`,
    //             { accessToken: cookies.get('accessToken') },
    //             { withCredentials: true })
    //         dispatch(hideLoading())
    //         console.log(response.data.data)
    //         if (response.data.success) {
    //             dispatch(setUser(response.data.data))
    //         }
    //         // else {
    //         //    <Navigate to={'/'} />
    //         // }

    //     } catch (error) {
    //         dispatch(hideLoading())
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     // if (!user) {
    //     getUser()
    //     // }
    // }, [])

    // const { user } = useSelector(state => state.user)
    // console.log(user)



    const token = cookies.get('accessToken')

    if (token) {
        return children
    } else {
        return <Navigate to='/' />
    }
}

export default PrivateRoute
