"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagModel = void 0;
const mongoose_1 = require("mongoose");
const tagSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        toLowerCase: true,
    },
    color: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});
exports.tagModel = (0, mongoose_1.model)('Tag', tagSchema);
