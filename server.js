const express=require('express')
const mongoose=require('mongoose')
const app = express();
const productmodel=require("./Models/ProductSchema")

// To get the Json data the middleware is responsible
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("This is a test")
})

app.post('/addProduct',async(req,res)=>{ // async --> handles the request for the database
    // console.log(req.body)
    // res.send(req.body)
    try{
        const product= await productmodel.create(req.body) 
        res.status(200).json(product)

    }
    catch(error){
    // console.log("Something went wrong", error)
    res.status(500).json({message: error.message})
    }

})

app.get('/getProduct',async(req,res)=>{
    // console.log(res.json())
    try{
        const product= await productmodel.find({});
        res.status(200).json({message:product})

    }

    catch(error){
        res.status(500).json({message:error.message})
    }
})


mongoose.connect(
"mongodb+srv://developerfs300:56XERLriYWXj8Eau@nodejstutorial.uch22wh.mongodb.net/NodeJsTutorial"
    )
.then(()=>{
    console.log("Database connection established")
    app.listen(1800,()=>{
        console.log("Welcome to the server")
        })
        
}).catch((error)=>{
    console.log("error connecting to",error)
})

// mongodb+srv://developerfs300:<password>@nodejstutorial.uch22wh.mongodb.net/test