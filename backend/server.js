import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);



import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}

// app.post("/test", async (req, res) => {

//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             contents: [
//                 {
//                     parts: [
//                         {
//                             text: req.body.message
//                         }
//                     ]
//                 }
//             ]
//         })
//     };

//     try {
//         const response = await fetch(url, options);
//         const data = await response.json();

//         console.log(data);
//        res.send(data.candidates[0].content.parts[0].text);

//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err);
//     }
// });