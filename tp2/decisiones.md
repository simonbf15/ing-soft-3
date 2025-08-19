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
Elegimos Postgre SQL ya que es muy utilizada en la actualidad, además de que vimos SQL en otras materias asi que conocemos un poco de antes. Con el siguiente comando levantamos el contenedor de postgre con el nombre mydb, y se conecta desde la app con variables de entorno, además tiene persistencia con el pgdata(luego vamos a cambiar algunas cosas en el docker-compose cuando tengamos dos BD distintas una para QA y otra para PROD).

docker run -d --name mydb -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=myapp -v pgdata:/var/lib/postgresql/data -p 5432:5432 postgres:15
Le pasamos el usuario, su password, la base de datos y la persistencia en pgdata, ademas los puertos que expone y que escucha la bd y la version de postgre

Paso 5 y 6:
Creamos el docker-compose para que levante las aplicaciones en QA, en PROD y dos base de datos(una para cada app) cada una con sus configuraciones correspondientes pero descargando la misma imagen ya que es lo que pedía la consigna.
Por ejemplo ambas app usan la misma imagen de postgre pero utilizan dos base de datos distintas, o sea hay un contenedor para cada BD. Las dos se conectan con el mismo user y password pero al ser dos BD distintas tienen cada una sus datos. En este fragmento de código podemos ver la conexión a la BD de la aplicación QA.

container_name: app_qa
    environment:
      ENV: "QA"
      DB_HOST: db_qa
      DB_PORT: 5432
      DB_USER: postgres
      DB_PASSWORD: postgres
      DB_NAME: qa_db

Ahí está el nombre del contenedor de la app, las variables de entorno, el contenedor que tiene la base de datos, el puerto, el user, password y el nombre de la base de datos
A su vez en la aplicación nos conectamos de la siguiente manera:
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  port: process.env.DB_PORT || 5432,
});

Lo que hace es primero leer las variables de entorno y si no le pasamos nada, por defecto pone lo que esta despues de los ||. 

Al tener este docker-compose ya aseguramos que pueda ejecutarse en cualquier máquina ya que esto hace que instale todas las dependencias, imágenes, configuraciones y cosas necesarias para que la aplicación se ejecute. Por lo tanto con hacer un docker-compose up ya instalaría lo necesario y podríamos correrlo.

Paso 7:



