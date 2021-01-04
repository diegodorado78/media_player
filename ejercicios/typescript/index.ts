function add(a: number, b: number):number {
    return a+b
}

const c = add(5,44);
console.log(c);

//interfaces para definir la forma exacta que debe tener un objeto

interface Rectangulo{ //interface para mostrar el modelo de objeto
    ancho: number;
    alto: number;
    color?: Color;
}
enum Color{
    Rojo = "Rojo",
    Verde ="Verde"
}
let rect: Rectangulo = {
    ancho: 4,
    alto: 6,
    color: Color.Rojo,
}
function area(r: Rectangulo):number { //tipo de dato que return la f()
    return r.alto * r.ancho;
}

rect.toString = function () {//si this.colo es true(existe) imprime.. sino un rectangulo
    return this.color ? ` Un rectangulo ${this.color}` : 'Un rectangulo';
};
console.log(rect.toString());