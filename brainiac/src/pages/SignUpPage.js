import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag'

function SignUpPage() {
    const [values, setValues] = useState({
        username:'',
        email:'',
        name:'',
        password:''
    })

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    }

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result)
        },
        variables: {
            username: values.username,
            email: values.email,
            name: values.name, 
            password: values.password
        }
    })

    const onSubmit = (event) => {
        event.preventDefault();
        addUser()
    }

    
    return (
        <div className="form-container">
            <h1>Sign Up Page</h1>
            <p>Welcome to Brainiac! Sign up below to begin.</p>
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

                <Form.Group controlId="name">
                    {/* <Form.Label>Email address</Form.Label> */}
                    <Form.Control type="text"  
                    placeholder="Name" 
                    onChange = {handleChange}
                    name = "name"/>
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group controlId="username">
                    {/* <Form.Label>Email address</Form.Label> */}
                    <Form.Control type="text" 
                     placeholder="Username" 
                     onChange = {handleChange}
                     name = "username"/>
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
                    Submit
                </Button>
            </Form>
        </div>
    );
}

const REGISTER_USER = gql`
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

export default SignUpPage;