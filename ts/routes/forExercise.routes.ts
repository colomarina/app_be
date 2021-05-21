import { Router } from "express";
const forExerciseController = require('../controller/forExercise.controller')

let routerForExercises = Router();

// Rutas Para Ejercicios

routerForExercises.get("/info", forExerciseController.getInfo);
// routerForExercises.get("/randoms",forExerciseController.getRandoms);

export default routerForExercises;