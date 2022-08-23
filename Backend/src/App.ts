const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const helpers = require("handlebars-helpers");
const db = require("./db");
const app = express();
const port = 3000;

app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride("_method"));

app.get("/", async (req: any, res: any) => {
  const queryResult = await db.query("select * from recipe");
  res.send(queryResult.rows);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
