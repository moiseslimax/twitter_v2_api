import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";

import { AuthContext } from '../context/auth'
import { useForm } from '../util/hooks';

function Login(props) {
    
  const [errors, setErrors] = useState({});

  const context = useContext(AuthContext);

  const { onChange, onSubmit, values } = useForm(loginUserCallBack, {
    username: '',
    password: ''
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      context.login(result.data.login)
      props.history.push('/')
    },
    onError(err){
        delete err.graphQLErrors[0].extensions.exception.stacktrace;
        setErrors(err.graphQLErrors[0].extensions.exception);
    },
    variables: values
  });

  function loginUserCallBack() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
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
          label="Password"
          type="password"
          placeholder="170817"
          name="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChange}
        />
        <Button type="submit" primary>Login</Button>
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

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
        username: $username
        password: $password
    ) {
      email
      username
      token
    }
  }
`;

export default Login;
