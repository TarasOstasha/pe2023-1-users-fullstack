import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import UserPage from './pages/UserPage';
import UserProfile from '../src/pages/UserProfile';



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"> <UserPage /></Route>
        <Route  path="/users/:id">
          <UserProfile />
        </Route>
      </Switch>


    </Router>

  );
}

export default App;
