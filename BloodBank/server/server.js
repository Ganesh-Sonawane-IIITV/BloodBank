const express = require('express')
const app = express();
const port = process.env.PORT || 5000
require('dotenv').config();
const dbconfig = require('./config/dbconfig')
app.use(express.json());

const usersRoute = require('./routes/UsersRoute');
const inventoryRoute = require('./routes/inventoryRoutes');

app.use('/api/users', usersRoute);
app.use('/api/inventory', inventoryRoute);


app.listen(port,()=>console.log(`Node Js is started at ${port}`));
