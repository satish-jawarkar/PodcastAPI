const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Podcast = require('./models/Podcast');
const cors = require('cors');

const app = express();

app.use(cors({ origin : 'http://localhost:3000' , methods: ['GET', 'POST']}))
app.use(express.json()); //Middleware

//DB Connection
mongoose
.connect(`mongodb://localhost:27017/podcasts`)
.then(() => {
    console.log("Server is connected!")
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
            return res.status(400).json({message : 'User Already Exists!'})
        }
        const newUser = new User({username, email, password});
        await newUser.save();
        res.status(200).json({message : 'User created!'})
    }
    catch(err){
        res.status(400).json({message : `Internal Server Error occured ${err}`});
    }
})
// app.post('/signup', async (req, res) => {
//     const { username, email, password } = req.body;
//     console.log('Request Body:', req.body);

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User Already Exists!' });
//         }
//         const newUser = new User({ username, email, password });
//         await newUser.save();
//         res.status(200).json({ message: 'User created!' });
//     } catch (err) {
//         if (err.code === 11000) {
//             res.status(400).json({ message: 'Username or Email already exists!' });
//         } else {
//             res.status(400).json({ message: `Internal Server Error: ${err}` });
//         }
//     }
// })
.post('/signin', async (req, res) => {
    console.log("Request Body:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
        console.log("Missing email or password.");
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("Invalid Email:", email);
            return res.status(400).json({ message: 'Invalid Email!' });
        }
        if (user.password !== password) {
            console.log("Invalid Password for Email:", email);
            return res.status(400).json({ message: 'Invalid Password!' });
        }
        console.log("Login successful for:", email);
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ message: `Internal Server Error: ${err.message}` });
    }
})
.get('/podcasts', async (req, res) => {
    const { category } = req.query;
    try{
        let q = {};
        if(category){
            q.category = category;
        }
        const podcasts = await Podcast.find(q);
        res.json(podcasts);
    }
    catch(e){
        res.status(400).json({message : "Error"});
    }
});

app.listen(1000, () => {
    console.log("Running on port 1000");
})