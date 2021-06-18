import react,{ useState } from "react";
import { Button , Form, Badge} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login(props){
  const [loginDetails, setDetails] = useState({
    email : "",
    password : ""
  });

  function handleChange(event){
    const { name, value } = event.target;
    setDetails((prevValue)=>{
     return {
       ...prevValue,
       [name]: value,
     }
    });
  }

  function handleSubmit(event){

    if(loginDetails.email === ""){
      alert("Email cannot be empty");
    } else if(loginDetails.password === ""){
      alert("password cannot be empty");
    } else{
      props.signin(loginDetails);
    }

    setDetails({
      email: "",
      password: "",
    })
    event.preventDefault();
  }
  
  return(
<div class="App">
      <h1>
      LOGIN <Badge bg="secondary">New</Badge>
    </h1>
    <br></br>
      <Form >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" 
              placeholder="Enter email" 
              name="email" 
              value={loginDetails.email} 
              onChange = {handleChange} />
        </Form.Group>
        <br></br>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" 
              placeholder="Password" 
              name="password" 
              value={loginDetails.password} 
              onChange = {handleChange} />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
    </Form.Group>
    <br></br>
    <Button variant="primary" type="submit" onClick={handleSubmit}>
      Submit
    </Button>
  </Form> 
    </div>
  )};

export default Login