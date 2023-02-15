const express = require("express")
const mongoose = require('mongoose');
const app = express();
const authRoute = require('./routes/auth')
const taskRoute = require('./routes/taskRoute')
const {authenticateToken} = require('./middleware/authMiddleware')
const swaggerUi = require('swagger-ui-express');
const mergeJson = require('merge-json');
const cors = require('cors')

const swaggerDocument = require('./swagger.json');
const swaggerUserDoc = require('./user.json')
// const swaggerRefreshTokenDoc = require('./refresh.json')

const mergeDocs = mergeJson.merge(swaggerUserDoc,swaggerDocument)

app.get("/", (req,res) => {
    res.json("hello node js express...!")
})
app.use(cors({
    origin: '*'
}));
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(mergeDocs));



app.use('/auth', authRoute)
app.use('/', taskRoute)

const url = "mongodb+srv://Khitab:khitab@myspace.ui4zt.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url)
.then(() => app.listen(process.env.PORT || 5000,
() => console.log("server listening on port 5000")))
.catch(err => console.log(err))