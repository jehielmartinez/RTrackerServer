const app = require('./app')
const http = require('http')

const port = process.env.PORT
const server = http.createServer(app)

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
  });

server.listen(port, () => console.log(`Listening on PORT: ${port}`))