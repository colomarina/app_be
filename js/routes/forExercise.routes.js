"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forExerciseController = require('../controller/forExercise.controller');
let routerForExercises = express_1.Router();
// Rutas Para Ejercicios
routerForExercises.get("/info", forExerciseController.getInfo);
// routerForExercises.get("/randoms",forExerciseController.getRandoms);
exports.default = routerForExercises;
