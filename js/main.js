import { uiElement, renderProduct, renderCartQuantity , renderNotFound, renderCartItems, renderCartTotal} from "./ui.js";
import { getFromLocale } from "./helper.js";
import fetchProduct from "./api.js";
import { addToCart } from "./cart.js";

const CART = "cart1"

document.addEventListener("DOMContentLoaded", async()=>{

    uiElement.menuBtn.addEventListener("click",()=>{
        uiElement.nav.classList.toggle("open")
    })

    //local storage dan var sa al
    let cart = getFromLocale(CART)

    renderCartQuantity(cart)


    if (window.location.pathname.includes("/index.html")) {
        
        const products = await fetchProduct()

        renderProduct(products,(e)=>{
            console.log(e)

            addToCart(e, products)
        })
    } else {

        if (cart.length > 0) {
            renderCartItems(cart)
            
            renderCartTotal(cart)
        } else {
            renderNotFound()
        }
    }
})