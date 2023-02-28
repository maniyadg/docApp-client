import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Cookies } from 'react-cookie'
import Layout from '../../components/Layout'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function User() {
    const [user, setUser] = useState()
    console.log({user})

    const cookies = new Cookies()

    const getUser = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/getAllUsers`,
            { withCredentials: true } ,
            { accessToken: cookies.get('accessToken') }
            );
            if(response.data.success){
                setUser(response.data.data)
            }
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getUser()
    },[])


    return (
        <Layout>  
            <h1 className="text-center m-2">Users List</h1>
        <Table >
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>E Mail</th>
          <th>Doctor</th>
          <th>Action</th>
        </tr>
      </thead>

      {
        user && user.map((users , index) => {
            return       <tbody>
            <tr>
              <td>{index+1}</td>
              <td>{users.name}</td>
              <td>{users.email}</td>
              {
                users.isDoctor ? <td>Yes</td> : <td>No</td>
              }
              <td><Button variant="danger" size="sm" >View</Button></td>

            </tr>
          </tbody>

        })
      }

        </Table>
        </Layout>
    )
}

export default User