##  Cline Gateway
El gategay es el punto de comunicacion entre nestros clientes y nuestros servicios. Es el encargado de recibir las peticiones, enviarla a los servicios correspondiente y devolver las respuesta al cliente

##
1.Clonar el repositorio
2.Instalar dependencias
3. CREar archivs `.env` basada en el `env.template`

4.Levantar el servidor de NATS

```
docker run -d --name nats-main -p 4222:4222 -p 8222:8222 nats

```
5. Tener levantados los micrroservicios que se van a consumir
6. Levanar proyecto con `npm run start:dev`

##NATS

```
docker run -d --name nats-main -p 4222:4222 -p 8222:8222 nats

```
