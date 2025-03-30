import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios'; // For making API requests
import dotenv from 'dotenv'; // To load environment variables

dotenv.config({ path: '../.env.local'}); // Load environment variables
const apiKey = process.env.OPENAI_API_KEY; // Access the API key

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());

/// Endpoint to fetch news based on pin code
app.post('/api/news', async (req, res) => {
    try {
        const { pinCode } = req.body;

        if (!pinCode) {
            return res.status(400).json({ error: 'Pin code is required' });
        }

        // AI prompt to fetch news for the given pin code
        const newsPrompt = [
            {
                role: 'system',
                content: 'You are a helpful assistant that provides news articles based on a pin code.',
            },
            {
                role: 'user',
                content: `Fetch the latest news articles (up to 5 days old) for the region with pin code ${pinCode}. Provide the title, URL, and publication date for each article in chronological order (latest to oldest).`,
            },
        ];

        // Retry mechanism with exponential backoff
        const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {
            for (let i = 0; i < retries; i++) {
                try {
                    const response = await axios.post(url, options, {
                        headers: {
                            Authorization: `Bearer ${apiKey}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    return response;
                } catch (error) {
                    if (error.response?.status === 429 && i < retries - 1) {
                        console.log(`Rate limit hit. Retrying in ${delay}ms...`);
                        await new Promise((resolve) => setTimeout(resolve, delay));
                        delay *= 2; // Exponential backoff
                    } else {
                        throw error;
                    }
                }
            }
        };

        const aiResponse = await fetchWithRetry(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: newsPrompt,
                max_tokens: 500,
            }
        );

        console.log('AI Response:', aiResponse.data); // Log the full response
        const newsData = aiResponse.data.choices[0].message.content.trim();
        console.log('News Data:', newsData);

        // Send the AI response back to the frontend
        res.json({ news: newsData });
    } catch (error) {
        console.error('Error fetching news:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// Endpoint to handle general chat prompts
app.post('/api/chat', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Ask me something!!' });
        }

        const messages = [
            {
                role: 'system',
                content: 'You are a helpful assistant that answers user questions based on the provided data.',
            },
            {
                role: 'user',
                content: prompt,
            },
        ];

        const aiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo', // Use ChatGPT model
                messages: messages,
                max_tokens: 150,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const aiTextResponse = aiResponse.data.choices[0].message.content.trim();

        // Send the response back to the frontend
        res.json({ response: aiTextResponse });
    } catch (error) {
        console.error('Error communicating with AI API:', error.message);
        res.status(500).json({ error: 'Failed to process the request' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});