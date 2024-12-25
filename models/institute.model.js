const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const intituteModel = new Schema(
    {
        institute: {
            type: String,
            required: true
        },
        educationBoard: {
            type: String,
            required: false,
            nullable: true
        },
        medium: {
            type: String,
            required: false,
            nullable: true
        },
        classCategory: {
            type: String,
            required: false,
            nullable: true
        },
        std: {
            type: Number,
            require: false,
            default: 0
        },
        subject: [
            {
                type: String,
                require: true
            }
        ]
    },
    {
        timestamps: true
    }
);

const instituteModel =  new mongoose.model("Institute", intituteModel)
module.exports = instituteModel;