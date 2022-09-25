const menuIcon = document.getElementById('menu-icon');
const closeMenu = document.getElementById('close-menu');
const menu = document.querySelector('.menu');

menuIcon.onclick = () => {
  menu.classList.add('active');
}

closeMenu.onclick = () => {
  menu.classList.remove('active');
}

let centerImage = document.querySelector('.center__image img');
let modalImage = document.querySelector('.modal__image img');

let modalList = document.querySelectorAll('.modal__item');
let modalListImages = document.querySelectorAll('.modal__item img');

let list = document.querySelectorAll('.list__item');
let listImages = document.querySelectorAll('.list__item img');

cambiarImagen = (e) => {
  let currentIndex = e.target.src.length - 15;
  let index = Number(e.target.src[currentIndex]);
  centerImage.setAttribute("src", `./assets/images/image-product-${index}.jpg`);
  modalImage.setAttribute("src", `./assets/images/image-product-${index}.jpg`);

  for (let i = 0; i < 4; i++) {
    list[i].classList.remove('images-select');
    modalList[i].classList.remove('images-select');
  }

  for (let i = 0; i < 4; i++) {
    if (listImages[i].getAttribute('src').includes(index)) {
      list[i].classList.add('images-select');
      modalList[i].classList.add('images-select');
    }
  }
}

recorrerGaleria = (e) => {
  const src = modalImage.getAttribute("src");

  if (e.target.classList.contains("arrow-left")) {
    let currentIndex = src.length - 5;
    currentIndex = Number(src[currentIndex]);
    let newIndex = currentIndex - 1;

    for (let i = 0; i < 4; i++) {
      list[i].classList.remove('images-select');
      modalList[i].classList.remove('images-select');
    }

    if (newIndex == 0) newIndex = 4;
    modalImage.setAttribute("src", `./assets/images/image-product-${newIndex}.jpg`);

    for (let i = 0; i < 4; i++) {
      if (modalListImages[i].getAttribute('src').includes(newIndex)) {
        list[i].classList.add('images-select');
        modalList[i].classList.add('images-select');
      }
    }
  } else {
    let currentIndex = src.length - 5;
    currentIndex = Number(src[currentIndex]);
    let newIndex = currentIndex + 1;

    for (let i = 0; i < 4; i++) {
      list[i].classList.remove('images-select');
      modalList[i].classList.remove('images-select');
    }

    if (newIndex == 5) newIndex = 1;
    modalImage.setAttribute("src", `./assets/images/image-product-${newIndex}.jpg`);

    for (let i = 0; i < 4; i++) {
      if (modalListImages[i].getAttribute('src').includes(newIndex)) {
        list[i].classList.add('images-select');
        modalList[i].classList.add('images-select');
      }
    }
  }
};

document.addEventListener("click", (e) => {
  if (e.target.matches(".arrow")) recorrerGaleria(e);
  
  if (e.target.matches(".list__item img")) cambiarImagen(e);

  if (e.target.matches(".modal__item img")) cambiarImagen(e);
});

const cartPrice = document.getElementById('cart-price');
const cartCantidad = document.getElementById('cart-cantidad');
const cartTotal = document.getElementById('cart-total');
let price = 125.00;
cartPrice.innerText = `$ ${price}`;
let cantidad = 0;
const currentAmount = document.getElementById('currentAmount');
currentAmount.innerText = cantidad;
const cartEmpty = document.getElementById('cart-empty');
const cartContent = document.getElementById('cart-content');
const cartIcon = document.getElementById('cart-icon');
const cart = document.getElementById('cart');
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const btnAdd = document.getElementById('btn-add');


plus.addEventListener('click', () => {
  cantidad++;
  minus.disabled = false;
  currentAmount.innerText = cantidad;
});

minus.addEventListener('click', () => {
  cantidad--

  if (cantidad < 0) {
    cantidad = 0;
  } else if(cantidad == 0) {
    document.getElementById('header-cantidad').style.display = "none";
    currentAmount.innerText = cantidad;
    minus.disabled = true;
  }
  else if (cantidad > 0) {
    currentAmount.innerText = cantidad;
  }
});

const showCart = () => {
  if(cantidad <= 0) {
    document.getElementById('header-cantidad').style.display = "none";
    cartContent.style.display = "none";
    cartEmpty.style.display = "flex";
  } else if (cantidad > 0) {
    cartEmpty.style.display = "none";
    cartContent.style.display = "flex";
  }
}

cartIcon.addEventListener('click', () => {
  cart.classList.toggle('show-cart');
});

btnAdd.addEventListener('click', () => {
  document.getElementById('header-cantidad').innerText = cantidad;
  document.getElementById('header-cantidad').style.display = "flex";
  cartCantidad.innerText = `x ${cantidad}`;
  let total = price * cantidad;
  cartTotal.innerHTML = `$ ${total}`;
  showCart();
});

document.getElementById('icon-delete').addEventListener('click', () => {
  cantidad = 0;
  currentAmount.innerText = cantidad;
  showCart();
});

document.getElementById('center-image').addEventListener('click', () => {
  document.getElementById('modal').classList.add('show-modal');
});

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal').classList.remove('show-modal');
});