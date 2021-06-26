import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './components/SignUp';
import { Container } from '@material-ui/core';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import SubmitCourse from './components/SubmitCourse';
import { getUserId, clearAuth } from './userIdentity';
import { useState } from 'react';
import UserList from './components/UserList';
import Requests from './components/Requests';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleSignIn = () => {
    setLoggedInUser(getUserId());
  };

  const handleSignOut = () => {
    clearAuth();
    setLoggedInUser(null);
  }

  return (
    <Router>
      <Container className="App">
      <NavBar loggedInUser={loggedInUser} handleSignOut={handleSignOut}/>
        <Switch>
            <Route exact path="/sign-in">
              <SignIn handleSignIn={handleSignIn}/>
            </Route>
            <Route exact path="/sign-up">
              <SignUp />
            </Route>
            <Route exact path="/courses">
              <CourseList loggedInUser={loggedInUser} />
            </Route>
            <Route exact path="/users">
              <UserList loggedInUser={loggedInUser} />
            </Route>
            <Route exact path="/my-requests">
              <Requests loggedInUser={loggedInUser} />
            </Route>
            <Route exact path="/courses/create-course">
              <SubmitCourse loggedInUser={loggedInUser} />
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
