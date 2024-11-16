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
