const zod = require('zod');

const userLoginCredentials = zod.object({
    email: zod.string().email(),
    password: zod.string().min(1)
})

const userRegisterCredentials = zod.object({
    name: zod.string().min(1),
    email: zod.string().email(),
    password: zod.string().min(1)
})

module.exports = {userLoginCredentials, userRegisterCredentials};
