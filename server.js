import { log } from "console";
import express from "express";
import fetch from "node-fetch";
const app = express();
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Ticker from "./models/tickers.js";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// * ------------------ Database Conection

const url =
  "mongodb+srv://rishabh:rishabh@cluster0.wspfbwj.mongodb.net/?retryWrites=true&w=majority";

const mongoDb = mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DataBase Conected");
  })
  .catch((e) => console.log(e));

// *  fetching data from an api
const getData = async function () {
  const data = await fetch("https://api.wazirx.com/api/v2/tickers");
  const jsonData = await data.json();

  let keys = Object.keys(jsonData);
  // console.log(keys.name);
  // console.log(jsonData[keys[1]].name);
  for (let i = 0; i < 10; i++) {
    if ((await Ticker.find()).length <= i) {
      new Ticker({
        sno: i + 1,
        name: jsonData[keys[i]].name,
        last: jsonData[keys[i]].last,
        buy: jsonData[keys[i]].buy,
        sell: jsonData[keys[i]].sell,
        volume: jsonData[keys[i]].volume,
        base_unit: jsonData[keys[i]].base_unit,
        name: jsonData[keys[i]].name,
      }).save();
      console.log((await Ticker.find()).length);
    } else {
      console.log("hello data exceed");
      break;
    }
  }
};
getData();
// *             Routes
app.get("/", async (req, res) => {
  try {
    const ticker = await Ticker.find();
    res.render("home", { ticker: ticker });
  } catch (err) {
    res.send(err);
  }
});

app.listen(5000);
