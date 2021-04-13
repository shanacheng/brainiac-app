import {BrowserRouter as Router, Route} from 'react-router-dom';

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {
  return (
    <Router>
      <NavBar />
      <Route exact path = '/' component = {HomePage}/>
      <Route exact path = '/explore' component = {ExplorePage}/>
      <Route exact path = '/login' component = {LoginPage}/>
      <Route exact path = '/signup' component = {SignUpPage}/>
    </Router>
  );
}

export default App;
