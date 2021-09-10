"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const i18n_1 = __importDefault(require("i18n"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
i18n_1.default.configure({
    locales: ['en'],
    directory: path_1.default.join(__dirname, '../config/locales'),
    objectNotation: true
});
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    next();
});
app.use(i18n_1.default.init);
app.use((0, morgan_1.default)('dev', { skip: () => { return process.env.NODE_ENV === 'test'; } }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use('/', routes_1.unauthenticatedRouter.core());
app.use('/', routes_1.standardUserRouter.core());
app.use('/admin', routes_1.adminRouter.core());
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    next(err);
});
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});
module.exports = app;
