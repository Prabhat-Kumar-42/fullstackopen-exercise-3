const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("password required");
  process.exit(1);
}
if (process.argv.length === 4) {
  console.log("name and number are required field");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://blaze:${password}@learnmongo.zjnzpii.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=LearnMongo`;

mongoose.connect(url).then(() => "connected to db successfully");

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
});

const PERSON = mongoose.model("person", personSchema);

if (process.argv.length === 3) {
  PERSON.find({}).then((person) => {
    console.log("phonebook:");
    person.forEach((p) => console.log(`${p.name} ${p.number}`));
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const number = process.argv[4];
  const newPersonData = {
    name,
    number,
  };

  const newPerson = new PERSON(newPersonData);

  newPerson.save().then((res) => {
    console.log(`added ${res.name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
