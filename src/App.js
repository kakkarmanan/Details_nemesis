import './App.css';
import reactDom,{ useState } from 'react';
import {Switch, Route, Link, Redirect } from 'react-router-dom';
import { login, showDetails, userDetails,deleteUserDetails } from "./services/UserService";
import Details from './details.jsx';
import Login from './login.jsx';
import Page2 from './page2.jsx';
import DisplayDetails from './displayDetails';
import { BrowserRouter as Router} from 'react-router-dom'
import Cookies from "js-cookie"


function App() {

  const [responseData,setResponse] = useState();
  const [added,setAdded] = useState(false);
  const [tokenAvail,setToken] = useState(true);
  let rememberMe = Cookies.get("token");
  console.log(rememberMe);
  
  function handleLogin(LoginDetails){
    login(LoginDetails).then((response)=>{
      console.log(response);
      if (response.data !== "Login failed"){
        Cookies.set("token",response.data);
        setToken(true);
      }
    });
  }

  function handleDetails(data){
    userDetails(data).then((response)=>{
      console.log(response);

      if(response.data === "RemoveCookie"){
        alert(response.data);
        setToken(false);
        Cookies.remove("token");
      } else {
        setToken(true);
        if (response.data === "User added Successfully"){
          fetchDetails();
          console.log(responseData);
          alert(response.data);
          setAdded(true);
        } else {
          setAdded(false);
        }
      }
      });
  }

  function handleDelete(id,value,name){
    deleteUserDetails(id, value, name).then((response)=>{
      console.log(response);
    });
  }

  const fetchDetails=()=>{
    console.log("called");
    showDetails().then((response)=>{
      console.log(response);
      setResponse([...response.data]);
    });
  };

  return (
    <Router>
      <div>
        <Switch>
        <Route exact path="/login">
          <Login signin={handleLogin}/>
        </Route>
        <Route exact path="/details">
          { tokenAvail ?(
            added ? (
              <Redirect to ="/displayDetails" />
            ) : (
              <Details acceptData={handleDetails}/>)
            ) : (
              <Redirect to="/login"/>
            )
          }
        </Route>
        <Route exact path="/displayDetails">
          {responseData ?(
            <DisplayDetails details={responseData} delete={handleDelete}/>
          ):(
            fetchDetails()
          )}
        </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
