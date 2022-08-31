//jshint esversion:6
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const { Pool,Client } = require('pg')



 const client = new Client({
   user: 'postgres',
   host: '192.168.1.251',
   database: 'pes',
   password: 'aqitumantu1',
   port: 5432,
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
  const nam1=['Raj'];
  const nam2=['Aayog'];
  const nam3=['Vipin'];

  var adata;
  var rdata;
  var vdata;
  var tdata;

///total expense data
  client.query('SELECT SUM(cost) FROM  "ExpenseList";',(err,result)=>{
    if (err){
      console.log(err.stack);
    }else{
      tdata = result.rows[0];
      console.log(tdata);
    }
  })

///expense data of person 1
  client.query('SELECT SUM(cost) FROM  "ExpenseList" where person=$1;',nam1,(err,result)=>{
    if (err){
      console.log(err.stack);
    }else{
      rdata = result.rows[0];
      console.log(rdata);
    }
  })

////expense data of person 2
  client.query('SELECT SUM(cost) FROM  "ExpenseList" where person=$1;',nam2,(err,result)=>{
    if (err){
      console.log(err.stack);
    }else{
      adata = result.rows[0];
      console.log(result.rows);
    }
  })

/// expense data of person 3
  client.query('SELECT SUM(cost) FROM  "ExpenseList" where person=$1;',nam3,(err,result)=>{
    if (err){
      console.log(err.stack);
    }else{
      vdata = result.rows[0];
      console.log(result.rows);
    }
  })

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