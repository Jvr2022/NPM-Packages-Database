var express = require('./index')
var app = express()

app.get('/', function (req, res) {
  res.json({
    success: false,
    errors: [{ message: "Неверный пароль" }]
  })
})

app.listen(4000)