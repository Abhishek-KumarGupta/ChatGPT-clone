import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {

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

        console.log(data);

        return data.candidates[0].content.parts[0].text;

    } catch (err) {
        console.log(err);
        throw err;
    }
};

export default getOpenAIAPIResponse;