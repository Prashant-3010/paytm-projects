const mongoose = require("mongoose");
const express = require("express");
const {Account} = require("../db");
const { authMiddleware } = require("../middleware");

const router = express.Router();

module.exports = router;

router.get("/balance", authMiddleware, async(req, res) => {
    res.json({
        msg  : "neeche ka nhi aya",
        userId : req.userId
    })
    const account = await Account.findOne({
        userId : req.userId
    });

    // res.json({
    //     balance : account
    // })
});

router.post("/transfer" , authMiddleware, async(req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount, to} = req.body;

    const account = await Account.findOne({ userId : req.userId}).session(session);

    if(!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(404).json({
            msg : "Insufficient Balance"
        });
    }

    const toAccount = await Account.findOne({userId : to}).session(session);

    if(!toAccount) {
        await session.abortTransaction();
        return res.status(404).json({
            msg : "Invalid Account"
        });
    }

    await Account.updateOne({userId : req.userId}, {$inc : { balance : -amount }}).session(session);
    await Account.updateOne({userId : to}, {$inc : { balance : amount }}).session(session);

    await session.commitTransaction();
    res.json({
        msg : "Transfer Successful"
    });
});