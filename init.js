
const URL = '/productos.json'
const productos = []
const container = document.getElementById("container")
async function cargarDatos() {
    try {
        const response = await fetch(URL)
        const data = await response.json()
            if (data.length > 0) {
                productos.push(...data)
                cargarProductos(productos)
            }
    } catch (error) {
        console.error(error)
        container.innerHTML = retornoError()
    }
}
cargarDatos()


function cargarProductos(array) {
    let contenido = ""
        if (array.length > 0) {
            array.forEach(producto => {
                contenido += retornoCard(producto);      
            })
            container.innerHTML = contenido
            array.forEach(prod => {
                console.log(document.getElementById(`agregar${prod.id}`));   
                let boton = document.getElementById(`agregar${prod.id}`);
                boton.addEventListener('click', () => {
                    agregar_carrito(prod.id);  
                });
            })
        }
}


function retornoCard({id, img, nombre, precio}) {
    return `
    <div class="producto">
    <img src=${img} alt= "">
    <div class="cantainer_card">
    <h3>${nombre}</h3>
    <p class="precio_prod">$${precio}</p>
    <button id="agregar${id}" class="boton_agregar">Agregar</button>
    </div></div>`
}
function botones (){
    const botones = document.querySelectorAll("button.button.button-outline.button-add")
    botonesAdd.forEach(btn => {
        btn.addEventListener("click", ()=> {
            let resultado = productos.find(prod => prod.id === parseInt(btn.id))
                carrito.push(resultado)
                localStorage.setItem("miCarrito", JSON.stringify(carrito))
                toast(`'${resultado.nombre}' se agregó al carrito`, 'green')
        })
    })
}