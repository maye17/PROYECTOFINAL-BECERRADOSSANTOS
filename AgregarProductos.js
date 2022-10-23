
//Varaibles
const PaSuper = 5500;
const PaMar = 3500;
const PaKids= 1800;
const Paduo = 3600;
let flag;

let total1= 0;
let total2= 0;
let total3= 0;
let total4= 0;
let opc1 = 1;
let opc2 = 2;
let opc3 = 3;
let opc4 = 4;
let opcion2;
let opcionActual;
let opcion;
//Proceso


    

do {

        //Ingresar opción

        opcion =  parseInt (prompt ("Qué parrilla desea comprar: \n 1.- Parrilla Super Junquito, precio: $5500 \n 2.-Parrilla del Mar, Precio: $3500  \n 3.- Parrilla Kids, precio: $1800 \n 4.- Parrilla para Dos, precio: $3600"));
   

  console.log (`valor de opcion: ${opcion}`);

    let comprar = function comprar(opcion) {

        //Una vez elegida la opción, se valida en cada uno de los casos
        switch (true) {
            case (opcion === opc1):

                alert(`Haz elegido la siguiente opción ${opc1} Parrilla Super Junquito`);

                break;

            case (opcion === opc2):

                alert(`Haz elegido la siguiente opción ${opc2}  Parrilla Frutos del Mar`);

                break;

            case (opcion=== opc3):

                alert(`Haz elegido la siguiente opción  ${opc3}  Parrilla Kids`);

                break;


            case (opcion === opc4):

                alert(`Haz elegido la siguiente opción ${opc4} Parrilla para Dos`);

                break;    

            default:

                alert("No haz elegido ninguna opción");
    
                break;
               
        }
        
     
    }
    
    //llamamos a la función para consultar las opciones
    comprar(opcion);

    
    //Solicitamos el ingreso de la cantidad de platos a solicitar según la opción elegida.

    let cantidad = parseInt (prompt ("Ingrese la cantidad de platos."));

    //Valida que sea un número el dato inngresado en caso de que no arroja un alert.
    if(isNaN(cantidad)){
        alert("No es un valor");

       }else {    
    
        //Ejecuta la función validando la opción seleccionada y agregando la cantidad según el plato elegido
    function agregarCantidad(cantidad) {
  
        switch (true) {
            case (opcion === opc1):

                alert(`Usted tiene esta cantidad: ${cantidad}`);
                 total1 = (total1 + PaSuper) * cantidad;
                document.write(`${cantidad} x Parrilla Super Junquito &nbsp; &nbsp;$ ${total1} <br/> `);


                break;
            case (opcion === opc2):

                alert(`Usted tiene esta cantidad: ${cantidad}`);
                total2 = (total2 + PaMar) * cantidad;
                //imprime la cantidad la opción y el total generado por cantidad
                document.write(` ${cantidad} x Parrilla Frutos del Mar  &nbsp; &nbsp;$ ${total2} </br>`);

                break;
            
            case (opcion === opc3):

                alert(`Usted tiene esta cantidad: ${cantidad}`);
                total3 = (total3 + PaKids) * cantidad;
                document.write(`${cantidad} x Parrilla Kids &nbsp; &nbsp;$ ${total3} </br>`);
                
                break;
            
            case (opcion === opc4):
                alert(`Usted tiene esta cantidad: ${cantidad}`);
                 total4 = (total4 + Paduo) * cantidad;
                document.write(`${cantidad} x Parrilla para Dos &nbsp; &nbsp;$ ${total4} </br>`);
                break;


            default:

                alert("Error");
                break;
        }

    }
    agregarCantidad(cantidad);
}

//pregunta si quiere agregar otro plato a la compra
flag =
prompt (`¿Quiere pedir otro plato? Y/N`);
console.log ("flag", flag);
opcionActual = opcion;

console.log (`valor de opcion: ${opcionActual}`);


//Salida

}while(flag !='N');


//En caso de no querer otro plato sale e imprime el total a pagar.
let total= total1 + total2 + total3+ total4;
document.write(`Total a pagar: ${total}`);



