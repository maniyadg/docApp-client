import React, { useState, useEffect } from "react";
import Layout from '../components/Layout'
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { Cookies } from "react-cookie";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ApplyDoctor = () => {
  const [userid, setUserId] = useState()

  // Get User ID
  useEffect(() => {
    getUserid()
  }, [])
  const getUserid = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/getUserData`,
        { withCredentials: true })
      console.log(response.data)
      if (response.data.success) {
        setUserId(response.data.data._id)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();



  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    specialization: "",
    experience: "",
    feesPerCunsaltation: "",
    timings: ""
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(showLoading())
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/apply-doctor`,
      { ...values, userId: userid },
      { withCredentials: true },
      { accessToken: cookies.get('accessToken') },
    );
    window.location.reload()
    dispatch(hideLoading())

    if (response) {
      alert("success")
      // navigate('/mainpage')
    }
  };

  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/apply-doctor`,
        { ...values, userId: userid },
        { accessToken: cookies.get('accessToken') }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.success);
        alert('success')
        // navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form className="m-3" action="" onSubmit={(event) => handleSubmit(event)}>
        <h4 className="">Personal Details : </h4>
        <Row>
          <Col >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="First Name"
                name="firstName"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Col>

          <Col >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Last Name"
                name="lastName"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Col>

          <Col >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="phone"
                placeholder="Phone Number"
                name="phone"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Col>

          <Col >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="website"
                placeholder="Website"
                name="website"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Col>

          <Col >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="address"
                placeholder="Address"
                name="address"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Col>
        </Row>

        <h4>Professional Details :</h4>

        <Row>
          <Col >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="specialization"
                placeholder="Specialization"
                name="specialization"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Col>

          <Col >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                type="experience"
                placeholder="Experience"
                name="experience"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Fees Per Cunsaltation</Form.Label>
              <Form.Control
                type="feesPerCunsaltation"
                placeholder="Fees Per Cunsaltation"
                name="feesPerCunsaltation"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Col>

          <Col >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Timings</Form.Label>
              <Form.Control
                type="timings"
                placeholder="Timings"
                name="timings"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="justify-content-md-center text-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;