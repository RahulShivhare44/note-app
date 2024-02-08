const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT;

const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");

app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/note', noteRouter);

app.get('/', (req, res) => {
    res.send({
        message: "api is working now"
    });
});

app.listen(port, () => {
    console.log("SERVER IS RUNNING ON PORT NUMBER", port);
});
