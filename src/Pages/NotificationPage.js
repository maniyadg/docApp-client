import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'; import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Cookies } from 'react-cookie';

function NotificationPage() {
    const [key, setKey] = useState('home');
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const cookies = new Cookies();


    useEffect(() => {
        getUser()
    }, [])


    // Get User Adminor Not
    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/getUserData`,
                { withCredentials: true })
            // console.log(response.data)
            if (response.data.success) {
                setUser(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleRead = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/api/get-all-notification`,
                { userId: user && user._id }, { withCredentials: true },
                { accessToken: cookies.get('accessToken') })
        } catch (error) {
            console.error(error)
        }
    }


    const handleDelete = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/api/delete-all-notification`,
                { userId: user && user._id }, { withCredentials: true },
                { accessToken: cookies.get('accessToken') })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Layout>
            <h4 className='p-3 text-center' >NotificationPage</h4>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 text-warning"
            >
                <Tab eventKey="home" title="UnRead" className="">
                    <div className='d-flex justify-content-end'>
                        <h5 className='p-2' >Mark All Read</h5>
                    </div>
                    {
                        user && user?.notifcation.map((notificationMgs) => (
                        <div className="card" style={{ cursor: "pointer" }}>
                            <div
                                className="card-text"
                                onClick={() => navigate(notificationMgs.onClickPath)}
                            >
                                {notificationMgs.message}
                            </div>
                        </div>
                    ))}
                </Tab>

                <h1>hello</h1>
                <Tab eventKey="profile" title="Read">
                    <div className='d-flex justify-content-end'>
                        <h5 className='p-2' style={{ cursor: "pointer" }}
                            onClick={handleDelete()}>Delete All Read</h5>
                    </div>
                    {
                        user && user.seennotification.map(notificationMsg => {
                            return <div className='card' style={{ cursor: "pointer" }}  >
                                <div className='card-text' onClick={() => navigate(notificationMsg.onClickPath)}>
                                    {notificationMsg.message}
                                </div>
                            </div>
                        })
                    }
                </Tab>

            </Tabs>
        </Layout>
    )
}

export default NotificationPage