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
        // console.log(config.database_url);
        // await mongoose.connect(config.database_url as string);
        await mongoose_1.default.connect('mongodb+srv://stl:stl12team@cluster0.gcwme.mongodb.net/?appName=Cluster0');
        console.log('Database connected successfully');
        server = app_1.default.listen(config_1.default.port, () => {
            console.log(`Server is running on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to database:', error);
        process.exit(1);
    }
};
// my code ----------------
// process.on('unhandledRejection', () => {
//   if (server) {
//     server.close(() => {
//       console.log('Server closed due to unhandled rejection');
//       process.exit(1);
//     });
//   }
// });
// process.on('uncaughtException', () => {
//   console.log('Uncaught exception, shutting down the server');
//   process.exit(1);
// });
// Claude recomendation
// Graceful shutdown helper
const gracefulShutdown = (reason, error) => {
    console.error(`❌ ${reason}:`, error);
    if (server) {
        server.close(() => {
            console.log('🔴 Server closed gracefully');
            mongoose_1.default.connection.close().then(() => {
                console.log('🔴 Database connection closed');
                process.exit(1);
            });
        });
    }
    else {
        process.exit(1);
    }
};
// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
    gracefulShutdown('Unhandled Rejection', reason);
});
// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    gracefulShutdown('Uncaught Exception', error);
});
// Handle SIGTERM (Vercel, Docker, PM2 sends this on shutdown)
process.on('SIGTERM', () => {
    gracefulShutdown('SIGTERM received');
});
// Handle SIGINT (Ctrl+C in terminal)
process.on('SIGINT', () => {
    gracefulShutdown('SIGINT received');
});
main();
