//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const { Pool,Client } = require('pg')



 const client = new Client({
   user: 'DBUser',
   host: 'DBHost',
   database: 'ReplaceWithDBName',
   password: 'DBPassword',
   port: DBPort,
 })

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//setting and using some important file
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

/// lshow entry form on home 
app.get("/", function(req,res){
    res.render("entry");
})


////liste on /show to show all datas

app.get("/show", function(req,res){
 ///total expense data
 var tdata;
  client.query('SELECT SUM(cost) FROM  "ExpenseList";',(err,result)=>{
    if (err){
      console.log(err.stack);
    }else{
      tdata = result.rows[0];
      console.log(tdata);
    }
  })
 //-------------copy from here to add another person----------
 const nam1=['_Name1'];
 var _Name1;
 client.query('SELECT SUM(cost) FROM  "ExpenseList" where person=$1;',nam1,(err,result)=>{
    if (err){
      console.log(err.stack);
    }else{
      rdata = result.rows[0];
      console.log(rdata);
    }
  })
 //----------copy till here to add another person--------------



///show everything from expense list and render main file

  client.query('select * from "ExpenseList";', (err, result) => {
    if (err) {
      console.log(err.stack)
    } else {
      var data=result.rows;
      res.render("show" ,{dat:{data:data,rdata:rdata,adata:adata,vdata:vdata,tdata:tdata}});
      console.log(vdata);
          } 
    }); 
})

//posting data from form to database

app.post("/", function(req,res){
    
    var { person,cost,item } = req.body;
    client.query('insert into "ExpenseList"(person,cost,item) values($1,$2,$3);', [person,cost,item], (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows[0]);
        client.end();
      }
    })
})

//listen on port 3000

app.listen(3000,function(){
    console.log("sever started");
});
