require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./model/user.model');
const nodemailer = require("nodemailer");
const generate = require("generate-password");
const session = require('express-session');
var bcrypt = require('bcryptjs');


const MongoStore = require("connect-mongo");

mongoose.connect("mongodb+srv://Naveen_Vashistha:"+process.env.MONGO_PASSWORD+"@cluster0.jufy7.mongodb.net/billsplitDB",{useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors({
    credentials: true,
    origin: ["https://billsplit26.herokuapp.com/"]
}));


app.use(express.json());
app.use(express.urlencoded());

const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    store: MongoStore.create({ mongoUrl: "mongodb+srv://Naveen_Vashistha:"+process.env.MONGO_PASSWORD+"@cluster0.jufy7.mongodb.net/billsplitDB"}),
    cookie: { maxAge: oneDay },
    resave: false 
}));

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

  app.post("/api/",async (req,res)=>{
      try{
      var found = 0;
      var passwords = "";
      var users = await User.find({});
      console.log("1");
      while(found === 0){
          passwords = generate.generate({
              numbers:true,
          });
            console.log("2");
            if(users.length !== 0){
                console.log("3");
                for(var i=0;i<users.length;i++){
                  let pass = users[i].code;
                  let res = await bcrypt.compare(passwords,pass);
                  console.log(res);
                  console.log("4");
                  if (res === true){
                      console.log("5");
                      found = 0;
                  }
                  else{
                      console.log("6")
                      found = 1;
                  }
                  if(found === 0){
                      console.log("7");
                      break;
                  }
              }
          }
          else{
              console.log("8");
              found = 1;
          }
      }
      console.log("clear 1");
      let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: req.body.userEmail,
        subject: 'Bill Split',
        text: 'Hi your code for login your Bill Split account named '+ req.body.userTopic + ' is  =  '+passwords
      };
      transporter.sendMail(mailOptions,async function(err, data) {
        if (err) {
            console.log(err);
            res.send();
        } else {
            var salty = await bcrypt.genSalt(10);
            bcrypt.hash(passwords, salty, function(err, hash) {
                // Store hash in your password DB.
                if(!err){
                const user  =  new User({code:hash,salt:salty,topic:req.body.userTopic,billsplit:[]});
                console.log("clear 2");
                user.save(function(err){
                   if(err){
                     console.log(err);
                     res.send();
                    
                  }
                  else{
                    req.session.password = hash;
                    console.log(req.session);
                    res.send({status:"ok",code:passwords});
                }
            });
          }
             else{
               console.log(err);
               res.send();
          }
        });
            
        }
      });
      }
      catch{
          res.send();
      }
  });

  app.post("/api/login",(req,res)=>{
    var found = 0;
    User.find({})
    .then(async (users)=>{
        console.log(users);
        if(users.length !== 0){
            console.log(1);
            for(var i=0;i<users.length;i++){
                console.log("2");
                let pass = users[i].code;
                let result = await bcrypt.compare(req.body.userCode,pass).catch(()=>{res.send();});
                console.log(result);
                if (result === true){
                    console.log("3");
                    req.session.password = pass;
                    found = 0;
                    res.send({status:"ok"});
                }
                else{
                    console.log("4");
                    found = 1;
                }
            }
        }
        else{
            console.log("5");
            found = 1;
        }
        if (found === 1){
            console.log("6");
            res.send({status:"not registered"});
        }
    })
    .catch(error=>{
       console.log(error);
       res.send();
    });
    
    
  });

  app.get("/api/billsplit",(req,res)=>{
    console.log(req.session);
    if(req.session.password){
    User.findOne({code:req.session.password},(err,result)=>{
        if(err){
            res.send();
            
        }
        else{
            if(result){
                console.log(result);
                res.send({status:"ok",result:result.billsplit,topic:result.topic});
            }
        }
    });
}
else{
    res.send({status:"go to login"});
}
  });

 app.post("/api/billsplit",(req,res)=>{
     if(req.session.password){
     const updatedDetails=  req.body.updatedDetails
     User.findOneAndUpdate({code:req.session.password},{billsplit:updatedDetails},{new:true},function(err,result){
                if(err){
                   res.send();
                }
                else{
                   res.send({status:"ok"});
                }
        });
     
     }
     else{
         res.send({status:"go to login"});
     } 
 });


 app.get("/api/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(!err){
        res.send({logout:"successfully"}); // will always fire after session is destroyed
        }
        else{
            res.send();
        }
      });
 });

 if (process.env.NODE_ENV === "production"){
     app.use(express.static("client/build"));
     const path = require("path");
     app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
     });
     
 }

app.listen(process.env.PORT || 5000, () => {
    console.log("app is running on 5000 port");
  });
