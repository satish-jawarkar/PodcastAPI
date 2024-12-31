const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

app.use(express.json()); //Middleware

//DB Connection
mongoose
.connect()
.then(() => {
    console.log("Server is connected!")
    app.listen(1000, () => {
        console.log("Running on port 3000");
    })
})
.catch((err) => {
    console.log(`Unexpected Error! ${err}`);
})

//Handling Requests
app.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({messsage : 'User Already Exists!'})
        }
        const newUser = new User({username, email, password});
        await newUser.save();
    }
    catch(err){
        res.status(400).json({message : `Internal Server Error occured ${err}`});
    }
})
.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({messsage : 'Invalid Email!'});
        }
        if(user.password != password){
            return res.status(400).json({messsage : 'Invalid Password!'});
        }
        res.status(200).json({ message: 'Login successful', user });

    }
    catch(err){
        res.status(400).json({message : `Internal Server Error Occured ${err}`});
    }
});