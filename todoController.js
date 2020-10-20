var bodyParser=require('body-parser');
var mongoose=require('mongoose');

//connect to database
mongoose.connect('mongodb+srv://test:test@todo.s7knn.mongodb.net/<dbname>?retryWrites=true&w=majority');


// create a schema
var todoschema=mongoose.Schema({
     item: String 
});  

var model=mongoose.model('todo',todoschema)

/*var itemOne= model({item:'buy flowers'}).save(function(err){
     if(err) throw err;
     console.log('item saved');
});*/





var urlencodedParser=bodyParser.urlencoded({extended:false});

// var data=[{item:'get milk'},{item:'walk dog'},{item:'finish assignmennt'}] ;


module.exports= function(app)
{
//GET request for the url
    app.get('/todo',function(req,res){
       //get data from mongoDB and pass it to theview
       model.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos:data});
       });
   });
 
 //handling POST request(on the form)

    app.post('/todo',urlencodedParser,function(req,res){
         // get data from view and add it to mongoDB
         var newtodo = model(req.body).save(function(err,data){
                if(err) throw err;
                res.json(data);

         });
        
    });

    //delete/strike out things done
    app.delete('/todo/:item',function(req,res){
         // delete requested item from mongoDB
         model.find({item: req.params.item.replace(/\-/g," ")}).deleteOne(function(err,data){
              if(err) throw err;
              res.json(data);
         })

    });
         /* data = data.filter(function(todo){
               return todo.item.replace(/ /g,"-") !== req.params.item;
          });

     res.json(data);
    });*/
};




