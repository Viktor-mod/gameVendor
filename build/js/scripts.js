// Custom Scripts
'use sctrict'

//Authorization
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const email = document.getElementById('email');
const password = document.getElementById('password');
const checkbox = document.getElementById('checkbox-input')
const btn = document.getElementById('btn');
const titleMail = document.getElementById('title-mail')
const titlePassword = document.getElementById('title-password')
const errorEmail = document.querySelector('.error-email');
const errorPassword = document.querySelector('.error-password');
const errorCheckbox = document.querySelector('.error-checkbox');
const errorEmailValid = document.querySelector('.error-email__valid');
const errorPasswordLength = document.querySelector('.error-password__length'); 

btn.addEventListener('click', (e) => {
    e.preventDefault()

    if (email.value == 0) {
        errorEmail.style.display = 'block';
        errorEmailValid.style.display = 'none';
        email.classList.add('input-email__error');
        titleMail.classList.add('title-mail__error');
    } else if (!validateEmail(email.value)) {
        errorEmailValid.style.display = 'block';
        errorEmail.style.display = 'none';
        email.classList.add('input-email__error');
        titleMail.classList.add('title-mail__error');
    } else if (validateEmail(email.value) && email.value !==0) {
        errorEmailValid.style.display = 'none';
        errorEmail.style.display = 'none';
        email.classList.remove('input-email__error');
        titleMail.classList.remove('title-mail__error');
    }

    if (password.value.trim().length < 1) {
        errorPassword.style.display = 'block';
        errorPasswordLength.style.display = 'none';
        password.classList.add('input-password__error')
        titlePassword.classList.add('title-password_error')
    } else if (password.value.trim().length < 8) {
        errorPasswordLength.style.display = 'block';
        errorPassword.style.display = 'none';
        password.classList.add('input-password__error');
        titlePassword.classList.add('title-password__error');
    } else {
        errorPassword.style.display = 'none';
        errorPasswordLength.style.display = 'none';
        password.classList.remove('input-password__error');
        titlePassword.classList.remove('title-password__error');
    }

    if (!checkbox.checked) {
        errorCheckbox.style.display = 'block';
    } else if (checkbox.checked) {
        errorCheckbox.style.display = 'none';
    }

    if (!checkbox.checked) {
        errorCheckbox.style.display = 'block'
    } else if (checkbox.checked) {
        errorCheckbox.style.display = 'none'
    }

    let obj = {}

    if (validateEmail(email.value) && (checkbox.checked) && password.value.length >= 8) {
        console.log(obj);
        obj.email = email.value;
        obj.password = password.value;
    }
})

// Select
const customSelect = document.querySelectorAll ('.custom-select');

customSelect.forEach(el => {
    el.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('custom-select--open');

        if(e.target.classList.contains('custom-select__item')) {
            let text = e.target.textContent;
            e.currentTarget.querySelector('.custom-select__top').textContent = text;
        }
    });
});

// Accordion
function accordion() {
    const items = document.querySelectorAll('.accordion__item-trigger')
    items.forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentNode
            if (parent.classList.contains('accordion__item-active')) {
                parent.classList.remove('accordion__item-active')
            } else {
                document
                    .querySelectorAll('.accordion__item')
                    .forEach(child => child.classList.remove('accordion__item-active'))   
                parent.classList.add('accordion__item-active')
            }
        })
    })
}
accordion()

//Scroll
var hiddenElement = document.getElementById("search");
var btn = document.querySelector('.icon-search');

function handleButtonClick() {
   hiddenElement.scrollIntoView({block: "start", behavior: "smooth"});
}

btn.addEventListener('click', handleButtonClick)

//Products Card
const products = document.querySelector('.products');

const fetchProducts = (quantity = 15) => {
    fetch('../js/products.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            if (i < quantity) {
                products.innerHTML += `
                <div class="products-card">
                    <img class="products-card__img" src="${data[i].image}" alt="img">
                    <div class="products-card__info">
                        <div class="info-details">
                            <div class="info-details__badge ${data[i].badge}">
                                <span class="badge-name ${data[i].badge__style}">
                                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="3" cy="3" r="3" fill="#7F56D9"/>
                                    </svg>
                                    ${data[i].badge__name}
                                </span>
                            </div>
                            <h3 class="info-details__title">
                                <a href="#">
                                    ${data[i].title}
                                </a>
                            </h3>
                            <div class="info-details__rating">
                                <div class="rating-stars">
                                    <img src="${data[i].stars}" alt="">
                                </div>
                                <span class="rating-votes">${data[i].votes}</span>
                            </div>
                            <p class="info-details__description">${data[i].description}</p>
                        </div>
                        <div class="divider"></div>
                        <div class="info-price ${data[i].invisible__price}">
                            <div class="price">
                                <span class="price__old ${data[i].price__none}"><s>${data[i].price__old}</s></span>
                                <span class="price__new">${data[i].price__new}</span>
                            </div>
                            <div class="sale ${data[i].sale}">-50%</div>
                        </div>
                    </div>
                </div>
                `;
            }
        }
    });
};
fetchProducts();
