const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person-model");

mongoose.set("strictQuery", false); //경고가 뜨지 않음

const app = express();
app.use(bodyParser.json()); //HTTP에서 Body를 파싱하기 위한 설정
app.listen(3000, async() => {
    console.log("Server Started");
const mongodbUri = "mongodb+srv://ld210:Test880423@cluster0.dik9vhw.mongodb.net/?retryWrites=true&w=majority";

//MongoDB Connection
mongoose.connect(mongodbUri, {useNewUrlParser: true})
    .then(console.log("Connected to MongoDB"));
});

//Person Data print
app.get("/person", async(req, res) => {
    const person = await Person.find({});
    res.send(person);
});

//Find by Email
app.get("/person/:email", async(req, res) => {
    const person = await Person.findOne({email: req.params.email});
    res.send(person);
});

//Insert Person
app.post("/person", async (req, res) => {
    const person = new Person(req.body);
    await person.save();
    res.send(person);
});

//Update Person
app.put("/person/:email", async(req, res) => {
    const person = await Person.findOneAndUpdate(
        {email: req.params.email},
        {$set: req.body},
        {new: true}
    );
    console.log(person);
    res.send(person);
});

//Delete Person
app.delete("/person/:email", async(req, res) => {
    await Person.deleteMany({email: req.params.email});
    res.send({success: true});
})