const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { NoteModel } = require("../model/note.model");

const noteRouter = express.Router();
noteRouter.use(auth)

noteRouter.post("/create",async(req,res)=>{
    try{
        const note = await NoteModel(req.body)
        await note.save()
        res.status(200).send({message: "A new note has been created"})
    }
    catch(err){
        console.log(err)
        res.status(400).send({error: err})
    }
})


noteRouter.get("/",async(req,res)=>{
    try{
        const notes = await NoteModel.find({username: req.body.username})
        res.status(200).send(notes)
    }
    catch(err){
        console.log(err)
        res.status(400).send({error: err})
    }
})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    const {noteID} = req.params
    const note = await NoteModel.findOne({_id:noteID})
    try{
        if(req.body.userID == note.userID){
            await NoteModel.findByIdAndUpdate({_id:noteID}, req.body)
            res.status(200).send({message: `Note with ID:${noteID} has been updated`})
        }
        else{
            res.status(200).send({message: "You are not authorized"})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send({error: err})
    }
})

noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const {noteID} = req.params
    const note = await NoteModel.findOne({_id:noteID})
    try{
        if(req.body.userID == note.userID){
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.status(200).send({message: `Note with ID:${noteID} has been deleted`})
        }
        else{
            res.status(200).send({message: "You are not authorized"})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send({error: err})
    }
})


module.exports = { noteRouter };