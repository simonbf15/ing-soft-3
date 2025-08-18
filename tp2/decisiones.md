Trabajo Práctico 2 de Ingeniería de Software 3.
Universidad Católica de Córdoba.
Autores: Simón Barrale y Vicente Monzó

Paso 1:
En nuestro caso elegimos una aplicación en node.js ya que lo teniamos instalado en nuestras máquinas desde antes. Le pedimos a la IA que nos brinde una aplicación simple con una integración con una base de datos, para no perder tiempo y hacer énfasis en los aprendizajes del tp(Docker)
Repositorio donde está alojado el tp:
www.github/simonbf15/inge-soft3-ucc/tp2

Paso 2:
En nuestro caso utilizamos la versión node:18 como imagen base ya que es segura y estable, con soporte oficial de Docker Hub
Construimos la imagen de la aplicación con el comando
docker build -t simonbf15/app-ingesoft3:v1 .
Donde el docker build construye la imagen y luego le pusimos mi usuario de Docker Hub y luego el nombre de la aplicación, seguido con su tag.
Después para verificar que estaba bien construido tiramos un docker run en el puerto 3000 para verificar que estaba corriendo bien la aplicación en el contenedor. Lo hicimos con:
docker run -p 3000:3000 simonbf15/app-ingesoft3-v1
Como todo estaba bien, pasamos al punto 3 que es publicar la imagen en Docker Hub.
Paso 3:
Primer paso nos logueamos con:
docker login
Como ya habia ingresado antes en la guia, no me pidio el usuario y contraseña.
Luego para poder publicar la imagen en Docker Hub, tiramos el comando
docker push simonbf15/app-ingesoft3:v1
Fuimos a la página oficial de Docker Hub y verificamos que estaba correctamente subida la imagen.
Paso 4:
Elegimos Postgre SQL ya que es muy utilizada en la actualidad, además de que vimos SQL en otras materias asi que conocemos un poco de antes. Con el siguiente comando levantamos el contenedor de postgre con el nombre mydb, y se conecta desde la app con variables de entorno, además tiene persistencia con el pgdata.
docker run -d --name mydb -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=myapp -v pgdata:/var/lib/postgresql/data -p 5432:5432 postgres:15


Paso 5:


Paso 6:


Paso 7:
