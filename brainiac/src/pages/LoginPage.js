import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag'

import  { useForm } from '../util/hooks';

function LoginPage(props) { 
    const [ errors, setErrors ] = useState({});
    
    const { handleChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: ''
    }) 

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(proxy, result) {
            console.log(result)
            props.history.push('/')
         },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: {
            username: values.username,
            email: values.email,
            name: values.name, 
            password: values.password
        }
    })

    function loginUserCallback() {
        loginUser()
    }

    
    return (
        <div className="form-container">
            <h1>Login Page</h1>
            <p>Welcome back! Log in below to begin.</p>
            <Form onSubmit={onSubmit} noValidate>
                <Form.Group controlId="email">
                    {/* <Form.Label>Email address</Form.Label> */}
                    <Form.Control 
                    type="email" 
                    placeholder="Email" 
                    onChange = {handleChange}
                    name = "email"/>
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                 <Form.Group controlId="password">
                     {/* <Form.Label>Password</Form.Label> */}
                     <Form.Control type="password" 
                    placeholder="Password"
                    onChange = {handleChange}
                    name = "password"/>
                </Form.Group>
                {/* <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
}

const LOGIN_USER = gql`
    mutation createUser(
        $username: String!
        $email: String!
        $name: String!
        $password: String!
    ) {
        createUser(
            username: $username
            email: $email
            name: $name
            password: $password
        ) {
            username
            email
            name
            token
        }
     }
 `

export default LoginPage;