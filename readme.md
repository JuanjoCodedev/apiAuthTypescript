# Api básica autenticación de usuario

## **Introducción**

En la actualidad, la autenticación de usuario es una de las funcionalidades más importantes en la mayoría de las aplicaciones web y móviles. Para facilitar la implementación de esta funcionalidad, se han desarrollado esta Api que permite autenticar a los usuarios de forma segura y eficiente creada con Typescript.

TypeScript es un lenguaje de programación que se ha convertido en una de las principales opciones para desarrollar aplicaciones web y móviles. Gracias a su tipado estático y otras características avanzadas, es una opción ideal para desarrollar APIs de alta calidad y seguras.

## **Instalación**

La instalación del proyecto es muy sencilla solo debes de seguir cada uno de estos pasos:

1. Clonar el proyecto apiAuthTypescript para ello debes ejecutar el comando git clone acompañado de la siguiente url: https://github.com/JuanjoCodedev/apiAuthTypescript.git

2. Crear una base de datos en MongoDB.

3. Configurar las variables de entorno del proyecto.

## **Definiciones**

En el proyecto encontraras llamado a las variables de entorno nombradas o definidas así: proccess.env.TOKEN_KEY, aqui se comparte su definición:

- **PORT:** Estableces tu puerto de conexión localhost.

- **MONGO_USER:** Usuario de MongoDb.

- **MONGO_PASSWORD:** Contraseña o clave de tu base de datos MongoDb.

- **MONGO_DBNAME:** Nombre de su base de datos.

- **MONGO_EXPIRATION:** Aqui estableceras el tiempo de expiración del token.

- **TOKEN_KEY:** Aqui va la clave secreta de tu token.

## Tecnologias utilizadas

- :rocket: Typescript.
- :rocket: NodeJS.
- :rocket: Express.
