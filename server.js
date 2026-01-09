const express = require('express');
const errorHandler = require("./middleware/errorHandler");
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();


connectDb();
const app = express();
const port = process.env.PORT | 5000;
// app.get("/api/contacts", (req, res) => {
//     //res.send("get all contacts");
//     res.status(200).json({ "message": "get all contacts" });
// });
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
}
) 