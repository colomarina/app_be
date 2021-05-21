const express = require('express');
const app = express();
const port = 8080;

app.get('/mensaje', (req, res) => {
  res.send('Hola colito!')
})

app.listen(port, () => {
  console.log(`App listening in port: ${port}`)
})