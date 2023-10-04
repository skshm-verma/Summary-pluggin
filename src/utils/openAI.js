const axios = require('axios');
const apiKey = process.env.OPENAI_API_KEY;
const cheerio = require('cheerio');

//function of extract the usable content from the provided URL web page
function fetchContent(url) {
    return new Promise(function (resolve, reject) {
        axios.get(url)
            .then(response => {
                const htmlContent = response.data;
                const $ = cheerio.load(htmlContent);

                // Extract text content from <p> tags with no class
                const paragraphs = $('p:not([class])');
                let extractedText = '';

                paragraphs.each((index, element) => {
                    extractedText += $(element).text().trim() + '\n';
                });
                resolve(extractedText);
            })
            .catch(error => {
                reject(error);
                console.error('Error fetching page:', error);
            });
    });
}

                                                                                                    
//function to make a HTTP POST request to the OpenAI API 
exports.generateText = async (url, in_points) => {
    const content = await fetchContent(url)
    let axiosCall = await axios({
        method: 'post',
        headers: { 'Authorization': 'Bearer ' + apiKey },
        url: 'https://api.openai.com/v1/chat/completions',
        data: {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                   "content": in_points ? `summarize this article in bullet points : "${content}"` : `summarize this article without points : "${content}"`
                }
            ],
            "max_tokens": 300,
            "temperature": 0.2
        }
    });

    return (axiosCall.data.choices[0].message.content)
}