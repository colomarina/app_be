"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
module.exports = {
    getInfo: (req, res) => {
        res.json({
            ArgumentosDeEntrada: `Argumentos ${process.argv}`,
            PathDeEjecucion: process.execPath,
            NombreDeLaPlataforma: process.platform,
            ProcessId: process.pid,
            VersionDeNodeJS: process.version,
            CarpetaCorriente: process.cwd(),
            UsoDeMemoria: process.memoryUsage(),
            NumeroDeProcesadores: os_1.cpus().length,
        });
    },
    // getRandoms: (req: Request, res: Response) => {
    //   const cantidad = req.query.cant || 100000000;
    //   const cantidadObjeto = { cantidad: cantidad }
    //   const cantidadString = [JSON.stringify(cantidadObjeto)]
    //   const computo = fork('./ts/controller/random.js', cantidadString)
    //   computo.send('start child process')
    //   computo.on('message', array => {
    //     res.json(array)
    //   })
    // }
};
