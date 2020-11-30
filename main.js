const express = require('express');
const app = express();
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = requireDir("./routes");
for (var i in routes) app.use("/", routes[i]);

const orders = [];

app.listen(port, () => console.log(`server ready@ ${port}!`));


