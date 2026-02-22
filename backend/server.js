// const seed = require('./seed/seed.js');

console.log("CWD:", process.cwd());

require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

// if (process.env.NODE_ENV === "production") {
//   seed().catch(console.error);
// }

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});