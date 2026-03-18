"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = require("./middleware/globalErrorHandler");
const notFound_1 = require("./middleware/notFound");
const user_routes_1 = require("./module/user/user.routes");
const auth_route_1 = require("./module/auth/auth.route");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const folder_route_1 = require("./module/folder/folder.route");
const tag_route_1 = require("./module/tag/tag.route");
const bookmark_route_1 = require("./module/bookmark/bookmark.route");
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
// Security middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true, // allow cookies
}));
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per 15 mins
    message: 'Too many requests, please try again later',
});
app.use('/api', limiter);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.send('Stl Server is runner on port 5000');
});
// Central router
const routes = [
    { path: '/user', route: user_routes_1.userRoutes },
    { path: '/auth', route: auth_route_1.authRoutes },
    { path: '/folder', route: folder_route_1.folderRoutes },
    { path: '/tag', route: tag_route_1.tagRoutes },
    { path: '/bookmark', route: bookmark_route_1.bookmarkRoutes },
];
routes.forEach(({ path, route }) => app.use(`/api/v1${path}`, route));
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.notFound);
exports.default = app;
