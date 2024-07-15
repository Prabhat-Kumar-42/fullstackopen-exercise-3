require("dotenv").config();
const { DateTime } = require("luxon");
const morgan = require("morgan");
const { getRandomInt } = require("./services/bigRandomNumber");
const express = require("express");

// taking phonebook data from the specified file
let phoneBook = require("./data/data.json");
const { corsMiddleware } = require("./middeware/cors.middleware");

const app = express();

app.use(express.json());
app.use(corsMiddleware);

morgan.token("body", (req) =>
  ["POST", "PUT"].includes(req.method) ? JSON.stringify(req.body) : null,
);
app.use(
  morgan((tokens, req, res) => {
    const body = tokens.body(req, res);
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      body ? body : "",
    ]
      .join(" ")
      .trim();
  }),
);

app
  .route("/api/persons")
  .get((req, res) => {
    return res.json(phoneBook);
  })
  .post((req, res) => {
    const newPerson = req.body;
    if (!newPerson) {
      return res.status(400).json({ error: "Bad Request" });
    }
    if (!newPerson.name) {
      return res.status(400).json({ error: "Name is Required Field" });
    }
    if (!newPerson.number) {
      return res.status(400).json({ error: "Number is Required Field" });
    }

    const personExists = phoneBook.find(
      (person) => person.name === newPerson.name,
    );

    if (personExists) {
      return res.status(400).json({ error: "Name must be unique" });
    }
    const id = String(getRandomInt());
    const name = newPerson.name;
    const number = newPerson.number;
    const newPersonData = {
      id,
      name,
      number,
    };
    phoneBook.push(newPersonData);
    return res.status(201).json(newPersonData);
  });

app
  .route("/api/persons/:id")
  .get((req, res) => {
    const id = req.params.id;
    const requestedPerson = phoneBook.find((person) => person.id === id);
    if (!requestedPerson) {
      return res.status(404).json({ error: "Not found" });
    }
    return res.json(requestedPerson);
  })
  .delete((req, res) => {
    const id = req.params.id;
    const requestedPerson = phoneBook.find((person) => person.id === id);
    if (!requestedPerson) {
      return res.status(404).json({ error: "Not found" });
    }
    phoneBook = phoneBook.filter((person) => person.id !== requestedPerson.id);
    return res.json(requestedPerson);
  })
  .put((req, res) => {
    if (!req.body) {
      return res.status(404).json({ error: "Not found" });
    }
    const id = req.params.id;
    const newNumber = req.body.number;
    if (!id || !newNumber) {
      return res.status(404).json({ error: "Not found" });
    }
    const requestedPersonIndex = phoneBook.findIndex(
      (person) => person.id === id,
    );
    if (requestedPersonIndex == -1) {
      return res.status(404).json({ error: "Not found" });
    }
    phoneBook[requestedPersonIndex].number = newNumber;
    return res.json(phoneBook[requestedPersonIndex]);
  });

app.route("/info").get((req, res) => {
  const date = DateTime.local().setZone(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const formattedDate =
    date.toFormat("EEE MMM dd yyyy HH:mm:ss 'GMT'ZZ") + ` (${date.zoneName})`;
  const data = `<p>Phonebook has info for ${phoneBook.length} people</p>
                <p>${formattedDate}</p>`;
  return res.send(data);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));
