// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db.js');

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({
            success: false, 
            error: "The users information could not be retrieved."
        })
    })
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
       
    // if(!userInfo.name || !userInfo.bio){
    //     res.end();
    //     res.status(400).json({
    //         errorMessage: "Please provide name and bio for the user." 
    //     })
    // }

    db.insert(userInfo)
        .then(user => {
            res.status(201).json({ success: true, user})
            
        })
        .catch(err => {
            res.status(500).json({
                success: false, 
                err
            })
        })
})


server.listen(4000, () => {
    // this callback function run after the server starts successfully
    console.log('\n*** Server Running on http://localhost:4000 ***\n')
})