import express from "express";
import Thread from "../models/Thread.js";
import crypto from "crypto";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: crypto.randomUUID(),
            title: "Test Chat",
        });

        const response = await thread.save();

        res.json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message,
            message: "Failed to save in database"
        });
    }
});

//GET all threrad

router.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({
            updatedAt: -1
        });
        res.json(threads);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message,
            message: "Failed to fetch threads"
        });
    }
});

//Send the info on particular thread based on the thread id

router.get("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {

        const thread = await Thread.findOne({ threadId });
        if (!thread) {
            res.status(404).json({ message: "Thread not found" })

        }
        res.json(thread.messages);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message,
            message: "Failed to fetch thread"
        });
    }
});


//Delete a thread based on thread id

router.delete("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {

        const deletedThread = await Thread.findOneAndDelete({ threadId });
        if (!deletedThread) {
            res.status(404).json({ message: "Thread could not deleted" })

        }
        res.status(200).json({ message: "Thread deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message,
            message: "Failed to delete thread"
        });
    }
});

//Post a message to a thread

router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        return res.status(400).json({
            message: "threadId and message are required"
        });
    }

    try {
        let thread = await Thread.findOne({ threadId });

        if (!thread) {
            thread = new Thread({
                threadId,
                title: message,
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ]
            });
        } else {
            thread.messages.push({
                role: "user",
                content: message
            });
        }

        // Get AI response
        const assistantReply = await getOpenAIAPIResponse(message);

        // Save AI response
        thread.messages.push({
            role: "assistant",
            content: assistantReply
        });

        thread.updatedAt = new Date();

        await thread.save();

        res.json({
            message: "Message added successfully",
            reply: assistantReply
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            error: err.message,
            message: "Failed to add message"
        });
    }
});

export default router;