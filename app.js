const express = require('express');
require('dotenv').config();

const cors = require('cors');
const userRoute = require('./app/routes/user.route');
const app = express();
const port = process.env.APP_PORT || 3000;

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`Current Request------ ${req.method} ${req.url}`, req.body);
    next();
});


app.get("/", (req, res) => {
    res.json({ message: "Welcome to CoderKoder application." });
});

app.use('/api/users', userRoute); // Correcting the route for userRoute

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
