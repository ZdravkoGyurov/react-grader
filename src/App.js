import './App.css';
import NavBar from './NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import About from './About';
import SignUp from './SignUp';
import { Container } from '@material-ui/core';

function App() {
  return (
    <Router>
      <Container className="App">
      <NavBar />
        <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/sign-in">
              <SignIn />
            </Route>
            <Route exact path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/">
              <div>Home</div>
            </Route>
          </Switch>
      </Container>
    </Router>
  );
}

export default App;
