let cartItems = document.querySelector('.cart-items')
let allProducts = [
    { id: 1, title: 'Lingam massage one day course', price: 150, text:'/person', img: '/img/image 4.jpg' ,count:1},
    { id: 2, title: 'Lingam massage for two days with a live performance session', price: 350, img: 'img/image 4.jpg'    ,count:1},
    { id: 3, title: 'Tantra course 3 weeks', price: 500, img: 'img/image 4.jpg'    ,count:1},
    { id: 4, title: 'Nuru massage one day course', price: 200, img: 'img/image 4.jpg' ,count:1},
    { id: 5, title: 'Couple massage 3 hrs workshop', price: 165, img: 'img/image 4.jpg',count:1},
    { id: 6, title: 'Bridal shower surprise, tantra and lingam workshop, for 3 hrs', price: 300, img: 'img/image 4.jpg',count:1},
    { id: 7, title: '4 in 1 - Tantra, Nuru, lingam and prostate massage 4 weeks course (with a live performance on the last day of the course)', price: 1200, img: 'img/image 4.jpg',count:1},
]
let bascketProducts = []
let $ = document
const shopItemsContainer = $.querySelector('.shop-items')
let cartTotalPrice = document.querySelector('.cart-total-price')

allProducts.forEach(function (product) {
    let productContainer = $.createElement('div')
    productContainer.classList.add('shop-item')

    let productTitleSpan = $.createElement('span')
    productTitleSpan.classList.add('shop-item-title')
    productTitleSpan.innerHTML = product.title

    let productImageElem = $.createElement('img')
    productImageElem.classList.add('shop-item-image')
    productImageElem.setAttribute('src', product.img)

    let productDetailsContainer = $.createElement('div')
    productDetailsContainer.classList.add('shop-item-details')

    let productPriceSpan = $.createElement('span')
    productPriceSpan.innerHTML = product.price
    productPriceSpan.classList.add('shop-item-price')

    let productPriceText = $.createElement('text')
    productPriceText.innerHTML = product.text
    productPriceText.classList.add('shop-item-text')

    let prodcutAddButton = $.createElement('button')
    prodcutAddButton.innerHTML = 'ADD TO CART'
    prodcutAddButton.className = 'btn btn-primary shop-item-button'
    prodcutAddButton.addEventListener('click',function(){
        addProductToArray(product.id,bascketProducts)
    })


    productDetailsContainer.append(productPriceSpan, productPriceText, prodcutAddButton)

    productContainer.append(productTitleSpan, productImageElem, productDetailsContainer)

    shopItemsContainer.append(productContainer)



})
function addProductToArray(productId,bascketProducts){
    var findProduct = allProducts.find(function(product){
        return product.id === productId
    })
    if(bascketProducts.includes(findProduct) ){
        ++findProduct.count
        
    }else{
        bascketProducts.push(findProduct)
    }
    
    showBascket(bascketProducts)
    setLocalStorage(bascketProducts)
    
    
}
function showBascket(bascketProducts){
   // console.log(bascketProducts)
    cartItems.innerHTML = ''
    bascketProducts.forEach(function(product){
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')

    let cartItem = document.createElement('div')
    cartItem.className = 'cart-item cart-column'

    let image = document.createElement('img')
    image.className = 'cart-item-image'
    image.src = product.img
    image.height = '100'
    image.width = '100'

    let cartTitle = document.createElement('span')
    cartTitle.className = 'cart-item-title'
    cartTitle.innerText = product.title

    let cartPrice = document.createElement('span')
    cartPrice.className = 'cart-price cart-column'
    cartPrice.innerText = product.price   

    let cartQuantity = document.createElement('div')
    cartQuantity.className = 'cart-quantity cart-column'

    let inputElem = document.createElement('input')
    inputElem.className = 'cart-quantity-input'
    inputElem.value = product.count
    inputElem.type = 'number'
    
    inputElem.addEventListener('change',function(){
        changeValue(product.id,inputElem.value)
        setLocalStorage(bascketProducts)
    })

    let btnRemove = document.createElement('button')
    btnRemove.className = 'btn btn-danger'
    btnRemove.type = 'button'
    btnRemove.innerText = 'REMOVE'


    btnRemove.addEventListener('click',function(){
        removeFromBascket(product.id,product)
        
    })

    cartItem.append(image,cartTitle)
    cartQuantity.append(inputElem,btnRemove)
    cartRow.append(cartItem,cartPrice,cartQuantity)
    cartItems.append(cartRow)    

    })
    showTotalPrice(bascketProducts)
    setLocalStorage(bascketProducts)
    //bascketProducts = []
}
function removeFromBascket(productId,product){
    
    bascketProducts = bascketProducts.filter(function(product){
    return productId !== product.id 
    
    })
    
    showBascket(bascketProducts)
    showTotalPrice(bascketProducts)
    product.count = 1
    
}
function showTotalPrice(bascketProducts){

    let totalPrice = 0
    if (bascketProducts.length == 0){
        cartTotalPrice.innerText = '0$'
    }
    bascketProducts.forEach(function(product){
         totalPrice +=product.price * product.count
         cartTotalPrice.innerText = totalPrice
    })
    

}
function changeValue(productId,newCount){
    bascketProducts.forEach(function(product){
        if(productId == product.id){
            product.count = newCount
        }
    })
    showTotalPrice(bascketProducts)
}
function setLocalStorage(bascketProducts){
    localStorage.setItem('Basckets',JSON.stringify(bascketProducts))
    bascketProducts = JSON.parse(localStorage.getItem('Basckets'))
}
window.addEventListener('load',function(){
    if (JSON.parse(localStorage.getItem('Basckets'))){
        bascketProducts = JSON.parse(localStorage.getItem('Basckets'))
        showBascket(bascketProducts)
    }else{
        bascketProducts = []
    }
})
    
        
    











