const Express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const instituteModel = require('./models/institute.model');

const PORT = 3000;

const app = Express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/institue')
.then(()=>{
    console.log("Database Connected Successfully")
})
.catch((error)=>{
    console.log("Database Connection Error::", error)
})

app.get("/test", (req, res)=>{
    console.log("Testing Successfull");
    res.send("Testing Successfully Completed");
})

app.post("/institute/createInstitute", async(req, res)=>{
    try{
        const sampleInstitute = ["Playhouse", "School", "College", "Competitive Exam Center"];
        const sampleBoard = ["GBSE", "CBSE", "GSAB"];
        const sampleMedium = ["Hindi", "English", "Gujarati"];
        const { institute, board, medium, classCategory,std, subject } = req.body;
        const validInstitute = sampleInstitute.some((element)=> element === institute)

        if(!institute || !validInstitute){
            return res.status(400).send(`Invalid Institute. 
                Please select one of the institute ${sampleInstitute.join(", ")}`)
        }

        if(institute === "School"){
            const validBoard = sampleBoard.some((element)=> element === board);
            if(!board || !validBoard){
                return res.status(400).send(`Invalid Education Board. 
                    Please select one of the board ${sampleBoard.join(", ")}`)
            }
        }

        const validMedium = sampleMedium.some((element)=> element === medium);
        if(!medium || !validMedium){
            return res.status(400).send(`Invalid Medium. 
                Please select one of the medium ${sampleMedium.join(", ")}`)
        }

        if(!std){
            return res.status(400).send("Please enter std");
        }

        if(!subject || !Array.isArray(subject)){
            return res.status(400).send("Invalid Subject.")
        }

        if(!subject?.length){
            return res.status(400).send("Please select atleast one subject");
        }

        await instituteModel.create({
            institute: req.body.institute,
            educationBoard: req.body.board || "",
            classCategory: req.body.classCategory || "",
            medium: req.body.medium || "",
            std: req.body.std,
            subject: req.body.subject
        })

        return res.status(201).send("Data added Successfully")
    }catch(error){
        console.log("Adding Institute Error==>>", error)
    }
})

app.listen(PORT, ()=>console.log(`Server is listing on ${PORT}`));