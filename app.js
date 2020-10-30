   //this is the entry point for our app.
   
   
   let express=require('express');
   let ejs=require('ejs');
   let app=express(); 
   let todoController=require('./todoController');


   app.set('view engine', 'ejs');

   app.use('/assets',express.static('assets'));

   app.listen(3000);
   console.log('Listening to port 3000');

   //fire controllers:
   todoController(app);
