const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

const userRoutesDetails = require("./routes/userRoutes")
const taskRoutesDetails = require("./routes/taskRoutes")    
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/",userRoutesDetails)
app.use("/",taskRoutesDetails)

const PORT = process.env.PORT || 3040;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});