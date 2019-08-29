import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

//Components
import { Container } from 'semantic-ui-react'
import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
  <AuthProvider >
    <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home}/>
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
        </Container>
      </Router>
  </AuthProvider>
  );
}

export default App;
