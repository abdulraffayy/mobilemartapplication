const express = require("express");
const connectDB = require("./dbconnection/db");
const cors = require('cors');



// const populatedb = require("./populatedb/populatedb")

// populatedb()



const userRoutes = require("./routes/userRoutes");
const iphoneRoutes = require("./routes/iphoneroute");

 // Correct file name



 // Populate the database with iPhones

connectDB();

// Optional: Print the products to verify

const app = express();


app.use(cors());

// Middleware to parse JSON
app.use(express.json());  
// use iphone routes for

app.use("/api", iphoneRoutes);  





// Routes
app.use("/auth", userRoutes);  

app.get("/", (req, res) => {
    res.send("Server is running");
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});