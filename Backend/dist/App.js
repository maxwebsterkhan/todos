"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const helpers = require("handlebars-helpers");
const db = require("./db");
const app = express();
const port = 3000;
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride("_method"));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryResult = yield db.query("select * from recipe");
    res.send(queryResult.rows);
}));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
