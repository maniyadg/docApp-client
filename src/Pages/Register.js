import React, { useState } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { showLoading , hideLoading } from '../redux/features/alertSlice';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(showLoading())
        const response = await axios.post('http://localhost:4000/api/register', values, { withCredentials: true });
        dispatch(hideLoading())
        console.log(response.data)
        if (response) {
            alert('Login Sucessfully')
            navigate('/')
        }
    };

    return (
        <Container fluid="md">
            <Row className="justify-content-md-center " >
                <Col xs={6} >
                    <Form action="" onSubmit={(event) => handleSubmit(event)}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>FullName</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter Your FullName"
                                name="name"
                                onChange={(e) => handleChange(e)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={(e) => handleChange(e)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={(e) => handleChange(e)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>

                        <div className="justify-content-md-center text-center">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>

                        <div className="justify-content-md-center text-center">
                            <span >
                                Already have an account ? <Link to="/">Login.</Link>
                            </span>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register
