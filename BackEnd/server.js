const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser') //declare middleware body parser
const mongoose = require('mongoose'); // mongoose declared
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
 res.header("Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept");
 next();
});


app.use(express.static(path.join(__dirname,'../build'))); //location of the build folder
app.use('/static', express.static(path.join(__dirname, 'build/static')));

mongoose.set('useFindAndModify', false);
//link to connect mongodb
const connectionString = 'mongodb+srv://admin:admin1@cluster0.e93y3.mongodb.net/recipes?retryWrites=true&w=majority';
mongoose.connect(connectionString, { useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false});

const Schema = mongoose.Schema;

//define schema for database, how db looks like
var recipeSchema = new Schema({
  title: String,
  recipeDetail: String,
  pic: String //picture

});

//when we interact with db we just refer to RecipeModel variable
var RecipeModel = mongoose.model("recipes", recipeSchema);

//just test
app.get('/',(req,res)=>{
    res.send("server working!")
})


//get request which returns the recipes array at localhost:4000
app.get('/recipes', (req, res) => {

  //callback function, finds all records in db
  RecipeModel.find((err, data) => {

    res.json(data);
  })

})

app.post('/recipes', (req, res) => {
  res.send('Data Received');

  RecipeModel.create({
    title: req.body.Title,
    recipeDetail: req.body.Recipe,
    pic: req.body.Pic

  })

  //we didnt send the confirmation that we created the recipe,
  //client tried to send it again
  //we have to send a response that recipe has been added
  res.send('Recipe succesfully Added.')
})

app.get('/recipes/:id', (req, res) => {
  console.log(req.params.id);

  RecipeModel.findById(req.params.id, (err, data) => {
    res.json(data)
  })
})

//update function
app.put('/recipes/:id', (req, res) => { //pulls the id out of URL
  console.log("Updated " + req.params.id);

  console.log(req.body);
  //makes async call to the database, and updates the record
  RecipeModel.findByIdAndUpdate(req.params.id, req.body, { new: true},
    (err, data) => {
      console.log(err);
      res.send(data);

    })
})

//deletes the recipe
app.delete('/recipes/:id', (req, res) => {
  console.log('Delete:' + req.params.id);

  RecipeModel.findByIdAndDelete({ _id: req.params.id }, (err, data) => {
    if (err)
      res.send(err);
    res.send(data);

  })
})

app.get('*', (req,res)=>{ //listnes at every URL except the ones that are specified above
  res.sendFile(path.join(__dirname+'../../build/index.html'));
})

//listens at the specific port, in this case its 4000
app.listen(port, () => {
  console.log(`App Listening at http://localhost:${port}`)
})