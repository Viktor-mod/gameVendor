// Custom Scripts
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
