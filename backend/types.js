const zod = require("zod");

const signupbody = zod.object({
    username : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string()
})

const signinbody = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

const updateUser = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

module.exports={
    signupbody : signupbody,
    signinbody : signinbody,
    updateUser : updateUser
}