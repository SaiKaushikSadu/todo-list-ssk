//Formality
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');
const app=express();

//middleware
app.use(express.json());
app.use(cors());

//configure .env file
dotenv.config();

//database
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
    .then(()=>console.log("Connected to database"))
    .catch(console.error);

const Todo=require("./models/todos");

//get data
app.get('/todos',async(req,res)=>{
    try{
        const todos=await Todo.find();
        res.status(200).json(todos);
    }
    catch{
        res.status(500).json("Unable to get your tasks");
    }
})

//insert data
app.post('/todo/new',async(req,res)=>{
    const todo=new Todo(req.body)
    try{
        const saveTodo=await todo.save();
        res.status(200).json(saveTodo);
    }
    catch{
        res.status(500).json("Unable to add new Task");
    }
})

//delete data
app.delete('/todo/delete/:id',async(req,res)=>{
    try{
        const todo=await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json(todo);
        // window.location.reload();
    }
    catch(error){
        res.status(500).json("Unable to delete");
    }
})

//complete or not complete
app.get('/todo/complete/:id',async(req,res)=>{
    try{
        const todo=await Todo.findById(req.params.id);
        todo.complete=!todo.complete;
        todo.save();
        res.status(200).json(todo);
    }
    catch{
        res.status(500).json("Not altered");
    }
})

//post where the server runs
app.listen(3001, ()=> console.log("Server Running!!"))
