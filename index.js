const express = require('express');
const server = express();
const db = require('./data/db.js');
const cors = require('cors');

server.use(express.json());
server.use(cors());


server.get('/', (req,res)=>{
    res.send('hello web20 node edition')
})

server.get('/api/users', (req, res)=>{
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error=>{
        res.status(500).json({ error: "The users information could not be retrieved." });
    })
})

server.get('/api/users/:id', (req, res)=>{
    const id = req.param.id;
    db.findById(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error=>{
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    })
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    if(!userInfo.name || !userInfo.bio){
        res.status(400)
        .json({ errorMessage: "Please provide name and bio for the user." })
        
    }
    db.insert(userInfo)
    .then(user=> {
          res.status(201).json(user);
    })
    .catch(error => {
        res.status(500)
        .json({ error: "There was an error while saving the user to the database" })
        
    })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(deleted => {
        if(deleted){
            res.status(204).end();
        }else{
            res.send(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
})

server.put('/api/users/:id', (req, res)=>{
    const id = req.params.id;
    const changes = req.body;
    if(!changes.name || !changes.bio){
        res.status(400).end()
    }
    db.update(id, changes)
    .then(updated => {
        if(updated){
            res.status(200).json(updated);
        }else{
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be modified." });
    })
})
const port = 8000;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`));