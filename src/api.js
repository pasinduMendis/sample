const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config();
const serverless = require('serverless-http')

var corsOptions = {
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true, 
  optionsSuccessStatus: 200,
}

const app = express()
const router = express.Router()


mongoose
  .connect("mongodb+srv://rajithlahiru7:746NuvZ0Y8G5YVTB@cluster0.9lnl9jf.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log('Database is successfully connected')
    },
    (err) => {
      console.log('cannont connect to the database' + err)
    }
  )

app.options('*', cors());
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

app.use(express.urlencoded())
app.use(express.json())
app.use(
  cors(corsOptions)
)

require('./routes/auth.routes')(router);
require('./routes/blog.routes')(router);


app.use('/.netlify/functions/', router)

module.exports = app // for local environment comment this part
module.exports.handler = serverless(app) // for local environment comment this part


// for local environment uncomment below part

/* const PORT = process.env.APPPORT || 9000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
}) */

