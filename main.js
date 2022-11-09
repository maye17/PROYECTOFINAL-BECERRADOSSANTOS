

const main = document.querySelector('main')
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
                <p>${productoBuscar.description}
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
                           

        }
    }
    if(resultado.innerHTML ===''){
        resultado.innerHTML += `<h3>Producto no encontrado</h3>`
        
    }
}

btnBuscar.addEventListener('click', filtrar);
formulario.addEventListener('keyup',filtrar)


//DESTACADOS

const boxs = document.querySelector('.boxs','.container-fluid','.scrollDestacados')
const destacadosList =[];
destacadosList.push ({
    name:'Parrilla Super Junquito',
    price:5500,
    image:'./assets/parrilla.jpeg',
});
destacadosList.push ({
    name:'Cachapa con Parrilla',
    price:1800,
    image:'./assets/cachapa-con-parrilla.jpg',
});

destacadosList.push ({
    name:'Bife de Chorizo',
    price:2500,
    image:'./assets//bife-de-chorizo-con-papas.jpg',
});

destacadosList.push ({
    name:'Churrasco de Res',
    price:5500,
    image:'./assets/churrasco4.jpg',
});

destacadosList.push ({
    name:'Brochetas de Cerdo',
    price:5500,
    image:'./assets//brochetas de cerdo.jpg',
});


function ProductDestacados(ListaDestacados) {
    for (destacado of ListaDestacados){
        const boxsDestacados = document.createElement('div');
        boxsDestacados.classList.add('boxs__card');
        const imgDestacados = document.createElement('img');
        imgDestacados.setAttribute('src', destacado.image);
        
        const firtsTitleDestacados = document.createElement('h2');
        firtsTitleDestacados.innerText = destacado.name;
        const parrafoDestacados = document.createElement('p');
        parrafoDestacados.innerText = 'Precio $' + destacado.price;
        
        //button
        //Creando btn
/*         const btnAgregar = document.createElement('button');
        btnAgregar.classList.add('btn','btn-primary');
        btnAgregar.innerText ='Agregar Destacado'; */

       
        
        boxsDestacados.appendChild(imgDestacados);
        boxsDestacados.appendChild(firtsTitleDestacados);
        boxsDestacados.appendChild(parrafoDestacados);
        /* boxsDestacados.appendChild(btnDestacado); */
        boxs.appendChild(boxsDestacados);
        main.appendChild(boxs);
        /* boxsDestacados.appendChild(btnAgregar);  */
     
    };
}


ProductDestacados(destacadosList);

const box = document.querySelector('.box')
const boxMenu = document.querySelector('.box__menu')
//PARRILLAS
const productList =[]
productList.push ({
    name:'Parrilla Super Junquito',
    price:5500,
    image:'./assets/parrilla.jpeg',
    description:'carne de Res, &nbsp; pollo a la parrila, Cerdo, Chorizo, Ensalada rayada, Porcón de papas fritas, Dips de Guasaca o tartara.',
    infoParrilla:'Recomendada para 3 y/o 4 personas.'
});
productList.push ({
    name:'Parrilla Mar y Tierra',
    price:3500,
    image:'./assets/parrilla-frutosdelmar.jpg',
    description:'Calamares,  Camarones,  Rabas,   Mejillones,   Ensalada rayada,   Bollito y/o yuca,   Dips de Guasaca o tartara   y 500ml. de Gaseosa.',
    infoParrilla:'Recomendada para 1 personas.'
  
});
productList.push ({
    name:'Parrilla Kids',
    price:1800,
    image:'./assets/parrilla-kids.jpg',
    description:'Carne de Res,   pollo a la parrila,   Cerdo,   Chorizo,   Ensalada rayada,   Porcón de papas fritas,   Dips de Guasaca o tartara.',
    infoParrilla:'Recomendada para niños.'
  
});
productList.push ({
    name:'Parrilla para Dos',
    price:3600,
    image:'./assets/parrilla-parados.png',
    description:'Carne de Res,   pollo a la parrila,   Cerdo,   Chorizo,   Ensalada rayada,   Bollito y/o yuca,   Dips de Guasaca o tartara   y 1.5 Lts. de Gaseosa.',
    infoParrilla:'Recomendada para 2 personas.'
});

//insertar al html
function RenderProduct(ListadoProductos) {
    for(product of ListadoProductos){

        const menuContainer = document.createElement('div');
        menuContainer.classList.add('box__menu__container','border','border-primary');
    
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
        parrafoParrilla.innerText = product.description;

        //imagen
        const divImgParrilla = document.createElement('div');
        divImgParrilla.classList.add('box__menu__container-card-img')
        const imgParrilla = document.createElement('img');
        imgParrilla.setAttribute('src',product.image);
    
        
       
        divParrParrilla.appendChild(parrafoParrilla);
        divImgParrilla.appendChild(imgParrilla);     

        contentParrilla.appendChild(divParrParrilla);
        contentParrilla.appendChild(divImgParrilla);
    
    //creando div de recomendación
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
    
        //Creando btn
        const Agregar = document.createElement('div');
        const DivAgregar =document.querySelector('.box__menu__container-btn');
        const trigger =document.querySelector('#menu');
        trigger.addEventListener('click', toggleMenu);
        const offcanvas = document.querySelector('#menu-canvas');


        DivAgregar.appendChild(offcanvas);
        DivAgregar.appendChild(trigger);
        
        //agregando todo al card
        boxMenu.appendChild(menuContainer);
        menuContainer.appendChild(containerTitle);
        menuContainer.appendChild(contentParrilla);
        menuContainer.appendChild(infoParrilla);    
        menuContainer.appendChild(priceDivParrilla);  
        menuContainer.appendChild(DivAgregar);  
        menuContainer.appendChild(Agregar);    
        
        box.appendChild(boxMenu);
        main.appendChild(box)

    }
    
}

RenderProduct(productList);




//menu canvas btn Agregar
const trigger =document.querySelector('#menu');
const offcanvas = document.querySelector('#menu-canvas');
const menuProductDetail = document.querySelector('.product-detail-close');


function toggleMenu() {
    offcanvas.classList.toggle('menu-activo');
    console.log('click en menu agregar');
}

// menu canvas para btn closed
menuProductDetail.addEventListener('click',toggleMenuProductDetail)
trigger.addEventListener('click', toggleMenu);


function toggleMenuProductDetail() {
    offcanvas.classList.toggle('menu-activo');
    console.log('click en menu agregar');
}


//Aumentar y disminuir cantidad

const agregarCarro = document.querySelector('#aumentar');
agregarCarro.addEventListener('click', agregar);

const quitarCarro = document.getElementById('disminuir');
quitarCarro.addEventListener('click', disminuir); 

//definiendo valor inicial
 let valor=0;
  let cantidad;  

function agregar() {
    
    cantidad = document.getElementById('cantidad'); 
    if (cantidad.value < 100){ 
        cantidad.value ++;
        
   }
   

   document.getElementById('cantidad').textContent = valor;
   console.log('click agregando al carrito');

   };


   function disminuir() {

        cantidad = document.getElementById('cantidad'); 
        if (cantidad.value > 01){ 
            cantidad.value --; 

        }
        console.log('click quitando del carrito');
   }
 
//variables precio


