const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const http = require('http');

const server = http.createServer(app);


server.listen(process.env.PORT, () => {
    setTimeout(() => {
        console.clear()
        console.log(`listening to port: ${process.env.PORT} `);
    }, "1000");
})

