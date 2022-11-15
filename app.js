const express = require("express");
const usercontroller = require('./controllers/usercontroller')
const sessioncontoller = require('./controllers/sessioncontroller')
const auth = require("./midlewhares/auth")

const app = express();

app.use(express.json());

// User
app.post('/user', usercontroller.create_user)
app.post('/session', sessioncontoller.create)

// Ptivate
app.use(auth)
app.get("/user", usercontroller.get_info)
app.put("/user", usercontroller.update_user)
app.delete("/user/:answer",usercontroller.delete_user)

app.listen(3001, () => {
    console.log("lintenig on port 3001...")
})