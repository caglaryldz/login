const express = require("express");
const collection = require("./config");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());



// Register User
app.post("/register", async (req, res) => {
    collection.create(req.body).then(user => { res.json(user) }).catch(err => res.json(err))
});

app.post("/login", async (req, res) => {
    const { name, password } = req.body;
    collection.findOne({ name: name }).then(user => {
        if (user) {
            if (user.password === password) {
                res.status(200);
            }
            else {
                res.status(403);

                console.log("sifre yanlis");
            }
        }
        else {
            res.status(404);
            console.log("kullanici yok");

        }
    })
});

// Define Port for Application
const port = 5002;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});