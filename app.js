//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");


const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){
var firstName=req.body.fName;
var lastName=req.body.lName;
var email=req.body.email;
var data={
  members:[
    {email_address:email,
      status:"subscribed",
         merge_fields:{
           FNAME:firstName,
           LNAME:lastName
      }

    }
  ]
};
var jsonData =JSON.stringify(data);

var options={
url:"mailchimp url",
method:"POST",
headers:{
  "Authorization":"api key "
},
body: jsonData
};
request (options,function(error,response,body){
if (error) {
  res.sendFile(__dirname+"/failure.html");
}
else{
  if (response.statusCode=== 200){
    res.sendFile(__dirname+"/success.html");
  }else{
      res.sendFile(__dirname+"/failure.html");
  }
}
})
});
//list id
//9c0ebb208d
app.post("/failure" ,function(req,res){
  res.redirect("/");
})



app.listen(process.env.PORT || 3000,function(){
  console.log("server is running at port 3000");
});
//api
//08d6d790e8332ce03c7be13db42319b0-us4
