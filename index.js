const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const findIndexByID = (id, array) =>{
    let theIndex = array.reduce((acc, player, idx) => {
      if (acc !== null) return acc;
      if (player.id === id) return idx;
      return null;
    }, null);
    return theIndex
  }

let roster = [
  {
    id: 1,
    name: "Hunter Erickson",
    number: 0,
    height: "6-3",
    weight: 180,
    position: "Guard",
  },
  {
    id: 2,
    name: "Random MAn",
    number: 10,
    height: "6-1",
    weight: 199,
    position: "Guarded",
  },
  {
    id: 3,
    name: "Running Man",
    number: 99,
    height: "6-1",
    weight: 810,
    position: "Backward",
  },
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
app.get("/player/:id", (req, res) => {
  const { id } = req.params;
  const player = roster.filter((player) => player.id == id)[0];
  if (id) {
    console.log("Got it.");
    res.json({ ok: true, player });
  } else {
    res.send(`Player ID ${id} invalid or not in roster.`);
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

// app.put("player/:id", (req, res) => {
//   const { id } = req.params;
//   console.log(`ID receved as ${id}`)
//   const { name, number, height, weight, position } = req.body;
//   try {
//     for (const member of roster) {
//         console.log(member)
//         console.log(member.id)
//       if (member.id === id) {
//         name,
//         number,
//         height,
//         weight,
//         position
//       }
//     }
//     res.json({ ok: true, roster });
//   } catch (error) {
//     console.error(err);
//     res.send("Error sparkles of " + err);
//   }
// });

app.delete("/player/:id", (req, res) => {
  const { id } = req.params;
  let player = roster.filter((player) => player.id == id)[0];
  index = roster.findIndex((element) => element === player)
  console.log(`theIndex is showing as ${index}`)
  if (index !== null) {
    roster.splice(index, 1);
    res.send(`Player ID ${id} has been deleted.`);
  } else {
    res.send(`Error! ID ${id} not found on roster.`);
  }
});

// app.delete("/players/:id", (req, res) => {
//     const playerIndex = roster.findIndex(val => val.id === Number(req.params.id))
//     roster.splice(playerIndex, 1)
//     res.json({message: `Deleted`})
// })

app.listen(port, () => {
  console.log("Server running on port 3000");
});
