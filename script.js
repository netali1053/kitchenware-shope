const items = [{
        title: "Блюдо для торта с крышкой Bossa Nova 32 см",
        description: "Высота крышки: 18,5 см. Диаметр крышки: 30,2 см. Высота блюда: 7 см. Диаметр блюда: 32 см. Материал: хрусталь.",
        tags: ["Популярный"],
        price: 450,
        img: "./img/1-picture.jpg",
        rating: 5,
    },
    {
        title: "Набор посуды Fortune, 3 предмета",
        description: "В наборе: 1 чашка 150 мл, 1 блюдце, 1 салатная тарелка 20,8 см. Материал: фарфор.",
        tags: ["Новинка", "Популярный"],
        price: 504,
        img: "./img/2-picture.jpg",
        rating: 4.8,
    },
    {
        title: "Набор мельниц электрических для соли и перца Line u'Select 15 cм, 2 шт",
        description: "Материал: нержавеющая сталь. На механизм Peugeot действует пожизненная гарантия.",
        tags: ["Премиум"],
        price: 576,
        img: "./img/3-picture.jpg",
        rating: 5.0,
    },
    {
        title: "Форма для запекания прямоугольная Appolia 22х36 см, зеленая",
        description: "Материал: керамика, объем: 3800 мл.",
        tags: [],
        price: 277,
        img: "./img/4-picture.jpg",
        rating: 4.7,
    },
    {
        title: "Салатник Boston 17 см",
        description: "Диаметр: 17, материал: хрусталь.",
        tags: [],
        price: 124,
        img: "./img/5-picture.jpg",
        rating: 4.2,
    },
    {
        title: "Кувшин Bossa Nova 1,19 л",
        description: "Материал: хрусталь.",
        tags: [],
        price: 153,
        img: "./img/6-picture.jpg",
        rating: 3.2,
    },
    {
        title: "Кружка Versace Barocco Haze 300 мл, черная",
        description: "Материал: фарфор.",
        tags: ["Премиум", "Популярный"],
        price: 480,
        img: "./img/7-picture.jpg",
        rating: 4.3,
    },
    {
        title: "Блюдо «Вогнутый листок» 26х25х8,5 см",
        description: "Материал: фаянс.",
        tags: ["Популярный"],
        price: 235,
        img: "./img/8-picture.jpg",
        rating: 4.1,
    },
    {
        title: "Щипцы сервировочные «Ракушки» Marina 25 см",
        description: "Материал: нержавеющая сталь.",
        tags: [],
        price: 173,
        img: "./img/9-picture.jpg",
        rating: 4.8,
    },
    {
        title: "Тарелка салатная Oro E Argento Oro 22 см",
        description: "Материал: фарфор.",
        tags: ["Новинка"],
        price: 106,
        img: "./img/10-picture.jpg",
        rating: 3.2,
    },
    {
        title: "Ваза Fast Cameo 30 см",
        description: "Материал: фарфор.",
        tags: [],
        price: 1430,
        img: "./img/11-picture.jpg",
        rating: 3.7,
    },
    {
        title: "Салатник Bicos Clear 22 см",
        description: "Материал: стекло.",
        tags: [],
        price: 318,
        img: "./img/12-picture.jpg",
        rating: 4.1,
    },
];

const itemsContainer = document.querySelector('#shop-items');
const itemTemplate = document.querySelector('#item-template');
const nothingFound = document.querySelector('#nothing-found');

let currentState = [...items];

function getItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";

    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });

    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }

    if (a.title < b.title) {
        return -1;
    }

    return 0;
}

getItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {
    const { title, description, tags, price, img, rating } = shopItem;

    const item = itemTemplate.content.cloneNode(true);

    item.querySelector('h1').textContent = title;
    item.querySelector('p').textContent = description;
    item.querySelector('.price').textContent = `${price}Р`;
    item.querySelector('img').src = img;

    const tagsHolder = item.querySelector('.tags');

    tags.forEach((tag) => {
        const element = document.createElement('span');
        element.textContent = tag;
        element.classList.add('tag');
        tagsHolder.append(element);
    });

    const ratingContainer = item.querySelector('.rating');

    for (let i = 0; i < rating; i++) {
        const star = document.createElement('i');
        star.classList.add('fa', 'fa-star');
        ratingContainer.append(star);
    }

    return item;
}

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');

function applySearch() {
    const searchStr = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchStr)
    );

    currentState.sort((a, b) => sortByAlphabet(a, b));

    getItems(currentState);

    sortControl.selectedIndex = 0;
    filterControl.selectedIndex = 0;
}

searchButton.addEventListener('click', applySearch);
searchInput.addEventListener('search', applySearch);

const sortControl = document.querySelector('#sort');

sortControl.addEventListener('change', (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
        case 'expensive':
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }

        case 'cheap':
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }

        case 'rating':
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }

        case 'alphabet':
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }

    getItems(currentState);
});

function getFilter(word) {
    currentState = items.filter((option) =>
        option.description.includes(word));

    return word;
}

const filterControl = document.querySelector('#filter');

filterControl.addEventListener('change', (event) => {
    const selectedOptionFilter = event.target.value;

    switch (selectedOptionFilter) {
        case 'glass':
            {
                getFilter('стекло');
                break;
            }

        case 'crystal-glass':
            {
                getFilter('хрусталь');
                break;
            }

        case 'porcelain':
            {
                getFilter('фарфор');
                break;
            }

        case 'stainless-teel':
            {
                getFilter('нержавеющая сталь');
                break;
            }

        case 'faience':
            {
                getFilter('фаянс');
                break;
            }

        case 'ceramics':
            {
                getFilter('керамика');
                break;
            }
    }

    getItems(currentState);
});

const reset = document.querySelector('.btn');

reset.addEventListener('click', () => {
    currentState = items;

    getItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

    filterControl.selectedIndex = 0;
});