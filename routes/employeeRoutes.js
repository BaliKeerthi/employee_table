const express = require("express")

const router = express.Router()
const employeeController = require("../controllers/employeeController") 
const Employee = require("../models/employee");

router.post("/add-emp",employeeController.createEmployee)
router.get("/all-emp",employeeController.getEmployees)
router.get("/all-emp/:id",employeeController.singleEmployee)
router.put("/update/:id",employeeController.updateEmployee)
router.delete("/delete/:id",employeeController.deleteEmployee)
module.exports=router;