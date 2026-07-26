const { userInfo, userAddresses } = require("/Projects/LetsHavBiriyani-website/Backend/Models/user");
const AppError = require("/Projects/LetsHavBiriyani-website/Backend/Utils/AppError");
const bcrypt = require("bcrypt");
const asyncHandler = require("/Projects/LetsHavBiriyani-website/Backend/Utils/AsyncHanlder");
const passwordChangeController = asyncHandler(async (req, res) => {
    const userId = req.user;
    const { oldPassword, newPassword } = req.body;
    const user = await userInfo.findById(_id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new AppError(400, "Invalid Old Password");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updating = await user.updateOne({ _id: userId }, { password: hashedPassword });
    return res.status(200).json({
        message: "Password Changed successfully!",
        status: true
    })
});

const dashboardController = asyncHandler(async (req, res) => {
    const decoded = req.userProfile;
    return res.status(200).json({
        userDetails: { name: decoded.name, email: decoded.email }
    });
});
module.exports = { passwordChangeController, dashboardController }