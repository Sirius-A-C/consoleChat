
let express = require('express');
var app = express();
var port = process.env.PORT||8000;
var bodyParser = require('body-parser');
const { response } = require('express');


var message = {from: 5 , message: "" };

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



  app.get("/", (req, res) => {
    res.sendStatus(200);
  });
  
  app.listen(port, () => {
    console.log("server started on port "+port);
  });
 
  
  app.post('/',function(req,res){
    printStatus(req);
   
    var type = req.body.type;
    if(type == "RECEIVE"){
      processReciveRequest(req, res);
      return;
    }

    if(type=="SEND"){ 
    processSendRequest(res,req);
   
    return;
    }

  
  
  });

  
function printStatus(req) {
  console.log("Request");
  console.log(req.body);
  console.log("Store:");
  console.log(message);
  console.log(Math.random()*100);
}

function processSendRequest(res,req) {
  res.sendStatus(200);
  message.from = req.body.id;
  message.message = req.body.message;
}

function processReciveRequest(req, res) {
  
  if (message.from == req.body.id) {
    res.send (message.message);
    message.from = 5;
    message.message = "";
    return;
  }
  res.sendStatus(200);
  
}

