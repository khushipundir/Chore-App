   //this is the entry point for our app.
   
   
   var express=require('express');
   var app=express(); 
   var todoController=require('./todoController');


   app.set('view engine', 'ejs');

   app.use('/assets',express.static('assets'));

   app.listen(3000);
   console.log('Listening to port 3000');

   //fire controllers:
   todoController(app);