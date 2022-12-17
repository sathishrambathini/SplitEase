const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routeSpl");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.listen(8086, ()=>{
    console.log("http://localhost:8086");
});

const dbUrl = "mongodb+srv://splitbill:6xer8S16E1b9zvvJ@cluster0.mhz09lz.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(
    dbUrl,
    {
        useNewUrlParser: true,
    },
    (err) => {
        if(err){
            console.log("erer", err);
        }else{
            console.log("DB is connected");
        }
    }
);

app.use("/api", routes);    