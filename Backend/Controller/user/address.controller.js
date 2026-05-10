const { userAddresses } = require("../../Models/user");
const AppError = require("../../Utils/AppError");
const asyncHandler = require("../../Utils/AsyncHanlder");
const getSavedAddressController = asyncHandler(async (req, res) => {
    const user = req.userProfile;
    const addressRecords = await userAddresses.find({ userId: user._id });
    if (!addressRecords) {
        throw new AppError(400, "No Saved Addresses exist!");
    }
    const savedAddresses = [];
    addressRecords.forEach((obj) => {
        savedAddresses.push({ id: obj._id, address: obj.address });
    });
    return res.status(200).json({
        message: "Address Fetched!",
        status: true,
        addresses: savedAddresses
    });
});
const saveAddress = asyncHandler(async (req, res) => {
    const address = req.body;
    const user = req.userProfile;
    const addressRecord = await userAddresses.create({
        userId: user._id, address: {
            receiverName: address.receiverName,
            receiverNumber: address.receiverNumber,
            streetName: address.streetName,
            cordinates: { lat: address.cordinates.lat, long: address.cordinates.long },
            city: address.city,
            state: address.state,
            pincode: address.pincode
        }
    });
    return res.status(200).json({
        message: "Address saved successfully !",
        status: true
    })
});
const deleteAddress = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const addressRecord = await userAddresses.findByIdAndDelete(id);
    if (!addressRecord) {
        throw new AppError(400, "Address does not exists!");
    }
    return res.status(200).json({
        message: "Address deleted!",
        status: true
    });
})
module.exports = { getSavedAddressController, saveAddress, deleteAddress };