const cors = require("cors");

// const corsOptions = {
//   origin: "http://localhost:5173",
//   optionSuccessstatus: 200,
// };

const corsMiddleware = cors(); //cors(corsOptions);

module.exports = {
  corsMiddleware,
};
