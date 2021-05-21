const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/mensaje', (req, res) => {
  res.send('Hola colito desde Heroku!')
})

const server = app.listen(PORT, () => {
  console.log(`Server listening in port: ${PORT}`)
})
server.on('error', error => console.log(`Error server: ${error}`))