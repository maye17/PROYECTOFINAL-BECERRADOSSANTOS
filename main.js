const main = document.querySelector('main')


let box = document.querySelector('.box');
let boxMenu = document.querySelector('.box__menu');

let productList =[]
productList.push ({
    id:1,
    name:'Parrilla Super Junquito',
    price:5500,
    image:'./assets/parrilla.jpeg',
    descriptions:'carne de Res, &nbsp; pollo a la parrila, Cerdo, Chorizo, Ensalada rayada, Porcón de papas fritas, Dips de Guasaca o tartara.',
    infoParrilla:'Recomendada para 3 y/o 4 personas.',
    categoria:1, 
});
productList.push ({
    id:2,
    name:'Parrilla Mar y Tierra',
    price:3500,
    image:'./assets/parrilla-frutosdelmar.jpg',
    descriptions:'Calamares,  Camarones,  Rabas,   Mejillones,   Ensalada rayada,   Bollito y/o yuca,   Dips de Guasaca o tartara   y 500ml. de Gaseosa.',
    infoParrilla:'Recomendada para 1 personas.',
    categoria:2, 
  
});
productList.push ({
    id:3,
    name:'Parrilla Kids',
    price:1800,
    image:'./assets/parrilla-kids.jpg',
    descriptions:'Carne de Res,   pollo a la parrila,   Cerdo,   Chorizo,   Ensalada rayada,   Porcón de papas fritas,   Dips de Guasaca o tartara.',
    infoParrilla:'Recomendada para niños.',
    categoria:3, 
  
});
productList.push ({
    id:4,
    name:'Parrilla para Dos',
    price:3600,
    image:'./assets/parrilla-parados.png',
    descriptions:'Carne de Res,   pollo a la parrila,   Cerdo,   Chorizo,   Ensalada rayada,   Bollito y/o yuca,   Dips de Guasaca o tartara   y 1.5 Lts. de Gaseosa.',
    infoParrilla:'Recomendada para 2 personas.',
    categoria:4, 
});

let menuContainer;
let myBtn;
//Insertando listado de productos en CARD
function RenderProduct(productList) {
    for(product of productList){

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
        divParrParrilla.classList.add('box__menu__container-card-parr');
        const parrafoParrilla = document.createElement('p');
        parrafoParrilla.innerText = product.descriptions;

        divParrParrilla.appendChild(parrafoParrilla);

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
        strong.innerText = product.infoParrilla;
    
       
        infoParrilla.appendChild(strong);
    
        //Creando el precio    
        const priceDivParrilla =document.createElement('div');
        priceDivParrilla.classList.add('box__menu-container-price');
        const priceParrilla =document.createElement('p');
        priceParrilla.innerText='Precio: $' + product.price;  
        
        priceDivParrilla.appendChild(priceParrilla);

    
    
         
        //agregando todo al card
        boxMenu.appendChild(menuContainer);
        menuContainer.appendChild(containerTitle);
        menuContainer.appendChild(contentParrilla);
        menuContainer.appendChild(infoParrilla);    
        menuContainer.appendChild(priceDivParrilla);
       
        
        box.appendChild(boxMenu);
        main.appendChild(box)     

     }
    
}



let btnMenuContainer;
let carrito =[];
const DOMcarrito = document.querySelector('#carrito');
const divisa = '$';
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

function init() {

    RenderProduct(productList);
    mostrarMenu();
    botonera();    
   
  }; 



  // BUSCADOR


const formulario =document.querySelector('#formulario');
const btnBuscar = document.querySelector('#btnBuscar');
const resultado =document.querySelector('#resultado')

const filtrar = ()=> {
    // console.log(formulario.value);
    resultado.innerHTML = '';
    const texto = formulario.value.toLowerCase();
    for (let productoBuscar of productList){
        let nombreProducto = productoBuscar.name.toLowerCase();
        if(nombreProducto.indexOf (texto) !== -1){
            resultado.innerHTML +=  `
            <div class="box__menu__container border border-primary">
            <div class="box__menu__container-title">
              <h3>${productoBuscar.name}</h3>
            </div>
            <article class="box__menu__container-card">
              <div class="box__menu__container-card-parr">
                <p>${productoBuscar.descriptions}
                </p>            
              </div>
              <div class="box__menu__container-card-img"> 
              <img src="${productoBuscar.image}" alt="">
              </div>
            </article>
            <div class="box__menu__container-rec"><strong>${productoBuscar.infoParrilla}</strong></div>
            <div class="box__menu-container-price">
              <p>${productoBuscar.price}</p>
            </div>
          </div>`
            mostrarMenu();
        }
    }
    if(resultado.innerHTML ===''){
        resultado.innerHTML += `<h3>Producto no encontrado</h3>`
        
    }
}

btnBuscar.addEventListener('click', filtrar);
/* formulario.addEventListener('keyup',filtrar); */




  function mostrarMenu() {
    categorias.forEach((categoria) => {
        let menuContainer= document.getElementById('boxMenu')
        menuContainer.setAttribute("id", `${categoria.id}`);
        btnMenuContainer = document.createElement('div');
        btnMenuContainer.querySelector('.box__menu__container-btn');
        btnMenuContainer.setAttribute('id','menu-container');
         myBtn = document.createElement("button");
        myBtn.setAttribute('class', 'btn-menu btn btn-primary');
        myBtn.setAttribute('id','menu');
        myBtn.setAttribute('name','menu');
         myBtn.setAttribute("id", `${categoria.id}`);
        myBtn.innerHTML = categoria.nombre;
      //Add Event
      btnMenuContainer.appendChild(myBtn);
      menuContainer.appendChild(btnMenuContainer); 
   
    });
  }

//declarando variables 
    

   /*  function renederProductos(array) {
        menuContainer = document.getElementById("elementos");
        div.innerHTML = "";
        array.map((element) => {
          let id = element.id;
          let nombre = element.name;
          let precio = element.price;
          let stock = element.stock;
          let hayNoHay;
          if (stock > 0) {
            hayNoHay = `<div class="actions">
            <button class="add" id=${id}>add</button>
            </div>`;
          } else {
            hayNoHay = `<div class="actions">
            No Disponible!
            </div>`;
          }
          div.innerHTML += `
                <div class="item">
                    <div class="title">${nombre}</div>
                    <div class="price">${precio}</div>
                    <div class="qty">${stock} units</div>
                    ${hayNoHay}
                </div>`;
        }); */
      /*   agregarAlCarrito(); */
   /*    }
 */


let menuCarrito;
let offcanvas;
let boton;
let trigger;
let menuProductDetail;

let aside;


    function botonera() { 

            myBtn=document.getElementsByName('menu');
            offcanvas = document.querySelector('#menu-canvas');
            menuProductDetail = document.querySelector('.product-detail-close');
            offcanvas.appendChild(menuProductDetail);        
             
             
// menu canvas para btn closed
          
            box.appendChild(offcanvas)
            menuCarrito = document.createElement('div');
            menuCarrito.setAttribute('id','elementos')
            document.body.appendChild(menuCarrito);
            menuCarrito.getElementsByClassName('menu-canvas');
            let botones = document.getElementsByClassName('btn-menu btn btn-primary');
            

        //Recorriendo los botones de ver producto para el offcanvas
            for (const boton of botones) {
                
                boton.addEventListener('click',() =>{
                    myBtn=(toggleMenu());
                    menuCarrito.innerHTML=``; 
                    let category = categorias.find((item) => item.id == boton.id);
                    console.log(category.description);
                    menuCarrito.innerHTML =`<h2>${category.description}</h2>`;

                    let galeria = productList.filter(
                    (product) => product.categoria == boton.id
                    );
                     
                    MostrarProductos(galeria); 
                    main.disabled=true;
                                           
                }); 
           
            };
            menuProductDetail.addEventListener('click', toggleMenu);
            
     
    }

//menu
//menu canvas btn Agregar

//función para abrir y cerrar el menu canvas en las diferentes card

    function toggleMenu() {
        offcanvas.classList.toggle('menu-activo');
        console.log('click en menu agregar');
    }




    function MostrarProductos(array) {
        const div = document.querySelector('#elementos');
        div.innerHTML='';
        array.map((element) =>{
            let id = element.id;
            let name = element.name;
            let image = element.image;
            let descriptions= element.descriptions;
            let infoParrilla= element.infoParrilla;
            let price=element.price;
            menuCarrito.innerHTML += `
            <div class="item">
                <h2>${name}</h2>
                <div class="menu-canvas-element">
                    <img src=${image}>
                </div>
                <div class="product-info" id="product-info">
                    <p>${descriptions}</p>
                    <p>${infoParrilla}</p>
                    <P> Precio: $${price}</P>
                    <div class="cantidadProductos" id="cantidadProductos">
                        <button class='btn btn-secondary' id='disminuir' value='disminuir'>-
                        </button>
                        <input class="form-control row-6"  aria-label="Sizing example input"  type='text' id="cantidad" readonly='false'>
                        <button class='btn btn-secondary' id='aumentar' value='aumentar' mark="info.id">+
                        </button>
                    </div>      
                </div>
            </div>`;       
            incrementar()
        });
       
    } 

    //tomando el contenedor de cantidad
    let valor=0;
    let cantidad =1;  
    
    function incrementar() {
        
    
    const productInfo= document.querySelector('#product-info');      
    const cantidadProducto = document.querySelector('#cantidadProductos');
    //inicializando variables  


   
        const aumentarCantidadProducto = document.querySelector('#aumentar');
        aumentarCantidadProducto.addEventListener('click', agregar);
        aumentarCantidadProducto.addEventListener('click', anyadirProductoAlCarrito);

        const disminuirCantidadProducto = document.querySelector('#disminuir');
        disminuirCantidadProducto.addEventListener('click', disminuir); 
        disminuirCantidadProducto.addEventListener('click',eliminarProductoDelCarrito);


}


 //incrementa el valor del input de cantidad en el menu offcanvas
        function agregar() {
        
            cantidad = document.getElementById('cantidad'); 
           if (cantidad.value < 100){ 
               cantidad.value ++;  
    
            /*  //validando el tipo de dato
              console.log(typeof(valor)); */      
            }
            document.getElementById('cantidad').textContent = valor;
        };
      
//decrementa el input de cantidad en el menu offcanvas


   function disminuir() {
      
        cantidad = document.getElementById('cantidad') ;
        if (cantidad.value > 1){ 
            cantidad.value --; 
 
                console.log(`imprimiendo cantidad + ${cantidad}`)
        };  
        
    };
 




function anyadirProductoAlCarrito(agregar) {
    // Añadimos el Nodo a nuestro carrito
    
    // Actualizamos el carrito 
   
 carrito.push(agregar.target.getAttribute('marcador'));

        console.log('Agregado al carrito la cantidad');
  
};


function eliminarProductoDelCarrito(quitar) {
    carrito.pop(quitar.target.getAttribute('disminuir'));
    console.log('quitando del carrito');
};




init();

offcanvas.appendChild(menuCarrito)

