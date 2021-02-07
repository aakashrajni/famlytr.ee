import './App.css';
import MyTree from './components/templates/MyTree';
import SignIn from './components/templates/SignIn';
import Login from './components/templates/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/mytree">
            <MyTree />
          </Route>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
