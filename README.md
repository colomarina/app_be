# Proyecto Final Lucas Marina

- Me faltan validaciones, voy a utilizar class-validator

- Tipar todo, ya que estoy utilizando ts

- Lo de las fotos:

    https://dev.to/jahangeer/how-to-upload-and-store-images-in-mongodb-database-c3f


- Sockets con mensajes: 
Renderizar un HTML con un motor de plantilla de los vistos en clase (Pug Por ejemplo) donde aparezcan los siguientes campos
•	TextField para mostrar la conversación actual entre el usuario y el server
•	Text Field para ingresar el token del usuario
•	Text field para ingresar el mensaje que podemos enviars
•	Boton para enviar el mensaje

cuando se apriete el botón de “Enviar” se deberá enviar una señal llamada “new-message” con la información del usuario y el mensaje ingresada en los textFields

El server realizara las siguientes acciones al recibir ese evento
•	Chequeará que el token pertenezca a un usuario valido.
•	Si no existe el usuario respondera con un socket indicando que el usuario es incorrecto
•	Si el usuario es correcto, toma su mensaje y lo guarda en un nuevo documento en la colección de mensaje

La lógica de respuesta es la siguiente.

Se enviara un socket con el nombre “resp-message” y la respuesta tendrá la siguiente lógica:

A) “Stock” => Se responderá con el stock actual de todos los productos
B) “Orden” => Se responderá con los datos de la ultima orden del usuario
C) “Carrito” => Se responderá con los datos del carrito del usuario.
D) Cualquier otro mensaje se deberá responder con el siguiente mensaje:


La respuesta, una vez enviada va a ser guardada en DB con el tipo Sistema

codigo base: https://medium.com/today-i-learned-chai/building-a-simple-chat-application-with-node-js-and-socket-io-a7d7b38fd028