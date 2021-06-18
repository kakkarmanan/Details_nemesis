import react from "react";
import { Button , Form, Badge, Tabs, Tab} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Details from "./details.jsx"
import DisplayDetails from "./displayDetails.jsx";

function Page2(){
    return(
        <div>
            <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                <Tab eventKey="home" title="Home">
                    < Details/>
                </Tab>
                <Tab eventKey="profile" title="Profile">
                <DisplayDetails />
                </Tab>
            </Tabs>  
        </div>
    
    )};

export default Page2
