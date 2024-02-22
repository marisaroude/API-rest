# API-rest
Generación de API para gestionar los usuarios y el acceso a la aplicación. 

Requerimientos:
- node v18 (npm v9)
- postgreSQL v14
- Postman

Clona este repositorio en la carpeta que desees:
`git clone https://github.com/marisaroude/API-rest.git`

y ejecuta los siguientes comandos: 
- `cd API-rest`
- `npm install`

Abre una terminal e ingresa el siguiente comando, esto te ingresará en la terminal de postgres (reemplaza usuario por el usuario que desees, normalmente es postgres)
`sudo -u tu_usuario psql`

Una vez aquí debemos ejecutar de a uno los scripts que se encuentran dentro de `database/database.sql`

1.
  ```
  CREATE DATABASE pruebatecnica;
  ```

2. 
  ```
  \c pruebatecnica
```
3.
  ```
      CREATE TABLE users (
      id SERIAL NOT NULL PRIMARY KEY,
      email VARCHAR(320) NOT NULL,
      name VARCHAR(100) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      address VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
      );  
  ```
4.
   ```
   INSERT INTO users (email, name, phone, address, password) VALUES ('prueba@probando.com', 'prueba', '3442123456', 'mitre 677', 'abc123');
   ```
Puedes chequear la inserción con el siguiente comando:
`\d users`

Ahora continuemos con los datos de conexión de la base de datos:
1. Crea un archivo en la raíz del proyecto llamada .env
2. Dentro copia el siguiente código y reemplaza los valores correspondientes (el host y el port siempre suelen ser iguales):
  ```
  USER_PG='tu_usuario'
  HOST_PG='localhost'
  PORT_PG=5432
  PASSWORD_PG='tu_clave'
  DATABASE_PG='pruebatecnica'
  ```

Ahora si, podemos ejecutar dentro del proyecto el siguiente comando:
`npm run dev` 

Si la conexión con la Base de datos está ok, deberíamos ver en la terminal lo siguiente:
![image](https://github.com/marisaroude/API-rest/assets/81636065/e7ba73b5-d049-40ab-a459-c8b1cf6f502a)

¡Bien! Ya tenemos todo configurado para comenzar a realizar las pruebas en Postman.
Para ello debemos importar en Postman el archivo `API-rest.json` que se encuentra en la raíz del directorio.

# End-point: getUsers

Vamos a obtener los usuarios, en este caso solo deberíamos obtener un usuario, ya que de momento solo insertamos uno

Hacemos click en 'Send' y obtendremos lo siguiente:
```
[
    {
        "id": 1,
        "email": "prueba@probando.com",
        "name": "prueba",
        "phone": "3442123456",
        "address": "mitre 677",
        "password": "abc123",
        "session_active": false
    }
]
```

# End-point: loginUser
Ahora, en el POST de loginUser nos dirigimos a la sección de "body", seleccionamos "raw", ingresamos lo siguiente y damos click en 'Send':
```
{
    "phone":"3442123456",
    "password": "abc123"
}
``` 
Obtendremos lo siguiente: 
```
{
    "user": {
        "id": 1,
        "email": "prueba@probando.com",
        "name": "prueba",
        "phone": "3442123456",
        "address": "mitre 677",
        "session_active": true
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjM0NDIxMjM0NTYiLCJlbWFpbCI6InBydWViYUBwcm9iYW5kby5jb20iLCJpYXQiOjE3MDg2NDQxMjUsImV4cCI6MTcwODY0NzcyNX0.wS4-cIggi3u7y-UO2AnBGfqOpDK_pT3hF8ycLnclCeQ",
    "token_type": "bearer"
}
```

El access_token nos servirá para las peticiones que requieran token de acceso.
TENER EN CUENTA: El token durará una hora, por lo tanto, en caso de errores, generar un nuevo token.

# End-point: getUser
Si no tiene Token al dar click en 'Send' nos arrojará `Unauthorized` 
Por esto, nos dirigimos a la sección 'Authorization' seleccionamos la opción 'Bearer Token', colocamos el token previamente obtenido y guardamos cambios.
Ahora si, podemos intentar dar click en 'Send' y obtendremos: 

```
[
    {
        "id": 1,
        "email": "prueba@probando.com",
        "name": "prueba",
        "phone": "3442123456",
        "address": "mitre 677",
        "password": "abc123",
        "session_active": true
    }
]
```

(Este endpoint tiene como id el 1 por defecto, al ingresar más items podemos cambiarlo)

# End-point: CreateUser
Este endpoint también requiere de Token, por lo tanto, debes seguir los pasos del endpoint loginUser.
Nos dirigimos a la sección de "body", seleccionamos "raw", ingresamos lo siguiente y damos click en 'Send':
```
{
 "name": "string",
 "phone": "string",
 "email": "user@example.com",
 "password": "string",
 "address": "string"
}
```

y obtendremos:
```
{
    "name": "string",
    "phone": "string",
    "email": "user@example.com",
    "password": "string",
    "address": "string"
}
```


# End-point: getUser
Este endpoint también requiere de Token, por lo tanto, debes seguir los pasos del endpoint loginUser.
Vamos a obtener un usuario específico, según el id, por defecto está colocado el id:1

Damos click en 'Send' y obtenemos:

```
[
    {
        "id": 1,
        "email": "prueba@probando.com",
        "name": "prueba",
        "phone": "3442123456",
        "address": "mitre 677",
        "password": "abc123",
        "session_active": true
    }
]
```

# End-point: updateUser
Este endpoint también requiere de Token, por lo tanto, debes seguir los pasos del endpoint loginUser.
En este endpoint, por defecto se seleccionó el id 2, para modificar los datos del segundo insertado.
Nos dirigimos a la sección de "body", seleccionamos "raw", ingresamos lo siguiente y damos click en 'Send':
```
{
 "name": "testingput",
 "phone": "01020304",
 "email": "testing@put.com",
 "password": "puttesting",
 "address": "testing put 2"
}
``` 
y nos devuelve: 
```
{
    "id": 2,
    "email": "testing@put.com",
    "name": "testingput",
    "phone": "01020304",
    "address": "testing put 2",
    "password": "puttesting",
    "session_active": true
}
```

# End-point: deleteUser
Este endpoint también requiere de Token, por lo tanto, debes seguir los pasos del endpoint loginUser.
En este endpoint, por defecto se seleccionó el id 2, para eliminar los datos del recientemente modificado.
Damos click en 'Send' y la Response será `204 No Content`.
