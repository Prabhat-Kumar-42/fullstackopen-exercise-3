const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const PERSON = mongoose.model("person", personSchema);

module.exports = {
  PERSON,
};
