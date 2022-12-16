const clickButton = document.querySelectorAll('.button') 
const tbody = document.querySelector('.tbody') 
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];  
const productos = []
const URL = 'bbdd/productos.json'

clickButton.forEach(btn => {
    btn.addEventListener('click', agregarCarrito)
    totalCompra()
    renderCarrito() 
    }
)

function agregarCarrito(e){
    const button = e.target
    const producto = button.closest('.card')
    const productoTitle = producto.querySelector('.card-title').textContent;
    const productoPrecio = producto.querySelector('.precio').textContent;
    const productoImg = producto.querySelector('.card-img-top').src;
    
    const newProducto = {
        producto: productoTitle,
        precio: productoPrecio,
        img: productoImg,
        cantidad: 1
    }
    

    addProductoCarrito(newProducto) 
    renderCarrito()  
    localStorage.setItem('carrito', JSON.stringify(carrito));
    totalCompra()
}

function addProductoCarrito(newProducto){
    Toastify({
        text: "Agregaste "+newProducto.producto+" al carrito",
        className: "info",
        style: {
        background: "linear-gradient(to right, #1707ff, #83fbff)",
        }
    }).showToast();
    
    const productIndex = carrito.findIndex(item => item.producto === newProducto.producto);
    if (productIndex === -1){
        carrito.push(newProducto);
    }else{
        carrito[productIndex].cantidad++;
    }
    
    
    renderCarrito()  
    totalCompra()
}

function renderCarrito(){

    tbody.innerHTML = ''
    carrito.map( item => {

        const tr = document.createElement('tr')
        tr.classList.add('productoCarrito')
        const contenido = `
        <th scope = "row">1</th>
            <td class = "table__productos">
                <img src = ${item.img}>
                <h6 class = "title">${item.producto}</h6>
            </td>
            <td class = "table__precio"><p>${item.precio}</p></td>
            <td class = "table__cantidad">
                <input type="number" min="1" value=${item.cantidad} class="input__element">
                <button class="delete btn btn-danger" id "${item.id}">X</button>
            </td>
        `

        tr.innerHTML = contenido;
        tbody.append(tr) 

        tr.querySelector(".delete").addEventListener ('click', deleteProducto) 
    }) 

    totalCompra()
    
}

function totalCompra(){
    let total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$",''))
        total = total + (precio*item.cantidad)
    })
    itemCartTotal.innerHTML = `Total $ ${total}`
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


function deleteProducto(e){
    const deleteButton = e.target.querySelector("delete.btn.btn-danger")
    const i = carrito.findIndex(item => item.id === deleteButton)
    carrito.splice (i, 1);
    renderCarrito()
    totalCompra()
}
