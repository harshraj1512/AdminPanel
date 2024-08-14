import EmployeeModel from "../Models/employee.model.js";

// create employee
export const createEmployee = async (req, res)=>{
    try {
        const body = req.body;
        body.pimage = req.file ? req.file?.path : null;
        // courses is an array
        if (body.course) {
            body.course = JSON.parse(body.course);
        }
        console.log(body);
        const emp = new EmployeeModel(body);
        await emp.save();
        res.status(201).json({
            message: "Employee created",
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err
        });
    }
};

// update
export const updateEmployeeId = async (req, res)=>{
    try {
        const { name, email, phone, designation, gender, course} = req.body;
        const { id } = req.params;

        let updateData = {
            name, email, phone, designation, gender, course: Array.isArray(course) ? course : [course], updatedAt: new Date()
        }

        // update for image
        if (req.file) {
            updateData.pimage = req.file.path
        }
        
        const updateEmployee = await EmployeeModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )
        if (!updateEmployee) {
            return res.status(404).json({
                message: "Details not found"
            });
        }
        
        res.status(200).json({
            message: "Employee updated",
            success: true,
            data: updateEmployee
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err
        });
    }
};

// fetch the list
export const getAllEmployee = async (req,res)=>{
    try {
        let { page, limit, search } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;

        const skip = (page - 1) * limit;

        let searchcondition = {};
        if (search) {
            const regex = new RegExp(search, "i"); // case insesnsitive
            searchcondition ={
                $or: [
                    {name: regex},
                    {email: regex},
                    {_id: search.match(/^[0-9a-fA-F]{24}$/) ? search: null},
                    {createdAt: isNaN(Date.parse(search)) ? null : new Date(search) }
                ]
            };
        }

        const totalEmployee = await EmployeeModel.countDocuments(searchcondition);

        const getemp = await EmployeeModel.find(searchcondition)
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1});

        const totalPage = Math.ceil(totalEmployee / limit);
        res.status(200).json({
            message: "All Employee list",
            success: true,
            data: {
                employees: getemp,
                pagination: {
                    totalEmployee,
                    currentpage: page,
                    totalPage,
                    pazeSize: limit
                }
            }
        });
    } catch (err) {
        res.status(500).json({
            message: "internal server Error",
            success: false,
            error: err
        });
    }
};

// find using id
export const getAllEmployeeId = async (req,res)=>{
    try {
        const { id } = req.params;
        const emp = await EmployeeModel.findOne({ _id: id });
        res.status(200).json({
            message: "Employee Details",
            success: true,
            data: emp
        });
    } catch (err) {
        res.status(500).json({
            message: "internal server Error",
            success: false,
            error: err
        });
    }
};

// find and delete
export const deleteEmployeeId = async (req,res)=>{
    try {
        const { id } = req.params;
        const emp = await EmployeeModel.findByIdAndDelete({ _id: id });

        if (!emp) {
            return res.status(404).json({
                message: "Employee Not Found",
                success: false
            });
        }
        res.status(200).json({
            message: "Employee Deleted",
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: "internal server Error",
            success: false,
            error: err
        });
    }
};