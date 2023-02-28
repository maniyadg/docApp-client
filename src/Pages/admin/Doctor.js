import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import Layout from '../../components/Layout'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Doctor() {
    const [doctor, setDoctor] = useState()
    const [status, setStatus] = useState('pending')
    console.log(status)
    const cookies = new Cookies()

    const getDoctor = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/getAllDoctors`,
                { withCredentials: true },
                { accessToken: cookies.get('accessToken') }
            );
            // console.log(response.data)
            if (response.data.success) {
                setDoctor(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getDoctor()
    }, [])

    const handleAccountsts = async (doctors) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/changeAccountStatus`,
                {
                    doctorId:doctors._id,
                    status:doctors.status,
                    userId:doctors.userId
                },
                { withCredentials: true },
                { accessToken: cookies.get('accessToken') }
            );
            if (response.data.success) {
              alert('success')              
            }
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <Layout>
            <h1 className="text-center m-2">Users List</h1>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>E Mail</th>
                        <th>Specialist</th>
                        <th>Action</th>
                    </tr>
                </thead>

                {
                    doctor && doctor.map((doctors, index , status) => {
                        return <tbody>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{doctors.lastName}</td>
                                <td>{doctors.status}</td>
                                <td>{doctors.specialization}</td>
                                {
                                    doctors.status === 'pending' ? <td><Button variant="success" size="sm"
                                        onClick={() => handleAccountsts(doctors,doctors.status ==="approved" )} >Approve</Button></td> :
                                        <td><Button variant="danger" size="sm" >Reject</Button></td>
                                }
                            </tr>
                        </tbody>

                    })
                }

            </Table>
        </Layout>
    )
}

export default Doctor