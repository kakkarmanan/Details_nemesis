import react from "react";
import { Button , 
          Form, 
          Tabs,
          Tab} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function Details(props){

  const [userDetails, setInformation] = useState({
    username: "",
    mobile: "",
    email: "",
    address: ""
  });

  function handleChange(event){
    const { name, value } = event.target;
    setInformation((prevValue)=>{
     return {
       ...prevValue,
       [name]: value,
     }
    });
  }

  function handleSubmit(event){
    props.acceptData(userDetails);

    setInformation({
      username: "",
      mobile: "",
      email: "",
      address: ""
    });
    event.preventDefault();
  }
  

  return(
    <div class="App">
      <h1>DETAILS</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Username" 
        name="username"
        value= {userDetails.username}
        onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control 
        type="number" 
        placeholder="Mobile number" 
        name="mobile"
        value= {userDetails.mobile}
        onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Email</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="E-mail" 
        name="email"
        value= {userDetails.email}
        onChange={handleChange} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formGroupPassword">
    <Form.Label>Address</Form.Label>
    <Form.Control 
    type="text" 
    placeholder="Address" 
    name="address"
    value= {userDetails.address}
    onChange={handleChange} />
  </Form.Group>
  <Button variant="primary" type="submit" onClick={handleSubmit}>
      Submit
    </Button>
</Form>
    </div>
)}

export default Details;