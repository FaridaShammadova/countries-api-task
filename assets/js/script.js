const base_url = "https://restcountries.com/v3.1/all";
let allCountries = [];
const cards = document.querySelector(".cards");

function getAllData() {
    fetch(base_url)
        .then(res => {
            if (!res.ok) throw new Error("Some error occurred!");
            return res.json();
        })
        .then(datas => {
            allCountries = datas;
            drawCards(allCountries);
        })
        .catch(err => console.log(err));
}

function searchData(){
    const searchInput = document.querySelector(".search-bar");
    
    searchInput.addEventListener("input", function (){
        const query = searchInput.value.trim().toLowerCase();
        
        if (query.length > 0){
            const filteredCountries = allCountries.filter(country =>
            country.name.official.toLowerCase().includes(query));
            drawCards(filteredCountries);
        }
        else{
            drawCards(allCountries);
        }
    });
}

function drawCards(countries) {
    cards.innerHTML = "";

    countries.forEach(country => {
        const card_wrapper = document.createElement("div");
        card_wrapper.className = "card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center";

        card_wrapper.innerHTML = `
            <div class="card" style="width: 18rem;">
                <div class="flag-img">
                    <img src="${country.flags.svg}" class="card-img-top" alt="${country.flags.alt}">
                </div>
                <div class="card-body">
                    <h5 class="card-title"><b>${country.name.official}</b></h5>
                    <ul class="list-group list-group-flush">
                        <li>Population: ${country.population.toLocaleString()}</li>
                        <li>Region: ${country.region}</li>
                        <li>Capital: ${country.capital ? country.capital[0] : "N/A"}</li>
                    </ul>
                </div>
            </div>
        `;
        const currentTheme = localStorage.getItem("theme-mode") || "light";
        card_wrapper.querySelector(".card").classList.add(currentTheme + "-mode");

        card_wrapper.querySelector('.card').addEventListener('click', () => {
            window.location.href = `country-details.html?cca3=${country.cca3}`;
        });

        cards.appendChild(card_wrapper);
    });
}

function changeMode() {
    document.addEventListener("DOMContentLoaded", function () {
        const theme_mode_btn = document.querySelector(".theme-mode-btn");
        const header = document.querySelector(".header");

        let current_theme = localStorage.getItem("theme-mode") || "light";

        document.body.classList.add(current_theme + "-mode");
        header.classList.add(current_theme + "-mode");
        theme_mode_btn.classList.add(current_theme + "-mode");

        applyThemeToCards(current_theme);
        updateButtonIcon(current_theme);

        theme_mode_btn.addEventListener("click", function () {
            const newTheme = document.body.classList.contains("light-mode") ? "dark" : "light";

            document.body.classList.replace(current_theme + "-mode", newTheme + "-mode");
            header.classList.replace(current_theme + "-mode", newTheme + "-mode");
            theme_mode_btn.classList.replace(current_theme + "-mode", newTheme + "-mode");

            applyThemeToCards(newTheme);
            updateButtonIcon(newTheme);

            localStorage.setItem("theme-mode", newTheme);
            current_theme = newTheme;
        });
    });
}

function applyThemeToCards(theme) {
    document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("light-mode", "dark-mode");
        
        card.classList.add(theme + "-mode");
    });
}

function updateButtonIcon(theme) {
    const theme_mode_btn = document.querySelector(".theme-mode-btn");
    
    if (theme === "light") {
        theme_mode_btn.innerHTML = "&#9728; Change mode";
    } else {
        theme_mode_btn.innerHTML = '<i class="fa fa-moon-o"></i> Change mode';
    }
}

getAllData();
searchData();
changeMode();