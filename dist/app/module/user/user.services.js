"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const tag_mode_1 = require("../tag/tag.mode");
const user_model_1 = require("./user.model");
const createUserIntoDb = async (payload) => {
    const result = await user_model_1.userModel.create(payload);
    return result;
};
const getMeFromDb = async (id) => {
    const result = await user_model_1.userModel.findById(id);
    const useTag = await tag_mode_1.tagModel.find({ userId: id });
    return { userInfo: result, useTag };
};
const updateMeIntoDb = async (id, payload) => {
    // remove password and email from payload if exist
    delete payload.password;
    delete payload.email;
    const result = await user_model_1.userModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};
exports.userServices = {
    createUserIntoDb,
    getMeFromDb,
    updateMeIntoDb,
};
