# API Documentacion

Este documento proporciona los comandos `curl` para interactuar con la API.

---
### Crear un usuario (nombre, email, contraseña hasheada).

```bash
curl -X POST http://localhost:3000/api/user \
-H "Content-Type: application/json" \
-d '{
  "name": "javier",
  "email": "javier@gmail.com",
  "password": "123456789"
}' 
```
### Autenticación con JWT.
```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW5AZ21haWwuY29tIiwic3ViIjoxMCwiaWF0IjoxNzQwMjEwMjczLCJleHAiOjE3NDAyMTM4NzN9.kJRhQ8OOY_n3jdu6CADsu_C7AymqbH5DdO-ZNUMmA6s" \
-d '{
  "email": "juan@gmail.com",
  "password": "123456789"
}'
```
### Endpoint para obtener información del usuario autenticado.
```bash
curl -X POST http://localhost:3000/api/auth/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW5AZ21haWwuY29tIiwic3ViIjoxMCwiaWF0IjoxNzQwMjEyNjQ5LCJleHAiOjE3NDAyMTYyNDl9.Ntm8Upx0NlwwO9ucbGJBkB_4mPIQYqK5lgFzVPpB4Jg" \
-d '{
  "email": "juan@gmail.com",
  "password": "123456789"
}'
```
### Crear un pedido (asociado a un usuario).
```bash
curl -X POST http://localhost:3000/api/pedidos \
-H "Content-Type: application/json" \
-d '{
  "pedido": "Pizza",
  "precio": 10.99,
  "userId": 7
}'
```

### Listar los pedidos de un usuario.
```bash
curl -X GET http://localhost:3000/api/pedidos/user/{id}
```
### Cambiar el estado de un pedido (pendiente, en proceso, completado).
```bash
curl -X PATCH http://localhost:3000/api/orders/{uuid} \
-H "Content-Type: application/json" \
-d '{
  "status": "COMPLETADA"
}'
```






