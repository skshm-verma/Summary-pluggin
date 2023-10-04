const responder = require('../utils/responderHandler')
const openai = require('../utils/openAI')

exports.openAIConfiguration = async(request, response, next) => {
    try {
        const getSummary = await openai.generateText(request.body.url, request.body.in_points)

        return responder(request, response, next, true, 101, getSummary );

    } catch (error) {
        next(error)
    }
}

