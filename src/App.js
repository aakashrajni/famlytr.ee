import './App.css';
import MyTree from './components/templates/MyTree';
import SignIn from './components/templates/SignIn';
import Login from './components/templates/Login';
import AppSkeleton from './components/templates/AppSkeleton';
import AddParent from './components/templates/AddParent';
import AddPartner from './components/templates/AddPartner';
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
            <AppSkeleton selected="Home">
              <MyTree />
            </AppSkeleton>
          </Route>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/parent/:type">
            <AddParent />
          </Route>
          <Route path="/partner/:type">
            <AddPartner />
          </Route>
          <Route path="/invite/:type">
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
