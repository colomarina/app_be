# Proyecto Final Lucas Marina

# Endpoints:

## Login y SignUp

    METHOD: POST
    URL: /api/user/signup
    BODY:
    {
        "email": string,
        "password": string,
        "passwordConfirm": string,
        "nombreCompleto": string,
        "celular": string,
        "direccion": {
            "calle":  string,
            "altura": string,
            "codigoPostal": string,
            "piso": string,
            "departamento": string
        }
    }


    METHOD: POST
    URL: /api/user/login
    BODY:
    {
        "email": string,
        "password": string,
    }
    RETURN :
    {
        "token": string
    }


# Productos

    METHOD: GET
    URL: /api/productos
    BODY: {}
    
    METHOD: GET
    URL: /api/productos/:category
    BODY: {}

    METHOD: POST
    URL: /api/productos
    BODY:
    {
        "nombre": string,
        "descripcion": string,
        "categoria": string,
        "precio": number,
        "stock": number,
        "url": string,
    }

    METHOD: PUT
    URL: /api/productos/:producto_id
    BODY: Alguna de estas props
    {
        "nombre": string,
        "descripcion": string,
        "categoria": string,
        "precio": number,
        "stock": number,
        "url": string,
    }

    METHOD: DELETE
    URL: /api/productos/:producto_id
    BODY: {}

## Carrito

    METHOD: GET
    AUTH: Bearer Token
    URL: /api/cart/:carrito_id 
    BODY: {}
    
    METHOD: POST
    AUTH: Bearer Token
    URL: /api/cart/add/:carrito_id  
    BODY: 
    {
        "productoId": string,
	    "cantidad": number,
    }
    
    METHOD: POST
    AUTH: Bearer Token
    URL:  /api/cart/delete/:carrito_id
    BODY: 
    {
        "productoId": string,
	    "cantidad": number,
    }
    
    METHOD: POST
    AUTH: Bearer Token
    URL:  /api/cart/submit/:carrito_id
    BODY: {}

## Ordenes

    METHOD: GET
    AUTH: Bearer Token
    URL:  /api/orders/:user_id
    BODY: {}

    METHOD: GET
    AUTH: Bearer Token
    URL:  /api/orders/:order_id
    BODY: {}

    METHOD: POST
    AUTH: Bearer Token
    URL:  /api/orders/complete
    BODY: 
    {
        "orderId": string
    }

## CHAT

Esta implementado en /

## .ENV

    NODE_ENV=
    HOST=
    PORT=
    PERSISTENCIA=
    MONGO_URL=
    MONGO_SECRET_KEY=
    FACEBOOK_CLIENT_ID=
    FACEBOOK_CLIENT_SECRET=
    MAIL_ETHEREAL=
    MAIL_ETHEREAL_PASSWORD=
    MAIL_GMAIL=
    MAIL_GMAIL_PASSWORD=
    TWILIO_ACCOUNT_SID=
    TWILIO_AUTHTOKEN=
    TWILIO_FROM=
    TWILIO_TO=
