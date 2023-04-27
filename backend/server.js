const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config()

// const mongoURI = "mongodb+srv://Purple:VgepOb3iPGnVIx9P@cluster0.95zsl1i.mongodb.net/users?retryWrites=true&w=majority";

const app = require("./app");

// DB Connection
mongoose.connect(process.env.mongo_URI).then(console.log("CONNECTED!!!! TO THE DATABASE"));

// start server
const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`Server started on port ${port} and listening`);
});