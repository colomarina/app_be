// Ruta Random
// const max = 1000;
// const min = 1;

// const randoms = (cantidad) => {
//   let objetoJson = {}
//   for (let i = 0; i < cantidad; i++) {
//     const numero = Math.floor(Math.random() * (max - min)) + min;
//     (objetoJson.hasOwnProperty(numero)) ? objetoJson[numero] += 1 : objetoJson[numero] = 1
//   }
//   return objetoJson;
// };
// let args = JSON.parse(process.argv[2])
// process.on('message', (msg) => {
//   console.log(msg)
//   const objetoJson = randoms(args.cantidad);
//   process.send(objetoJson);
// });