import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post("/test", async (req, res) => {

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: req.body.message
                        }
                    ]
                }
            ]
        })
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        console.log(data);
       res.send(data.candidates[0].content.parts[0].text);

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});