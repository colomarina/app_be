import persistenciaMemory from './factory/memory'
import persistenciaFileSystem from './factory/fileSystem'
import persistenciaMongo from "./factory/mongoDB"
const config = require('../config/config')

/* -------------------------------------- */
/*                FACTORY                 */
/* -------------------------------------- */
class FactoryPersonaModel {
    static set(opcion: string) {
        console.log('**** PERSISTENCIA SELECCIONADA **** [' + opcion + ']')
        switch(opcion) {
            case 'Mem': return new persistenciaMemory()
            case 'File': return new persistenciaFileSystem()
            case 'Mongo': return new persistenciaMongo()
        }
    }
}

const opcion = config.PERSISTENCIA || 'Mongo'
export default FactoryPersonaModel.set(opcion)