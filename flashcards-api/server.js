const app = require("./app.js");
const { PORT } = require("./config")

// app.listen(3001, () => {
//     console.log(`👾 Server running on http://localhost:3001`);
// });

app.listen(PORT, function () {
    console.log(`👾 Server running on http://localhost:${PORT}`)
  })
