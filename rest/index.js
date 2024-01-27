const {userValidator} = require('./validator');
const express = require('express');
const fs = require('fs');
const uuid = require('uuid');

const app = express();
const port = 3000;
const usersDB = "users.json";

app.use(express.json());

app.get('/users', (req, res) => {
    res.send(fs.readFileSync(usersDB));
})

app.get('users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersDB, "utf8"));
    const userByID = users.find((user) => user.id === Number(req.params.id));

    if (userByID) {
        res.send(userByID);
    } else {
        res.status(404);
        res.send({userByID: null});
    }
})

app.post('/adduser', (req, res) => {
    userValidator(req.body, res);
    const users = JSON.parse(fs.readFileSync(usersDB, "utf8"));
    const newUserID = uuid.v4();
    console.log(req.body)
    users.push({
        id: newUserID,
        ...req.body
    })
    fs.writeFileSync(usersDB, JSON.stringify(users))
    res.send({id: newUserID})
})

app.put('/changeuser/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersDB, "utf8"));
    let userByID = users.find((user) => user.id === req.params.id);

    if (userByID) {
        userByID.firstName = req.body.firstName;
        userByID.secondName = req.body.secondName;
        userByID.age = req.body.age;
        fs.writeFileSync(usersDB, JSON.stringify(users))
        res.send({userByID});
    } else  {
        res.status(404);
        res.send({user: null});
    }
})

app.delete('/deleteuser/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersDB, "utf8"));
    let userByID = users.find((user) => user.id === (req.params.id));
    console.log(userByID)
    if (userByID) {
        users.splice(users.indexOf(userByID), 1);
        fs.writeFileSync(usersDB, JSON.stringify(users))
        res.send({userByID});
    } else  {
        res.status(404);
        res.send({user: null});
    }
})

app.listen(port, () => {
    console.log("server running...")
})
