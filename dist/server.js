"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
let server;
const main = async () => {
    try {
        await mongoose_1.default.connect(config_1.default.database_url);
        server = app_1.default.listen(config_1.default.port, () => {
            console.log(`Example app listening on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
main();
process.on('unhandledRejection', () => {
    if (server) {
        server.close(() => {
            console.log('Server closed due to unhandled rejection');
            process.exit(1);
        });
    }
});
process.on('uncaughtException', () => {
    console.log('Uncaught exception, shutting down the server');
    process.exit(1);
});
