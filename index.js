const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let roster = [
  {
    id: 1,
    name: "Hunter Erickson",
    number: 0,
    height: "6-3",
    weight: 180,
    position: "Guard"
    },
    {
    id: 2,
    name: "Brandon Averette",
    number: 4,
    height: "5-11",
    weight: 185,
    position: "Guard"
    },
    {
    id: 3,
    name: "Alex Barcello",
    number: 13,
    height: "6-2",
    weight: 180,
    position: "Guard"
    }
];



//Basic get to display root message
app.get("/", (_, res) => {
  res.send("A small attempt at a roster API.");
});

//Displays contents of roster via roster endpoint
app.get("/roster", (_, res) => {
  res.json({ ok: true, roster });
});

//Get individual player by their jersey number via player endpoint
app.get("/player/:number", (req, res) => {
  const { number } = req.params;
  const player = roster.filter((player) => player.number == number)[0];
  if (player) {
    console.log("Got it.");
    res.json({ ok: true, player });
  } else {
    res.send(`Player number ${number} invalid or not in roster.`);
  }
});

//Add an entire player view addplayer endpoint
app.post("/addplayer", (req, res) => {
  const { name, number, height, weight, position } = req.body;
  if (name && number && height && weight && position) {
    id = roster.length + 1;
    roster.push({
      id,
      name,
      number,
      height,
      weight,
      position,
    });
    console.log("Posted it.");
    res.json({ ok: true, roster });
  }
});

app.put("/player/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { name, number, height, weight, position } = req.body;
  if (name && number && height && weight && position) {
    //index = findIndexByID(id);
    let player = roster.filter((player) => player.id == id)[0];
    index = roster.findIndex((element) => element === player)
    console.log(`Put says the index is ${index}`);
    roster[index] = {
      id,
      name,
      number,
      height,
      weight,
      position,
    };
    console.log("Putted it.");
    res.json({ ok: true, roster });
  }
});


app.delete("/player/:id", (req, res) => {
  const { id } = req.params;
  let player = roster.filter((player) => player.id == id)[0];
  index = roster.findIndex((element) => element === player)
  console.log(`theIndex is showing as ${index}`)
  if (index !== null && index !== -1) {
    roster.splice(index, 1);
    res.send(`Player ID ${id} has been deleted.`);
  } else {
    res.send(`Error! ID ${id} not found on roster.`);
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
