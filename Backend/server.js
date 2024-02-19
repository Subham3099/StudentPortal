const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json())
app.use(cors());


const db = mysql.createConnection({
    host: "localhost",
    port: "3307",
    user: "root",
    password: "root123",
    database: "CRUD"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Define the route to fetch data
app.get("/", (req, res) => {
    const sql = 'SELECT * FROM student';
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data from MySQL: ', err);
            return res.status(500).json({ error: "Error fetching data" });
        }
        return res.json(data);
    });
});

app.post("/create",(req,res)=>{
    const sql = "INSERT INTO student (Name,Email) VALUES (?) ";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql , [values] , (err,data)=>{
        if(err) {
            console.error('Error inserting data to MySQL: ', err);
            return res.json("Error");
        }
        return res.json(data);
    })
})


app.put("/update/:id",(req,res)=>{
    const sql = "UPDATE student SET Name = ?, Email = ? WHERE ID = ?";
    const values = [
        req.body.name,
        req.body.email
    ]
    const id = req.params.id;
    db.query(sql , [...values,id] , (err,data)=>{
        if(err) {
            console.error('Error inserting data to MySQL: ', err);
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.delete("/student/:id",(req,res)=>{
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;
    db.query(sql , id , (err,data)=>{
        if(err) {
            console.error('Error deleting data from MySQL: ', err);
            return res.json("Error");
        }
        return res.json(data);
    })
})
// Start the server
const port = 8081;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
