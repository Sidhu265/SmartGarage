const express = require("express");
const cors = require('cors');
const app = express();
const db = require('./db');
const userRoutes = require('./routes/userroute');
const carRoutes = require('./routes/carroute');
const port = 3000;
app.use(cors(
    {
    origin: ['https://smart-garage-frontend-orpin.vercel.app'],
    methods: ["POST","GET", "PUT", "DELETE", "PATCH", "OPTIONS"],
    "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
        ],

    credentials: true
    }
));
app.use(express.json());
app.use('/api/users', userRoutes)
app.use('/api/cars', carRoutes)
db.once('open', () => {
    // console.log('Connected to MongoDB');
    app.listen(port,()=>console.log(`Server started in ${port}`));
});
