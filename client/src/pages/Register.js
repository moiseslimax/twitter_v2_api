import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { AuthContext } from '../context/auth'
import { useMutation } from "@apollo/react-hooks";
import { useForm } from '../util/hooks';

import { Button, Form } from "semantic-ui-react";


function Register(props) {

  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});  
 
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      context.login(result.data.register)
      props.history.push('/')
    },
    onError(err){
        delete err.graphQLErrors[0].extensions.exception.stacktrace;
        setErrors(err.graphQLErrors[0].extensions.exception);
    },
    variables: values
  });

  function registerUser(){
      addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          type="text"
          placeholder="LeoChatoPrac*&%"
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          type="email"
          placeholder="leochatao@gmail.com"
          name="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          type="password"
          placeholder="170817"
          name="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          type="password"
          placeholder="170817"
          name="confirmPassword"
          error={errors.confirmPassword ? true : false}
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>Submit</Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
            <ul className="list">
                {Object.values(errors).map(value => (
                    <li key={value}>{value}</li>
                ))}
            </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
