const router = require('express').Router();


const openaiController = require('../controller/openaiController.js')

router.post('/openAI', openaiController.openAIConfiguration)

module.exports = router;