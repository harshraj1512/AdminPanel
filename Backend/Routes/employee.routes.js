import express from "express";
import { createEmployee, deleteEmployeeId, getAllEmployee, getAllEmployeeId, updateEmployeeId } from "../Controllers/employee.controller.js";
import cloudinaryFileUploader from "../Middlewares/FileUploader.js";

const router = express.Router();

router.get("/", getAllEmployee);

router.post("/", cloudinaryFileUploader.single("pimage"), createEmployee);

router.put("/:id", cloudinaryFileUploader.single("pimage"), updateEmployeeId);

router.get("/:id", getAllEmployeeId);

router.delete("/:id", deleteEmployeeId);

export default router;