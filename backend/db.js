const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Prashant3010:pr%40sh%40nt3010@cluster0.gcpkn0j.mongodb.net/Paytm");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const accountSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})

const User = mongoose.model("User", userSchema);

const Account = mongoose.model("Account" , accountSchema);

module.exports = {
    User,
    Account
};