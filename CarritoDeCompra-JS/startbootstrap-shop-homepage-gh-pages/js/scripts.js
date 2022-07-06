let stockProductos = [
    {id: 1, nombre: "producto 1",talle : "Large", tipo: "remeras", cantidad: 1, precio: 1200,img: '/startbootstrap-shop-homepage-gh-pages/assets/img/remera.jpg' },
    {id: 2, nombre: "producto 2",talle : "Small", tipo: "buzo", cantidad: 1, precio: 1100 ,img: '/startbootstrap-shop-homepage-gh-pages/assets/img/buzo.jpg' },
    {id: 3, nombre: "producto 3",talle : "Medium", tipo: "camperas", cantidad: 1, precio: 1200,img: '/startbootstrap-shop-homepage-gh-pages/assets/img/campera.jpg'}]

    const contenedorProductos = document.getElementById('contenedor-productos')
    const contenedorCarrito = document.getElementById('carrito-contenedor')
    const botonVaciar = document.getElementById('vaciar-carrito')
    const contadorCarrito = document.getElementById('contadorCarrito')//modifico el contador del carrito
    const cantidad = document.getElementById('cantidad')
    const precioTotal = document.getElementById('precioTotal')
    const cantidadTotal = document.getElementById('cantidadTotal')
    
    let carrito = []
    
    document.addEventListener('DOMContentLoaded', () => {
        if (localStorage.getItem('carrito')){
            carrito = JSON.parse(localStorage.getItem('carrito'))
            actualizarCarrito()
        }
    })

    botonVaciar.addEventListener('click', () => {
        carrito.length = 0
        actualizarCarrito()
    })
    //ingreso las cards de los productos
    stockProductos.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
        <img src=${producto.img} alt= "">
        <h3>${producto.nombre}</h3>
        <p>Talle: ${producto.talle}</p>
        <p class="precioProducto">Precio:$ ${producto.precio}</p>
        <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
        `
        contenedorProductos.appendChild(div)
    

        const boton = document.getElementById(`agregar${producto.id}`)
        boton.addEventListener('click', () => {
            //esta funcion agrega el carrito con la id del producto
            agregarAlCarrito(producto.id)
            //
        })
    })
    

    const agregarAlCarrito = (prodId) => {
    
        //aumento cantidad para que no se repita
        const existe = carrito.some (prod => prod.id === prodId) //veo si ya existe mi producto en el carrito
    
        if (existe){ //si ya esta lo actualizo
            const prod = carrito.map (prod => { //creamos un nuevo arreglo y busco y cuando
                // map encuentre cual es el q igual al que está agregado, le suma la cantidad
                if (prod.id === prodId){
                    prod.cantidad++
                }
            })
        } else {
            const item = stockProductos.find((prod) => prod.id === prodId)
            //obtengo el id y hago un push para agregarlo al carrito
            carrito.push(item)
        }

        actualizarCarrito()  
    }

    const eliminarDelCarrito = (prodId) => {
        const item = carrito.find((prod) => prod.id === prodId)
    
        const indice = carrito.indexOf(item)
    
        carrito.splice(indice, 1) 

        actualizarCarrito() 

        console.log(carrito)
    }
    
    const actualizarCarrito = () => {
        contenedorCarrito.innerHTML = "" 
        

    //Popup
        carrito.forEach((prod) => {
            const div = document.createElement('div')
            div.className = ('productoEnCarrito')
            div.innerHTML = `
            <p>${prod.nombre}</p>
            <p>Precio:$${prod.precio}</p>
            <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
            <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
            `
    
            contenedorCarrito.appendChild(div)
            
            localStorage.setItem('carrito', JSON.stringify(carrito))
    
        })

        contadorCarrito.innerText = carrito.length
        console.log(carrito)
        precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    
    }



const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 

})