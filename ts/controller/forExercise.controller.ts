import { Request, Response } from 'express';
// import { fork } from "child_process";
import * as cluster from "cluster";
import { cpus } from "os";


module.exports = {

  getInfo: (req: Request, res: Response) => {
    res.json({
      ArgumentosDeEntrada: `Argumentos ${process.argv}`,
      PathDeEjecucion: process.execPath,
      NombreDeLaPlataforma: process.platform,
      ProcessId: process.pid,
      VersionDeNodeJS: process.version,
      CarpetaCorriente: process.cwd(),
      UsoDeMemoria: process.memoryUsage(),
      NumeroDeProcesadores: cpus().length,
    })
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
}