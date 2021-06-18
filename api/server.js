const express = require("express");
const bodyParser =require("body-parser");
const mongoose = require("mongoose"); 
const cors = require("cors");
const jwt = require("jsonwebtoken");
const nJwt = require("njwt");
const secureRandom = require("secure-random");

mongoose.connect("mongodb+srv://manan:mk080901@nemesis.55wef.mongodb.net/DetailsDB?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

var signingKey = secureRandom(256, { type: "Buffer" });

var claims = {
  iss: "http://myapp.com/",
  sub: "users/user1234",
  scope: "self, admins",
};

var token = nJwt.create(claims, signingKey);

console.log(token);

function generateAccessToken(id) {
  return jwt.sign(id, signingKey, { expiresIn: "300s" });
}

const detailsSchema = new mongoose.Schema({
    username : String,
    mobile: Number,
    email: String,
    address: String 
});

const app = express();
const port=9000;
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }) );

const Detail = mongoose.model("Detail",detailsSchema);

const personEmail = "admin@namasys.co";
const personPassword = "admin123";
const personId = "22047356393267483"



app.post("/login", (req,res)=>{
    //res.send("hello");
    console.log(req.body.email);
    console.log(req.body.password);

    if (req.body.email === personEmail){
        if(req.body.password === personPassword){
            token = generateAccessToken({ id: personId });
            console.log("TOKEN: "+token);
            console.log("Successfully logged in");
            res.send(token);
        } else{
            alert("Wrong Password. Please enter again");
        }
    } else {
        alert("Wrong email. PLease enter again");
    }
});


app.post("/details", (req,res)=>{
    console.log(req.body);
    if(token!==null){
        console.log("Start");
        jwt.verify(
            token,
            signingKey,
            (err, verified)=>{
                if(err) {
                    res.send("RemoveCookie");
                } else {
                    //res.send(verified);
                    const newDetail=new Detail({
                        username: req.body.username,
                        mobile: req.body.mobile,
                        email: req.body.email,
                        address: req.body.address
                    });
                    newDetail.save(function (err) {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log("Success");
                          res.status(200).send("User added Successfully")
                        }
                      });
                }
            }
        )
    }
    
});

app.get("/displayDetails", (req,res)=>{
    Detail.find({},(err, data)=>{
        if(err){
            console.log(err)
        } else{
            console.log(data);
            res.send(data);
        }
    });
});

app.patch("/patch",(req,res)=>{
    console.log(req.body);
    const name = req.body.name;
    console.log(name);
    Detail.findOneAndUpdate(
        {_id: req.body.id},
        {$set: {[name]:""} },
        (err, data)=>{
            if(err){
                console.log(err);
            } else {
                console.log(data);
                res.send("Success");
            }
        }
    );
});


app.listen(port, ()=>{
    console.log(`Server listened http://localhost:${port}`);
})