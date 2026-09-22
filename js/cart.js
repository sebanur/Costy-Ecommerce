import { getFromLocale, saveToLocal  } from "./helper.js";
import { renderCartItems, renderCartQuantity, renderNotFound, renderCartTotal } from "./ui.js";


const CART = "cart1"

let cart = getFromLocale(CART)

const addToCart = (e, products) => {
    const productId = +e.target.dataset.id

    const foundProduct = products.find((pro) => pro.id === productId)

    const existingProduct = cart.find((item)=> item.id === productId)

    if (existingProduct) {
        existingProduct.quantity++
        
    } else {
        const cartItem = {
            ...foundProduct,
            quantity: 1
        }
        cart.push(cartItem)
    }

    //locale kaydet
    saveToLocal(CART, cart)
    e.target.textContent = "Eklendi"
    setTimeout(() => {
        e.target.textContent = "Ekle"
    }, 1000);
    
    renderCartQuantity(cart)
}

//local den sil
const removeFromCart = (e) => {
    const response = confirm("emin misin?")

    if (response) {
        const productId = Number(e.target.dataset.id)

        cart = cart.filter((item) => item.id !== productId)

        saveToLocal(CART, cart)

        renderCartTotal(cart)

        renderCartQuantity(cart)

        if (cart.length > 0) {
            renderCartItems(cart)
        } else {
            renderNotFound()
        }
    }
}

//sepeketteki ilgili urunun miktarini guncelle
const onQuantityChange = (e) => {

    const productId = parseInt(e.target.dataset.id)

    const newQuantity = parseInt(e.target.value)

    if (newQuantity > 0) {
        const updateItem = cart.find((item) => item.id === productId)
        updateItem.quantity = newQuantity

        saveToLocal(CART, cart)

        //cart toplami guncelle
        renderCartTotal(cart)

        renderCartQuantity(cart)
        
    } else {
        alert("0 dan buyuk olmali")
        return
    }
}


export {addToCart, removeFromCart, onQuantityChange}