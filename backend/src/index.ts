import express from "express";
import bodyParser from "body-parser";
var cors = require('cors')

import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();

const app=express();
app.use(cors());
app.use(bodyParser.json());

app.post("/insertUser",async (req:any,res:any)=>{
    const {username,codeLanguage,stdin,sourceCode}=req.body;
    console.log(req.body);
    try{
        const insertedUser=await insertUser(username,codeLanguage,stdin,sourceCode);
        res.json({success: true, data: insertedUser});
    }
    catch(error){
        console.log("error inserting user");
        res.status(500).json({success: false, error:"error inserting data"})
    }
})


app.get("/allSubmissions",async (req,res)=>{
    // console.log("hi");
    try{
        const submissions=await prisma.codeEntries.findMany();
        res.json(submissions);
    }
    catch(error){
        console.log("error while fetching data");
        res.status(500).json({error:"error while fetching data"});
    }
})



async function insertUser(username:string, codeLanguage: string, stdin: string,sourceCode:string) {
    const res=await prisma.codeEntries.create({
        data:{
            username,
            codeLanguage,
            stdin,
            sourceCode
        }
    })
    console.log(res);
    return res;
}

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
});
