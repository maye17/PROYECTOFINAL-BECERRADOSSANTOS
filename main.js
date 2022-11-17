//variables
const main = document.querySelector('main');
const box = document.querySelector('.box');
const boxMenu = document.querySelector('.box__menu');
const divisa = '$';
const precioTotal = document.querySelector('#precioTotal');
const botonVaciar = document.querySelector('#boton-vaciar');
const procesarCompra = document.querySelector('#procesarCompra');
const offcanvasBody = document.querySelector('.offcanvas-body');
let menuContainer;


//Insertando listado de productos en las cards

productList.forEach((product) => {

    menuContainer = document.createElement('div');
    menuContainer.classList.add('box__menu__container','border','border-primary');
    menuContainer.setAttribute('id','boxMenu'); 
   const containerTitle = document.createElement('div');
    containerTitle.classList.add ('box__menu__container-title');
    const titleParrilla = document.createElement('h3');
    titleParrilla.innerText = product.name;    
    containerTitle.appendChild(titleParrilla);

    //creando description
    const contentParrilla = document.createElement('article');
    contentParrilla.classList.add('box__menu__container-card');
    const divParrParrilla = document.createElement('div');

    //creando imagen en el card
    const divImgParrilla = document.createElement('div');
    divImgParrilla.classList.add('box__menu__container-card-img')
    const imgParrilla = document.createElement('img');
    imgParrilla.setAttribute('src',product.image);    
    divImgParrilla.appendChild(imgParrilla);     

    //INSERTANDO EN EL CONTENEDOR FLEX

    contentParrilla.appendChild(divParrParrilla);
    contentParrilla.appendChild(divImgParrilla);

//creando div de recomendación para las cards
   const infoParrilla = document.createElement('div');
   infoParrilla.classList.add('box__menu__container-rec')
    const strong = document.createElement('strong');
    strong.innerText = product.recomendation;       
    infoParrilla.appendChild(strong);

    //Creando el precio    
    const priceDivParrilla =document.createElement('div');
    priceDivParrilla.classList.add('box__menu-container-price');
    const priceParrilla =document.createElement('p');
    priceParrilla.innerText='Precio: $' + product.price;         
    priceDivParrilla.appendChild(priceParrilla);
    
    //creando botón
    const btnCard = document.createElement('div');
    btnCard.classList.add('box__menu-card-btn');
    btnCardAgregar =document.createElement('button');
    btnCardAgregar.setAttribute('id','button')
    btnCardAgregar.classList.add('btn', 'btn-primary');
    btnCardAgregar.innerText='Agregar';
    btnCardAgregar.onclick = function(){agregarProductoCarrito(product.id)};
    btnCard.appendChild(btnCardAgregar);
    
    //agregando cantidad
    const cantidadCard = document.createElement('p');
    cantidadCard.classList.add('box__menu-container-price');
    cantidadCard.innerText = 'Cantidad' + product.cantidad;

    //agregando todo al card
    
    menuContainer.appendChild(containerTitle);
    menuContainer.appendChild(contentParrilla);
    menuContainer.appendChild(infoParrilla);    
    menuContainer.appendChild(priceDivParrilla);
    menuContainer.appendChild(btnCard);    
    boxMenu.appendChild(menuContainer);
    box.appendChild(boxMenu);
    main.appendChild(box)        
 

 } 
  
)


let carrito = [];
//procesando las compras en el carrito
procesarCompra.addEventListener('click',ValidarProductosComprados)
// variable para incrementar el valor total en el carrito
const CarritoTotal = document.querySelector('#CarritoTotal');
const ActivarFuncion = document.querySelector('#ActivarFuncion');
if(ActivarFuncion === true){
    ActivarFuncion.addEventListener('click',ProcesandoPedido);
}

// evento que guarda la información cuando se recarga la página, buscando la informaciónen en el local storage en caso de no contener muestra vacío
document.addEventListener('DOMContentLoaded',() => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []; 
    mostrarCarrito();
})

function ValidarProductosComprados(){
    if(carrito.length ===0){
        //agregando una alerta si el carrito esta vacio
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El carrito esta vacio!',
            color: '#000',
            background: '#fff',
            backdrop: `
              rgba(0,0,123,0.2)
              url("/assets/tarde-barry-allen.gif")
              left top
              no-repeat`,
              confirmButtonText:'Aceptar',
            footer: '<a href="./index.html">Agrega productos al carrito</a>'
          })
           
          
    }else {

       
       /*  location.href = "comprar.html" */
        ProcesandoPedido();
    }
}


// llamando a la función vaciar carrito
botonVaciar.addEventListener('click',VaciarCarrito);

function VaciarCarrito() {
    carrito.length = [];
    console.log(carrito)
    mostrarCarrito();
    
}

//agregando productos al carrito
function agregarProductoCarrito(id) {
    //quitamos los productos duplicados e incrementamos la cantidad dentro del carrito
    const duplicado = carrito.some(product => product.id ===id)
    if(duplicado){
        const product = carrito.map(product =>{
            if(product.id ===id){
                product.cantidad ++;
            }
        })
    }else {
        //agregamos productos al carrito sino esta duplicado
        const item = productList.find((product) => product.id === id);
        carrito.push(item);
    }

    mostrarCarrito();
}

//mostrando producto del carrito en el modal
const mostrarCarrito = () =>{
    const modalBody = document.querySelector('.modal .modal-body');
    modalBody.innerHTML="";
    carrito.forEach(product => {
        /* const {id, name,price, image,cantidad} = product */
        modalBody.innerHTML +=`
        <div class="modal-contenedor">
            <div>
                <img class="img-fluid img-carrito" src="${product.image}">
            </div>
            <div>
                <p>Producto: ${product.name}</p>
                <p>Precio:  ${divisa} ${product.price}</p>
                <p>Cantidad: ${product.cantidad}</p>
                <button onclick="eliminarProductoCarrito(${product.id})" class= "btn btn-danger">Eliminar Producto</button>         
            </div>
        </div>`
    });   
    //recorriendo el carrito, si esta vacio muestra mensaje
    if(carrito.length===0){
        modalBody.innerHTML=`
        <p class="text-center text-primary">El carrito esta vacio</p>`
    }
    //recorriendo el carrito para conocer la cantidad de productos
    CarritoTotal.textContent = carrito.length;

    //calculando el precio total a pagar de los productos
    precioTotal.innerText= divisa + carrito.reduce((acc,product) => acc + product.cantidad * product.price, 0, );
    guardaLocalStorage();
}

//eliminar productos del carrito
function eliminarProductoCarrito(id) {
    const quitarId = id;
   carrito = carrito.filter((quitar) => quitar.id !== quitarId);
    mostrarCarrito();
    
}

//guardando en el local storage los productos ingresados al carrito
function guardaLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function ProcesandoPedido() {

    carrito.forEach((product)=>{
        const listCompra = document.querySelector('#lista-compra tbody');     
        const fila = document.createElement('row');
        const filaCompra   = document.createElement('tr')     
        const tdImg = document.createElement('td');
        tdImg.classList.add('img-fluid','img-carrito-pedido');
        const imgCompra =document.createElement('img')
        imgCompra.setAttribute('src',product.image);
        const tdNombre = document.createElement('td');
        tdNombre.innerText= product.name;
        const tdPrecio = document.createElement('td');
        tdPrecio.innerText= divisa + product.price;
        const tdCantidad = document.createElement('td');
        tdCantidad.innerText= product.cantidad;
        const tdSubTotal = document.createElement('td');
        tdSubTotal.innerText = divisa + product.cantidad*product.price ;

        tdImg.appendChild(imgCompra);    
        filaCompra.appendChild(tdImg);
        filaCompra.appendChild(tdNombre);
        filaCompra.appendChild(tdPrecio);
        filaCompra.appendChild(tdCantidad);
        filaCompra.appendChild(tdSubTotal);
        listCompra.appendChild(filaCompra);
        console.log(listCompra)

    })  
    
}
