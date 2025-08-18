#include <iostream>

using namespace std;

float sumar(float num1, float num2){
    // esta funcion recibe dos numeros flotantes(num1 y num2) y devuelve la suma de estos.
return num1 + num2;
}

float restar(float num1, float num2){
    // esta funcion recibe dos numeros float y devuelve la resta de los mismos
    return num1 - num2;
}
float multiplicar(float num1, float num2){
    // esta funcion recibe dos numeros float y devuelve la multiplicación de los mismos
    return num1 * num2;
}

void dividir(float num1, float num2) {
    // esta funcion recibe dos numeros float y devuelve la división entre los mismos(solamente si num2 != 0, sino tira eror)
    if (num2 == 0) {
        cout << "Error: No se puede dividir por cero." << endl;
    } else {
        cout << "Division: " << num1 / num2 << endl;
    }
}

int main(){
    float a, b;
    cout << "Ingrese el primer numero: ";
    cin >> a;
    cout << "Ingrese el segundo numero: ";
    cin >> b;

    cout << "Suma: " << sumar(a, b) << endl;
    cout << "Resta: " << restar(a, b) << endl;
    cout << "Multiplicacion: " << multiplicar(a, b) << endl;
    dividir(a,b);
    return 0;
}