import { Request, Response } from 'express';

let gfs;

module.exports = {
  create: async (req: Request, res: Response) => {
    //Agregar una imagen y actualizar producto id
  },
  getOne: async (req: Request, res: Response) => {
    // Retornar la imagen x id
    try {
      const file = await gfs.files.findOne({ filename: req.params.id });
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
  } catch (error) {
      res.send("not found");
  }
  },
  delete: async (req: Request, res: Response) => {
    // Elimina una imagen por su id
    try {
      await gfs.files.deleteOne({ filename: req.params.id });
      res.send("success");
  } catch (error) {
      console.log(error);
      res.send("An error occured.");
  }
  }
}