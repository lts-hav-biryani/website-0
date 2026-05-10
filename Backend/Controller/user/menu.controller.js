const { menu } = require("../../Models/admin");
const asyncHandler = require("../../Utils/AsyncHanlder");
const getMenuController = asyncHandler(async (req, res) => {
    const menuCard = await menu.find({ isAvailable: true });
    if (!menuCard) {
        throw new Error(400, "Try after sometime!")
    }
    return res.status(200).json({
        menuCard: menuCard,
        status: true,
        message: "Menu loaded successfully!"
    })
});
module.exports = { getMenuController }