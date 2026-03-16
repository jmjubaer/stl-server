"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderModel = void 0;
const mongoose_1 = require("mongoose");
const folderSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        toLowerCase: true,
        unique: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});
exports.folderModel = (0, mongoose_1.model)('Folder', folderSchema);
