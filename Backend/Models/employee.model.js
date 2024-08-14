import mongoose, { Schema } from "mongoose";

const EmployeeSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
    },
    phone:{
        type:Number,
        required: true
    },
    designation:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    course:{
        type:[String],
        required: true
    },
    pimage:{
        type:String
    },
    createdAt:{
        type:Date,
        default: new Date()
    },
    updatedAt:{
        type:Date,
        default: new Date()
    }
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);

export default EmployeeModel;