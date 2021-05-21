"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFacebookModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userFacebookCollection = 'userFacebook';
const UserFacebookSchema = new mongoose_1.default.Schema({
    username: { type: String },
    password: { type: String },
    facebookId: { type: String },
    email: { type: String },
    photo: { type: Object },
});
exports.userFacebookModel = mongoose_1.default.model(userFacebookCollection, UserFacebookSchema);
