"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = require('../server/openapi.json');
const passport = require('passport');
const router = express_1.default.Router();
const productos_routes_1 = __importDefault(require("../routes/productos.routes"));
const session_routes_1 = __importDefault(require("../routes/session.routes"));
const forExercise_routes_1 = __importDefault(require("../routes/forExercise.routes"));
const carritos_routes_1 = __importDefault(require("./carritos.routes"));
router.use('/', session_routes_1.default);
router.use('/api', passport.authenticate('jwt', { session: false }), productos_routes_1.default);
router.use('/api', passport.authenticate('jwt', { session: false }), carritos_routes_1.default);
router.use("/exercise", forExercise_routes_1.default);
router.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Handle errors.
router.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});
exports.default = router;
