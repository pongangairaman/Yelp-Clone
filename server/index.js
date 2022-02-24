const express = require("express");
const cors = require('cors');
const app = new express();
const pool = require("./db/db.js");

app.use(cors({
    origin: "*"
}));
app.use(express.json());

app.post("/restaurants", async (req,res)=>{
    console.log(req.body);
    try {
        //const body= req.body;
        const result = await pool.query("INSERT INTO restaurants(name,location,price_range) VALUES($1,$2,$3) RETURNING *",[req.body.name,req.body.location,req.body.price_range]);
        //console.log(result);
        res.status(201).json({
            status : "success",
            data : {
                restaurants : result.rows[0]
            }
        });
    } catch (err) {
        console.error(err.message);
    }});

app.get("/restaurants", async (req,res)=>{
    try {
        const result = await pool.query("SELECT * FROM restaurants");
        console.log(result);
        res.status(200).json({
            status: "success",
            data : result.rows
        })
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/restaurants/:id", async (req,res)=>{
    try {
        //console.log(req.params);
        const {id} = req.params;
        const result = await pool.query("SELECT * FROM restaurants WHERE id = $1",[id]);
        console.log(result);
        res.status(200).json({
            status: "success",
            data:{
                restaurant : result.rows[0]
            }
        });
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/restaurants/:id", async (req,res)=>{
    try {
        console.log(req.body);
        const {id}= req.params;
        const {name,location,price_range}= req.body;
        const result = await pool.query("UPDATE restaurants SET name = $1,location = $2,price_range = $3 WHERE id = $4 RETURNING *",[name,location,price_range,id]);
        console.log(result);
        res.status(202).json("okay");
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/restaurants/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const result = await pool.query("DELETE FROM restaurants WHERE id = $1",[id]);
        //console.log(result);
        res.status(200).json("Deleted succesfully");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5001,()=>console.log("The server is up and listening on port 5001.. and nodemon is working good.."));