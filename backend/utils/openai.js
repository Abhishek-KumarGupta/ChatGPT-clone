
import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {

    const url =
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

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
                            text: message
                        }
                    ]
                }
            ]
        })
    };

    try {

        const response = await fetch(url, options);

        const data = await response.json();

        console.log("Gemini Response:", data);

        // Rate limit error
        if (response.status === 429) {
            const retryMsg = data.error?.message || "Rate limit exceeded";
            const retryMatch = retryMsg.match(/retry in ([\d.]+)s/);
            const waitSec = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) : 30;
            throw new Error(`Rate limit exceeded. Please retry in ${waitSec} seconds.`);
        }

        // Gemini API error
        if (!response.ok) {
            throw new Error(
                data.error?.message || "Gemini API request failed"
            );
        }

        // Check candidates
        if (!data.candidates || !data.candidates[0]) {
            throw new Error("No response received from Gemini");
        }

        const reply =
            data.candidates[0].content.parts[0].text;

        return reply;

    } catch (err) {

        console.error("Gemini API Error:", err);

        throw err;
    }
};

export default getOpenAIAPIResponse;

