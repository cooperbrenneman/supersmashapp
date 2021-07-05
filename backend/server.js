import express from "express"
import cors from "cors"
import { } from 'dotenv/config'
import mongoose from 'mongoose';
import fighters from "./routes/fighters.js"
import matches from "./routes/matches.js"
import stages from "./routes/stages.js"
import users from "./routes/users.js"


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection was established successfully");
});

app.use("/api/v1/fighters", fighters);
app.use("/api/v1/matches", matches);
app.use("/api/v1/stages", stages);
app.use("/api/v1/users", users);
app.use("*", (req, res) => res.status(404).json({error:"Not found"}));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});