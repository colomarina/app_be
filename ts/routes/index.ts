import express from 'express';
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require('../server/openapi.json');
const passport = require('passport');
const upload = require("../middleware/upload")

const router = express.Router();
import RouterProductos from "../routes/productos.routes";
import RouterCarrito from '../routes/carritos.routes';
import RouterOrdenes from '../routes/orders.routes';
import routerSession from "../routes/session.routes";

const routerProducts = new RouterProductos()
const routerCarts = new RouterCarrito()
const routerOrders = new RouterOrdenes()

router.use('/api', routerSession);
router.use('/api', routerProducts.start());
router.use('/api', passport.authenticate('jwt', { session: false }), routerCarts.start());
router.use('/api', passport.authenticate('jwt', { session: false }), routerOrders.start());
// router.use('/api', routerFotos.start())
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Handle errors.
router.use(function (err: any, req: any, res: any, next: any) {
  res.status(err.status || 500);
  res.json({ error: err });
});

export default router