# API Documentation

## Base URL

`http://localhost:3000/api`

## Authentication

La mayoría de endpoints requieren un token JWT que debe ser incluido en el header de la petición:

```
Authorization: Bearer <token>
```

## Endpoints

### Autenticación

| Endpoint         | Método | Auth Required | Body                                                      | Descripción               | Respuesta                             |
| ---------------- | ------ | ------------- | --------------------------------------------------------- | ------------------------- | ------------------------------------- |
| `/auth/register` | POST   | No            | `{ "name": string, "email": string, "password": string }` | Registra un nuevo usuario | `{ "token": string, "user": object }` |
| `/auth/login`    | POST   | No            | `{ "email": string, "password": string }`                 | Inicia sesión             | `{ "token": string, "user": object }` |

### Menú

| Endpoint    | Método | Auth Required | Body/Params                                                                                       | Descripción                 | Respuesta         |
| ----------- | ------ | ------------- | ------------------------------------------------------------------------------------------------- | --------------------------- | ----------------- |
| `/menu`     | GET    | Sí            | -                                                                                                 | Obtiene todos los platos    | Array de platos   |
| `/menu`     | POST   | Sí            | `{ "name": string, "description": string, "price": number, "image": string, "category": string }` | Crea un nuevo plato         | Plato creado      |
| `/menu/:id` | GET    | Sí            | `id` en URL                                                                                       | Obtiene un plato específico | Plato             |
| `/menu/:id` | PUT    | Sí            | `id` en URL + datos a actualizar                                                                  | Actualiza un plato          | Plato actualizado |
| `/menu/:id` | DELETE | Sí            | `id` en URL                                                                                       | Elimina un plato            | Mensaje de éxito  |

### Pedidos

| Endpoint      | Método | Auth Required | Body/Params                                                                    | Descripción                      | Respuesta          |
| ------------- | ------ | ------------- | ------------------------------------------------------------------------------ | -------------------------------- | ------------------ |
| `/orders`     | GET    | Sí            | -                                                                              | Obtiene todos los pedidos        | Array de pedidos   |
| `/orders`     | POST   | Sí            | `{ "items": [{ "menuItem": ObjectId, "quantity": number }], "total": number }` | Crea un nuevo pedido             | Pedido creado      |
| `/orders/:id` | GET    | Sí            | `id` en URL                                                                    | Obtiene un pedido específico     | Pedido             |
| `/orders/:id` | PUT    | Sí            | `id` en URL + `{ "status": string }`                                           | Actualiza el estado de un pedido | Pedido actualizado |

## Modelos de Datos

### Usuario

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "admin" | "user"
}
```

### Plato del Menú

```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "image": "string",
  "category": "Entrantes" | "Principales" | "Postres" | "Bebidas",
  "available": "boolean"
}
```

### Pedido

```json
{
  "items": [{
    "menuItem": "ObjectId (referencia a Menu)",
    "quantity": "number"
  }],
  "total": "number",
  "status": "Pendiente" | "En preparación" | "Listo",
  "user": "ObjectId (referencia a User)"
}
```

## Estados de Respuesta

- 200: Éxito
- 201: Creado exitosamente
- 400: Error en la petición
- 401: No autorizado
- 404: No encontrado
- 500: Error del servidor

## Notas Adicionales

- Todos los endpoints que requieren autenticación esperan un token JWT válido en el header
- Los pedidos son automáticamente asociados al usuario que hace la petición
- Las categorías de platos están limitadas a: "Entrantes", "Principales", "Postres", "Bebidas"
- Los estados de pedidos están limitados a: "Pendiente", "En preparación", "Listo"
