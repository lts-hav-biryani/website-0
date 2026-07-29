const bcrypt = require("bcrypt");
const { userInfo } = require("../Models/user")
async function loginService(myObj) {
    const { email, password } = myObj;
    const response = {};
    try {
        const isUser = await userInfo.findOne({
            email: email
        });
        if (!isUser) { // null and undefined are treated as falsy values 
            response.message = "Invalid email / password";
            response.status = false;
            return response;
        }
        const hashedPassword = isUser.password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        if (!passwordMatch) {
            response.message = "Invalid email / password";
            response.status = false;
            return response;
        }
        response.message = "Login Successful";
        response.status = true;
        return response;
    } catch (error) {
        response.message = error.message;
        response.status = false;
        return response;
    }
};
module.exports = { loginService }