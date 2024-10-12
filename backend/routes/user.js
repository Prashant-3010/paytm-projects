const express = require("express");
const {signupbody , signinbody, updateUser} = require("../types");
const {authMiddleware} = require("../middleware");
const {User , Account} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const router = express.Router();

router.post("/signup", async(req, res) => {
    const create = req.body;
    const {success} = signupbody.safeParse(create);
    if(!success) {
        res.status(411).json({
            msg : "Email already taken / Incorrect inputs"
        })
        return;
    }
    
    const existingUser = await User.findOne({
        username: req.body.username
    });

    if(existingUser) {
        res.status(411).json({
            msg : "Already Registered"
        })
    };

    const user = await User.create({
        username : create.username,
        firstName : create.firstName,
        lastName : create.lastName,
        password : create.password
    });

    const userId = user._id;

    // create new account

    await Account.create({
        userId,
        balance: 1 + Math.random()*10000
    })

    const token = jwt.sign({userId}, JWT_SECRET);

    res.json({
        msg : "User created successfully",
        token : token
    })
})

router.post("/signin", async(req , res) => {
    const user = req.body;
    const {success} = signinbody.safeParse(user);
    if(!success) {
        res.status(411).json({
            msg : "Incorrect Inputs"
        })
        return;
    }
    
    const author = await User.findOne({
        username : user.username,
        password : user.password
    })

    if(author) {
        const token = jwt.sign({
            userid : author._id
        }, JWT_SECRET);

        res.json({
            token : token
        })
        return;
    }

    res.status(411).json({
        msg : "Error while logging in"
    })
})

router.put("/", authMiddleware, async(req , res) => {
    const info = req.body;
    const {success} = updateUser.safeParse(info);

    if(!success) {
        res.status(411).json({
            msg : "Error while updating information"
        })
    }

    await User.updateOne({
        _id : req.userId
    }, req.body);

    
    res.json({
        msg : " Updated successfully"
    })
       
    
})

router.get("/bulk", async (req , res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or :[{
            firstName : {
                "$regex" : filter
            }
        },{
            lastName : {
                "$regex" : filter
            }
        }]
    })

    res.json({
        user : users.map(user => ({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
        }))
    })
})
module.exports = router;