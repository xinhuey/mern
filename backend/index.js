import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/bookRoute.js';

const app=express();

//Middleware for parsing request body
app.use(express.json());

app.get('/', (request, response)=>{
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack tutorial')
});

app.use('/books', booksRoute);

//Middleware for handling CORS policy
//Option #1 : allow all origins with default of cors (*)
app.use(cors());

//Option #2: allow custom origins
app.use(
    cors({
        origin: 'http://loclahost:3000',
        methods:['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders:['Content-Type'],
    })
);


mongoose    
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () =>{
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });