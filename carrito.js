let prods_contenedor = document.getElementById('productos_div');
let container_carrito = document.getElementById('container_carrito');
let comprar_vaciar_carrito = document.getElementById('comprar');
let contador_carrito = document.getElementById('contador');
let cantidad = document.getElementById('cantidad');
let total = document.getElementById('total');

let cont_modal = document.getElementsByClassName('container_modal')[0];
let btn_abrir = document.getElementById('carrito_btn');
let btn_cerrar = document.getElementById('carrito_cerrar');
let carrito_modal = document.getElementsByClassName('carrito_modal')[0];

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizar_carrito();
    }
});



btn_abrir.addEventListener('click', ()=>{
    cont_modal.classList.toggle('modal-active');
});


btn_cerrar.addEventListener('click', ()=>{
    cont_modal.classList.toggle('modal-active');
});


cont_modal.addEventListener('click', (event) =>{
    cont_modal.classList.toggle('modal-active');
});

carrito_modal.addEventListener('click', (event) => {
    event.stopPropagation();
});



comprar_vaciar_carrito.addEventListener('click', () => {
    
    if (carrito.length === 0){
        Swal.fire({
            title: "Oops...",
            text: "seleccione una carta para realizar un pedido valido",
            confirmButtonColor: "#ff0000",
        });
    }

    else {
        Swal.fire({
            title: "COMPRA REALIZADA",
            text: "Segui sumando cartas a tu coleccion",
            confirmButtonColor: "#628601",
        });
        
    }
    localStorage.removeItem('carrito');
    carrito.length = 0;
    actualizar_carrito();
});





let agregar_carrito = (prodId) => {
    let existe = carrito.some (prod => prod.id === prodId);

    if (existe){ 
        let prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++;
            }
        });
    } else { 
        let item = stock_prods.find((prod) => prod.id === prodId);
        carrito.push(item);
    }

    Toastify({
        text: "Producto agregado",
        duration: 800,
        style: {
            background: "#75A634",
            color: "white",
            fontFamily: "serif"
        }
        
        }).showToast();
    
    actualizar_carrito(); 
}


let quitar_producto = (prodId) => {
    let item = carrito.find((prod) => prod.id === prodId);
    let indice = carrito.indexOf(item);
    carrito.splice(indice, 1); 
    actualizar_carrito();

}


let actualizar_carrito = () => {
    container_carrito.innerHTML = "";
  

    carrito.forEach((prod) => {
        let div = document.createElement('div');
        div.className = ('prods_seleccionados');
        div.innerHTML = `
        <img style="width: 10%;" src="${prod.img}">
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="quitar_producto(${prod.id})" class="btn_eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        container_carrito.appendChild(div);
        
        localStorage.setItem('carrito', JSON.stringify(carrito));

    });
    

    contador_carrito.innerText = carrito.length;


    total.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);

};

