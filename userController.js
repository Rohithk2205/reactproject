//userController.js
const bcrypt = require('bcryptjs')
const { connectToDatabase } = require('../config/db')
const { generateId } = require('../config/idGenerator')
const jwt = require('jsonwebtoken');

const dataBase = "Toystore"
const users = "Users"
const SECRET_KEY = process.env.SECRET_KEY


async function login(req, res) {
    const client = await connectToDatabase()
    const { username, password } = req.body
    try {
        const collection = client.db(dataBase).collection(users)
        const document = await collection.findOne({username: username})
        if (!document)
            return res.status(404).json()
        if (!await bcrypt.compare(password, document.password)) 
            return res.status(401).json()
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ token , userId: document.userid })
    } 
    catch(err) {
        console.error(err+'hello')
    }
    finally {
        client.close()
        console.log("Disconnected")
    }
}

async function signup(req, res) {
    const client = await connectToDatabase()
    const { username, password } = req.body
    try {
        const collection = client.db(dataBase).collection(users)
        const document = await collection.findOne({username: username})
        if(document) {
            return res.status(409).json()
        } 
        const userId = generateId()
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { userid: userId , username: username, password: hashedPassword }
        const result = await collection.insertOne(userData)
        if(result) {
            return res.status(201).json()
        }
        res.status(501).json()
    } 
    catch(err) {
        console.error(err)
    }
    finally {
        client.close()
        console.log("Disconnected")
    }
}

async function home(req, res) {
    const client = await connectToDatabase()
    const { username, password } = req.body
    try {
        const collection = client.db(dataBase).collection(users)
        const document = await collection.findOne({username: username})
        if(document) {
            return res.status(409).json()
        } 
        const userId = generateId()
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { userid: userId , username: username, password: hashedPassword }
        const result = await collection.insertOne(userData)
        if(result) {
            return res.status(201).json()
        }
        res.status(501).json()
    } 
    catch(err) {
        console.error(err)
    }
    finally {
        client.close()
        console.log("Disconnected")
    }
}
async function cart(req, res) {
    const client = await connectToDatabase()
    
    try {
        const collection = client.db(dataBase).collection(users)
        const document = await collection.findOne({username: username})
        if(document) {
            return res.status(409).json()
        } 
        const userId = generateId()
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { userid: userId , username: username, password: hashedPassword }
        const result = await collection.insertOne(userData)
        if(result) {
            return res.status(201).json()
        }
        res.status(501).json()
    } 
    catch(err) {
        console.error(err)
    }
    finally {
        client.close()
        console.log("Disconnected")
    }
}


module.exports = {
    signup,
    login,
    home,
    cart
} 