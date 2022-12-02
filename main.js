//variables
const main = document.querySelector('main');
const boxs = document.querySelector('.boxs','.container-fluid','.scrollDestacados');
const sectionBox = document.querySelector('#sectionBox');
const boxMenu = document.querySelector('.box__menu');
const divisa = '$';
const precioTotal = document.querySelector('#precioTotal');
const botonVaciar = document.querySelector('#boton-vaciar');
const procesarCompra = document.querySelector('#procesarCompra');
const offcanvasBody = document.querySelector('.offcanvas-body');
const totalCompra = document.querySelector('#totalCompra');
const sectionBoxCachapa = document.querySelector('#sectionBoxCachapa')
const modalFooter = document.querySelector('.modal-footer')
let menuContainer;

//insertando productos destacados
const MostrarProductDestacados = async() => {
    const productDestacadosFetch = await fetch('productos.json')
    const productDestacadosJson = await productDestacadosFetch.json()
    const filterProductDestacados = productDestacadosJson.filter(product => product.categoria === "Destacados")
    filterProductDestacados.forEach((product)=>{
        const boxsDestacados = document.createElement('div');
        boxsDestacados.classList.add('boxs__card');
        const imgDestacados = document.createElement('img');
        imgDestacados.setAttribute('src', product.image);
        
        const firtsTitleDestacados = document.createElement('h2');
        firtsTitleDestacados.innerText = product.name;
        const parrafoDestacados = document.createElement('p');
        parrafoDestacados.innerText = 'Precio $' + product.price;
        
        //button

        const btnCardDes = document.createElement('div');
        btnCardDes.classList.add('box__menu-card-btn');
        btnCardAgregarDes =document.createElement('button');
        btnCardAgregarDes.setAttribute('id','button')
        btnCardAgregarDes.classList.add('btn', 'btn-primary');
        btnCardAgregarDes.innerText='Agregar';
        btnCardAgregarDes.onclick = function(){agregarProductoCarrito(product.id)};
        btnCardDes.appendChild(btnCardAgregarDes);
        
        boxsDestacados.appendChild(imgDestacados);
        boxsDestacados.appendChild(firtsTitleDestacados);
        boxsDestacados.appendChild(parrafoDestacados);
        boxsDestacados.appendChild(btnCardDes);  
        boxs.appendChild(boxsDestacados);
        main.appendChild(boxs);
     
    });
}



MostrarProductDestacados()


//Insertando listado de productos en las cards

async function MostrarProductos(){
    const productFetch = await fetch('productos.json')
    productJson = await productFetch.json()
/*      filtradoProduct = productJson.filter(product => product.categoria === categoria.id)     */    
            productJson.forEach((product) => {
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
            divParrParrilla.classList.add('box__menu__container-card-list');
            const parrParrilla = document.createElement('p');
            parrParrilla.innerText= product.description;
        
            divParrParrilla.appendChild(parrParrilla);
            contentParrilla.appendChild(divParrParrilla);
        
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
                
          })
        
            sectionBox.appendChild(boxMenu);
            main.appendChild(sectionBox)          
        
        }

        MostrarProductos()
let carrito = [];
//procesando las compras en el carrito
procesarCompra.addEventListener('click',ValidarProductosComprados)
// variable para incrementar el valor total en el carrito
const CarritoTotal = document.querySelector('#CarritoTotal');
const formulario = document.querySelector('#procesar-pago');
formulario.addEventListener('submit', EnviarPedido)

// evento que guarda la información cuando se recarga la página, buscando la informaciónen en el local storage en caso de no contener muestra vacío
document.addEventListener('DOMContentLoaded',() => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []; 
    mostrarCarrito();
})

// validando si oculta o no el modal
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
            ProcesandoPedido();
    }
}

// llamando a la función vaciar carrito
botonVaciar.addEventListener('click',VaciarCarrito);
function VaciarCarrito() {
    carrito.length = [];
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
        const item = productJson.find((product) => product.id === id);
        carrito.push(item);
        Toastify({
            text: "producto agregado",
            duration: 5000,
            className: "info",
            style: {
              background: "linear-gradient(to right top, #05372a, #00633c, #289042, #62be39, #a8eb12)",
            }
          }).showToast();
    }

    mostrarCarrito();
}

//mostrando producto del carrito en el modal
const mostrarCarrito = () =>{
    const modalBody = document.querySelector('.modal .modal-body');
    modalBody.innerHTML="";
    carrito.forEach(product => {
        const {id, name,price, image,cantidad} = product
        modalBody.innerHTML +=`
        <div class="modal-contenedor">
            <div>
                <img class="img-fluid img-carrito" src="${image}">
            </div>
            <div>
                <p>Producto: ${name}</p>
                <p>Precio:  ${divisa} ${price}</p>
                <p>Cantidad: ${cantidad}</p>
                <button onclick="eliminarProductoCarrito(${id})" class= "btn btn-danger">Eliminar Producto</button>         
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
    precioTotal.innerText= divisa + carrito.reduce((acc,product) => acc + product.cantidad * product.price, 0);
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

    });
    totalCompra.innerText = divisa + carrito.reduce((acc,product) => acc + product.cantidad * product.price, 0);

    
}

const closedOffcanvas = document.querySelector('#offcanvasRight')
function EnviarPedido(e) {
    e.preventDefault();
    const cliente = document.querySelector('#cliente').value;
    const telefono = document.querySelector('#telefono').value;
    const direccion = document.querySelector('#direccion').value;
    
    if(cliente ==="" || direccion===""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Te falta completar el nombre y dirección!',
            color: '#000',
            background: '#fff',
            confirmButtonText:'Aceptar',
           
          })
    }else {
        //agregando un spinner cuando se hace el envio del pedido
        const spinner = document.querySelector('#spinner');
       
        spinner.classList.add('activo');
        spinner.classList.remove('inactivo');
        setTimeout (() => {
            spinner.classList.remove('activo');
            spinner.classList.add('inactivo');
            formulario.reset();
            document.querySelector('tbody').innerHTML='';
            document.querySelector('#totalCompra').innerHTML='';
            document.querySelector('.modal-body').innerHTML='';
            document.querySelector('#precioTotal').innerHTML='';
            document.querySelector('#CarritoTotal').innerHTML='0';
            
            
        },3000);
        Toastify({
            text: "Compra realizada con éxito",
            duration: 5000,
            className: "info",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();

        borrarLocalStorage();  
     
    } 
   
    
 
}

//elimina la información del local storage una vez enviado el pedido
function borrarLocalStorage() {
    localStorage.removeItem('carrito');
}

//función de buscar un producto en el filtro
const buscador = document.querySelector('#buscador');
const categorias = document.querySelector('#categorias')
const resultado =document.querySelector('#resultado');
const filtrarCategorias = document.querySelector('#filtrarCategorias');


const mostrarCategorias = async()=> {
    const categoriaFetch = await fetch('categorias.json')
    const categoriasJson = await categoriaFetch.json()
    categoriasJson.forEach(categoria => {
        const option = document.createElement('option');
        option.innerText =`${categoria}`
        categorias.appendChild(option)
    })
}

const buscarProductosCategorias = async() => {
    resultado.innerHTML = '';
    buscador.value="";
    const categoriaElegida = categorias.value
    const productosFetch = await fetch(`productos.json`);
    const productJson= await productosFetch.json()
    const productosFiltrados = productJson.filter(product => product.categoria === categoriaElegida)
    productosFiltrados.forEach(product =>{
        resultado.innerHTML +=  `
            <div class="container-fluid">
            <div class="box__menu__container border border-primary">
            <div class="box__menu__container-title">
              <h3>${product.name}</h3>
            </div>
            <article class="box__menu__container-card">
              <div class="box__menu__container-card-parr">
                <p>${product.description}
                </p>            
              </div>
              <div class="box__menu__container-card-img"> 
              <img src="${product.image}" alt="">
              </div>
            </article>
            <div class="box__menu__container-rec">
                <strong>${product.recomendation}</strong>
            </div>
            <div class="box__menu-container-price">
              <p>${divisa} ${product.price}</p>
            </div>
            <button onclick="agregarProductoCarrito(${product.id})" class="btn btn-primary">Agregar</button>
          </div>
          <hr class="separador">
          </div>`                            
    })
}
 
//filtro por letra en el buscador
const filtrar = ()=> {
    resultado.innerHTML = '';
    categorias.value="Categorias";
      const texto = buscador.value.toLowerCase();
    for (let product of productJson){
        let nombreProducto = product.name.toLowerCase();
        if(nombreProducto.indexOf (texto) !== -1){
            resultado.innerHTML +=  `
            <div class="container-fluid">
            <div class="box__menu__container border border-primary">
            <div class="box__menu__container-title">
              <h3>${product.name}</h3>
            </div>
            <article class="box__menu__container-card">
              <div class="box__menu__container-card-parr">
                <p>${product.description}
                </p>            
              </div>
              <div class="box__menu__container-card-img"> 
              <img src="${product.image}" alt="">
              </div>
            </article>
            <div class="box__menu__container-rec">
                <strong>${product.recomendation}</strong>
            </div>
            <div class="box__menu-container-price">
              <p>${divisa} ${product.price}</p>
            </div>
            <button onclick="agregarProductoCarrito(${product.id})" class="btn btn-primary">Agregar</button>
          </div>
          <hr class="separador">
          </div>`  ;              
            
        }  
    
    }   if(resultado.innerHTML ===''){
            resultado.innerHTML += `
            <div data-test-id="empty" class="container Fluid box__buscador-container">
            <svg viewBox="0 0 24 24" focusable="false" role="presentation" class="buscadorNone"><path fill="currentColor" d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"></path></svg>
            <p class="lead">No se encotraron productos..</p>
            <hr class="separador">
            <div>
            `          
                
         } 

         borrarFiltro(8);
}

//borrando la información del filtro al pulsar la tecla borrar del teclado

let teclaPulsada;
let eventoControlado = false;
window.onload = function()  { 
    document.onkeyup = borrarFiltro; 
}
function borrarFiltro(e) {
     teclaPulsada=e.keyCode;
    if (teclaPulsada ==8) {
        resultado.innerHTML='';     
    }
    eventoControlado=false;
}


mostrarCategorias()

categorias.addEventListener('click',buscarProductosCategorias)
buscador.addEventListener('keyup',filtrar) 

