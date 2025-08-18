Punto 1: Configurar tu entorno y preparar tu repositorio
Primero cloné el repo desde github con:

git clone https://github.com/ingsoft3ucc/2025_TP01_RepoBase.git

Para configurar mi perfil de github en el sistema:

git config --global user.name "simonbf15"
git config --global user.email "barralesimon@gmail.com"



Punto 2: Desarrollar una funcionalidad

Para trabajar en una rama separada de main primero creamos la branch nueva, y nos movemos a la misma con los comandos:

git branch branchFuncionalidad
git checkout branchFuncionalidad

Fuimos trabajando en el código (en c++) para una calculadora muy básica, haciendo los commits con:
git commit -m "texto..."

Creamos esta nueva rama porque lo pedía la consigna y para no modificar la branch main y luego poder mergearlo cuando esté todo ok.
Cada commit tiene su fundamento en que explica a grandes rasgos que es lo que se agrega.

Punto 3:

Creamos una rama nueva con el "git branch hotfix" luego me muevo a esa rama con el "git checkout hotfix".
Allí voy al archivo donde tengo el error a resolver(app.js) y lo soluciono, luego hago commit cuando está listo.
Después de esto me muevo a la rama main con "git checkout main" y hago el merge con "git merge hotfix"
También hago lo mismo para mi rama branchFuncionalidad.
Lo integramos con merge porque como no se modificó la rama main entonces git hace todo el trabajo de mover punteros para que los commits de la rama hotfix queden efectuados en la rama main.

Punto 4:
Para hacer el PR primero fuimos al repositorio de ingsoft3ucc y forkee el repo a mi cuenta de github, ahi hice el push a ese repo forkeado.
Después de esto fui al repo ingsoft3ucc y cree un PR con el repo que tengo en mi cuenta.


Punto 5:
Para crear el tag primero voy a la branch la cual esté funcionando, es decir no haya errores por solucionar y que esté todo andando. 
Allí creo el tag con el comando

git tag -a v1.0 -m "v1.0 - version estable inicial"

Y luego pusheo esta versión.

git push origin v1.0