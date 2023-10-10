const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const task = require('./routes/tareasRoute')
const cors = require("cors");

const app = express();
app.use(cors())


/***MIDDLEWARE***/
app.use(bodyParser.json());

/***ENDOPINTS***/
app.use("/api", task)



/***ENDPOINT DE ERROR***/ 
app.get("api/*,", (req, res) =>{
    res.status(400).json({ error: "El recurso que quiere consumir no existe" });
})

//---------------LEVANTAMOS EL SERVIDOR-------------//
app.listen(3000, () => {
  console.log(`Servidor levantado y esuchando en el puerto 3000`);
});
