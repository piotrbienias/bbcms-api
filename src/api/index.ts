/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

'use strict';

require('module-alias/register');

import 'reflect-metadata';

// Load bootstrap file
// Must be done before any other configuration
import './config/bootstrap';

import axios from 'axios';

import express from 'express';
import cookieParser from 'cookie-parser';


const app = express();


// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

    next();
});


// Global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Example of how service should be called from gateway
app.get('/service/storage/directories/root', async (req, res) => {
    const response = await axios.get(`http://storage:8100/storage/directories/root`);
    res.send(response.data);
});

app.get('/service/system/users', async (req, res) => {
    const response = await axios.get('http://system:8101/system/users');
    res.send(response.data);
});


// Start the API Gateway
app.listen(process.env.PORT || 8181, () => {
    console.log(`bbCMS API Gateway listening on port ${process.env.PORT || 8181}`);
});



export default app;