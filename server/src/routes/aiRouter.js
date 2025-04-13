const express = require('express');
const aiRouter = express.Router();
const oAuth = require('../utils/axiosInstace')
const axios = require('axios')

aiRouter.post('/', async(req, res) => {
    try {
        const {access_token} = await oAuth()
        const {text} = req.body;
        const response = await axios.post(process.env.AI_URL,
            {
                model: "GigaChat",
                messages: [{ role: "user", content: text }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
        
        res.status(200).json(response.data.choices)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

aiRouter.get('/test', (req, res) => {
    res.status(200).json({ message: "AI Router works!" });
  });

module.exports = aiRouter