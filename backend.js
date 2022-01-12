const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
var userIds = ['xyz789', 'abc123', 'ppp222', 'yat999', 'zap555'];

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
	    res.send('Hello World!');
});

app.listen(port, () => {
	    console.log(`Example app listening at http://localhost:${port}`);
});      

const users = { 
	users_list :
	[
			  { 
					   id : 'xyz789',
					   name : 'Charlie',
					   job: 'Janitor',
					},
			  {
					   id : 'abc123', 
					   name: 'Mac',
					   job: 'Bouncer',
					},
			  {
					   id : 'ppp222', 
					   name: 'Mac',
					   job: 'Professor',
					}, 
			  {
					   id: 'yat999', 
					   name: 'Dee',
					   job: 'Aspring actress',
					},
			  {
					   id: 'zap555', 
					   name: 'Dennis',
					   job: 'Bartender',
					}
		   ]
}
// app.get('/users', (req, res) => {
// 	 res.send(users);
// });

app.get('/users', (req, res) => {
    const name = req.query.name;
	const job = req.query.job;
	if (name != undefined && job != undefined){
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined && job == undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
	else if (job != undefined && name == undefined){
        let result = findUserByJob(job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => { 
    return users['users_list'].filter( (user) => user['job'] === job); 
}

const findUserByNameAndJob = (name, job) => { 
    return users['users_list'].filter( (user) => user['name'] === name && user['job'] === job); 
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

function randIdGen() {
	var alpha = "abcdefghijklmnopqrstuvwxyz";
	var alpha_len = alpha.length;
	var nums = "0123456789";
	var nums_len = nums.length;
	var ret_str = ""

	while (true) {
		for (var i = 0; i<3; i++) {
			randIndex = Math.floor(Math.random() * alpha_len);
			randomChar = alpha.charAt(randIndex);
			ret_str += randomChar;
		}

		for (var i = 0; i<3; i++) {
			randIndex = Math.floor(Math.random() * nums_len);
			randomNum = nums.charAt(randIndex);
			ret_str += randomNum;
		}
		if (!(userIds.includes(ret_str))) 
			userIds.push(ret_str);
			break;
	}

	return ret_str
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
	userToAdd.id = randIdGen();
    addUser(userToAdd);
    res.status(201).end();
});

function addUser(user){
    users['users_list'].push(user);
}

// structure "DELETE" body like so
// {
//    "id" : [insert id number]
// }
app.delete('/users', (req, res) => {
    const idToDelete = req.body.id;
    delUser(idToDelete);
    res.status(200).end();
});

function delUser(id){
	var user = findUserById(id)
	var index = users['users_list'].indexOf(user)
    users['users_list'].splice(index, 1);
}
