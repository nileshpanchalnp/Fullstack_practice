const express = require('express')
const {
  getForm,
  createForm,
  updateForm,
  deleteForm,
} = require("../controller/form");

const Form_routes = express.Router()

Form_routes.get('/getform',getForm)
Form_routes.post('/create',createForm)
Form_routes.delete("/delete/:id", deleteForm);
Form_routes.put("/update/:id", updateForm);



module.exports = {Form_routes}