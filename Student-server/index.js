import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
import { UserRouter } from './routes/user.js'
import UserModel from './models/Users.js' 


const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials :true
}))
app.use(cookieParser())
app.use('/auth', UserRouter)

mongoose.connect(process.env.MONGO_URL)

// app.get('/getUsers', (req, res) => {
//     const id = req.params.id;
//     UserModel.findById({_id:id})
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })

// app.post('/create', (req, res) => {
//     UserModel.create(req.body)
//     .then(user => res.json(user))
//     .catch(err => res.json(err))
// })

// app.put('/update/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndUpdate({_id: id}, {
//         name: req.body.name,
//         image: req.body.image,
//         age: req.body.age,
//         status: req.body.status,

//     }).then(user => res.json(user))
//     .catch(err => res.json(err))
// })

// app.delete('/deleteuser/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndDelete({_id: id})
//     .then(response => res.json(response))
//     .catch(err => res.json(err))
// })
// CREATE a new user
app.post('/users', async (req, res) => {
    try {
        const user = new UserModel(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// READ all users
app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// READ a single user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// UPDATE a user by ID
app.patch('/users/:id', async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on ${process.env.PORT}`)
})
