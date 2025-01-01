const { default: ollama } = require("ollama");
const fs = require("fs");
const path = require("path");
const natural = require("natural");
// const natural = require("../../custom_data");

exports.handleQuery = async (req, res) => {
    const { message } = req.body;

    try {
        // Load and process data from custom_data directory
        const dataDirectory = path.join(__dirname, "../../custom_data");
        const files = fs.readdirSync(dataDirectory);
        let chunks = [];

        files.forEach((file) => {
            const filePath = path.join(dataDirectory, file);
            const content = fs.readFileSync(filePath, "utf-8");

            if (file.endsWith(".txt")) {
                // Tokenize text file content
                const tokenizer = new natural.SentenceTokenizer();
                chunks = chunks.concat(
                    tokenizer
                        .tokenize(content)
                        .map((sentence) => sentence.trim())
                        .filter((sentence) => sentence.length > 0)
                );
            }
        });

        // Simple relevance matching
        const tokenizer = new natural.WordTokenizer();
        const queryTokens = new Set(tokenizer.tokenize(message.toLowerCase()));

        const scoredChunks = chunks.map((chunk) => {
            const chunkTokens = new Set(tokenizer.tokenize(chunk.toLowerCase()));
            const score = [...queryTokens].filter((token) => chunkTokens.has(token))
                .length;
            return { chunk, score };
        });

        const relevantContext = scoredChunks
            .sort((a, b) => b.score - a.score)
            .slice(0, 3) // Return top 3 relevant chunks
            .map((item) => item.chunk);

        // Prepare system prompt with context
        const systemPrompt = `You are an expert assistant trained on the following context:\n\n${relevantContext.join(
            "\n\n"
        )}\n\nUse this data to answer user questions comprehensively.`;

        // Send chat request to Ollama
        const response = await ollama.chat({
            model: "llama3",
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: message,
                },
            ],
        });

        res.json({
            response: response.message.content,
            relevantContext,
        });
    } catch (error) {
        console.error("Error processing query:", error.message);
        res.status(500).json({ error: "Failed to process query." });
    }
};