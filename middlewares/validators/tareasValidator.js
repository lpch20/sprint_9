const { check, param, query } = require("express-validator");

const validatorTaskAdd = [
    check("titulo")
        .not()
        .isEmpty()
        .withMessage("Titulo es un campo requerido")
    
];


module.exports = {validatorTaskAdd}