
import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();


// POST message to a thread
router.post("/chat", async (req, res) => {
    try {
        const { threadId, message } = req.body;

        console.log("Request body:", req.body);

        // Check required fields
        if (!threadId || !message) {
            return res.status(400).json({
                message: "threadId and message are required"
            });
        }

        // Find existing thread
        let thread = await Thread.findOne({ threadId });

        // Get AI response
        const assistantReply = await getOpenAIAPIResponse(message);

        console.log("AI Response:", assistantReply);

        // If thread doesn't exist, create a new one
        if (!thread) {
            thread = new Thread({
                threadId: threadId,
                title: message,
                messages: [
                    {
                        role: "user",
                        content: message
                    },
                    {
                        role: "assistant",
                        content: assistantReply
                    }
                ]
            });
        }

        // If thread already exists
        else {
            thread.messages.push({
                role: "user",
                content: message
            });

            thread.messages.push({
                role: "assistant",
                content: assistantReply
            });

            thread.updatedAt = new Date();
        }

        // Save thread
        await thread.save();

        console.log("Thread saved successfully");

        // Send response to frontend
        res.status(200).json({
            message: "Message added successfully",
            reply: assistantReply
        });

    } catch (err) {
        console.error("CHAT ERROR:", err);

        res.status(500).json({
            error: err.message,
            message: "Failed to add message"
        });
    }
});


// GET all threads
router.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({})
            .sort({ updatedAt: -1 });

        res.status(200).json(threads);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: err.message,
            message: "Failed to fetch threads"
        });
    }
});


// GET messages of a particular thread
router.get("/thread/:threadId", async (req, res) => {
    try {
        const { threadId } = req.params;

        const thread = await Thread.findOne({ threadId });

        if (!thread) {
            return res.status(404).json({
                message: "Thread not found"
            });
        }

        res.status(200).json(thread.messages);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: err.message,
            message: "Failed to fetch thread"
        });
    }
});


// DELETE a thread
router.delete("/thread/:threadId", async (req, res) => {
    try {
        const { threadId } = req.params;

        const deletedThread = await Thread.findOneAndDelete({
            threadId
        });

        if (!deletedThread) {
            return res.status(404).json({
                message: "Thread not found"
            });
        }

        res.status(200).json({
            message: "Thread deleted successfully"
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: err.message,
            message: "Failed to delete thread"
        });
    }
});


export default router;

