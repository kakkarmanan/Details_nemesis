import react, { useState } from "react";
import { Table } from "react-bootstrap";

function DisplayDetails(props) {
  console.log(props.details);
  function handleClick(event){
    console.log(event.target.name);
    props.delete(event.target.value, event.target.innerText,event.target.name);
  }

  return (
    <div>
        <h1>User Information</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>_id</th>
            <th>Username</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
       {props.details.map((user)=>{
          console.log(user);
          const {_id, username, email, address, mobile} = user;
          return(
            <tbody>
              <tr>
                <td>{_id}</td>
                <td>
                  <button type="hidden"
                  value={_id}
                  name="username"
                  onClick={handleClick}>
                    {username}
                  </button>
                </td>
                <td>
                  <button type="hidden"
                  value={_id}
                  name="mobileNum"
                  onClick={handleClick}>
                    {mobile}
                  </button>
                </td>
                <td>
                  <button type="hidden"
                  value={_id}
                  name="email"
                  onClick={handleClick}>
                    {email}
                  </button>
                </td>
                <td>
                  <button type="hidden"
                  value={_id}
                  name="address"
                  onClick={handleClick}>
                    {address}
                  </button>
                </td>
              </tr>
            </tbody>
          )
        })}
      </Table>
    </div>
   );
}

export default DisplayDetails;
