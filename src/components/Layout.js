import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AdminMenu, UserMenu } from '../Data/data'
import '../styles/layoutStyle.css'
import { Cookies } from 'react-cookie';
import axios from 'axios'
import Badge from 'react-bootstrap/Badge';


const Layout = ({ children }) => {
    const [user, setUser] = useState()
    const navigate = useNavigate()

    console.log(user)

    useEffect(() => {
        getUser()
    }, [])


    // Get User Adminor Not
    const getUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/getUserData`,
                { withCredentials: true })
            console.log(response.data)
            if (response.data.success) {
                setUser(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }



    const location = useLocation()
    const cookies = new Cookies();
    const handleLogout = async () => {
        const token = cookies.get('accessToken')
        if (token) {
            cookies.remove('accessToken')
        }
    }
    const SidebarMenu = user && user.isAdmin ? AdminMenu : UserMenu

    return (
        <div className='main' >
            <div className='layout' >
                <div className='sidebar' >
                    <div className='logo' >
                        <h6>DOC APP</h6>
                        <hr />
                    </div>
                    <div className='menu' >
                        {
                            SidebarMenu.map(menu => {
                                const isActive = location.pathname === menu.path
                                return (
                                    <>
                                        <div className={`menu-item ${isActive && 'active'}`}>
                                            <i className={menu.icon} ></i>
                                            <Link to={menu.path}>{menu.name}</Link>
                                        </div>
                                    </>
                                )
                            })
                        }
                        <div className={`menu-item }`} onClick={handleLogout} >
                            <i className='fa-solid fa-right-from-bracket'  ></i>
                            <Link to={'/'} >Logout</Link>
                        </div>
                    </div>
                </div>
                <div className='content' >
                    <div className='header' >
                        <div className='header-content' style={{ cursor: "pointer" }}>
                            <i className="fa-solid fa-bell" onClick={() => { navigate('/notification') }}>
                                <Badge className="notify" bg="danger">
                                    {user && user.notifcation && user.notifcation.length}</Badge>
                                <span className="visually-hidden">unread messages</span></i>
                            <Link to={'/profile'} >{user && user.name}</Link>
                        </div>
                    </div>
                    <div className='body' >{children}</div>

                </div>
            </div>
        </div>
    )
}

export default Layout
