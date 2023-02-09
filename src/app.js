const express = require("express");
const userRouter = require("./Routes/users.routes");
const app = express();

app.use(express.json());

app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server started at port 3000 🟢");
});
