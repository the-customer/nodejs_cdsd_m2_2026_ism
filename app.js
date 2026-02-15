// const express = require('express')
// const { config } = require('./config')
import express from "express";
import { config } from "./config.js"
import { books, users } from "./data.js";
import bookRoutes from "./routes/book.routes.js";
import userRoutes from "./routes/user.routes.js";


export function createApp(){
    const app = express();
    app.get('/',(req, res)=>{
        return res.send(`
            <h1>Welcome to <code style='color:red'>${config.appName}</code></h1>
            <pres>API : /api/books</pres>
        `)
    })

    app.get('/info',(req, res)=>{
        return res.json({
            status: "ok",
            env: config.env,
            app: config.appName,
            time: new Date().toISOString()
        })
    });
    app.use(express.json());//allow ass to retrieve the request bady
    //Using the books resource routes 
    app.use(`${config.apiPrefix}/books`,bookRoutes);
    //Using the users resource routes 
    app.use(`${config.apiPrefix}/users`,userRoutes);



    return app;
}

