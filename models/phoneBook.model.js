const mongoose = require("mongoose");
const { numberValidator } = require("../services/numberValidator");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "name must be at least 3 characters long"],
    required: [true, "name is required"],
    unique: true,
  },
  number: {
    type: String,
    validate: {
      validator: numberValidator,
      message: (props) => `${props.value} is not a valid number`,
    },
    required: [true, "number is required"],
  },
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
