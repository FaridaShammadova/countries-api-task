const base_url = "https://restcountries.com/v3.1/alpha";
const urlParams = new URLSearchParams(window.location.search);
const countryCode = urlParams.get("cca3");

function getAllData(){
    fetch(`${base_url}/${countryCode}`)
    .then(res => {
        if(!res.ok) throw new Error("Some error occured!");
        return res.json();
    })
    .then(data => drawCards(data[0]))
    .catch(err => console.log(err))
}

function getBorderCountry(code) {
    fetch(`${base_url}/${code}`)
    .then(res => res.json())
    .then(data => {
        drawCards(data[0]);
        addBackButtonEvent();
    })
    .catch(err => console.log(err));
}

function drawCards(country){
    const country_details = document.querySelector(".country-details");
    
    let bordersHTML = `${country.name.official} has no border countries`;
    if (country.borders) {
        bordersHTML = country.borders.map(border => 
            `<button class="border-btn ${localStorage.getItem("theme-mode") || 'light'}-mode" onclick="getBorderCountry('${border}')">${border}</button>`
        ).join(" ");
    }
console.log(bordersHTML);

    country_details.innerHTML = `
        <div class="flag-img">
                    <img src="${country.flags.svg}" alt="${country.flags.alt}">
                </div>
    
                <div class="details">
                    <h2>${country.name.official}</h2>
                    <ul>
                        <li><b>Native Name:</b> ${country.name.nativeName ? Object.values(country.name.nativeName)[0].common : "N/A"}</li>
                        <li><b>Population:</b> ${country.population}</li>
                        <li><b>Region:</b> ${country.region}</li>
                        <li><b>Sub Region:</b> ${country.subregion}</li>
                        <li><b>Capital:</b> ${country.capital || "N/A"}</li>
                        <li><b>Top Level Domain:</b> ${country.tld}</li>
                        <li><b>Currencies:</b> ${country.currencies ? Object.values(country.currencies)[0].name : "N/A"}</li>                    
                        <li><b>Languages:</b> ${country.languages ? Object.values(country.languages).join(", ") : "N/A"}</li>
                    </ul>

                    <div class="neighbor-countries">
                        <h4>Border countries:</h4>
                        ${bordersHTML}
                    </div> 
                </div>
        `;
        addBackButtonEvent();
}

function addBackButtonEvent(){
    const back_btn = document.querySelector(".back-btn");
    if (back_btn) {
        back_btn.addEventListener("click", function(){
            window.location.href = `index.html`;
        });
    }
}

const header = document.querySelector("h1");
header.addEventListener("click", function(){
    window.location.href = `index.html`;
})

getAllData();

function changeMode() {
    document.addEventListener("DOMContentLoaded", function () {
        const theme_mode_btn = document.querySelector(".theme-mode-btn");
        const header = document.querySelector(".header");
        const back_btn = document.querySelector(".back-btn");

        let current_theme = localStorage.getItem("theme-mode") || "light";

        document.body.classList.add(current_theme + "-mode");
        header.classList.add(current_theme + "-mode");
        theme_mode_btn.classList.add(current_theme + "-mode");
        if (back_btn) back_btn.classList.add(current_theme + "-mode");

        applyThemeToCards(current_theme);
        updateButtonIcon(current_theme);

        theme_mode_btn.addEventListener("click", function () {
            const newTheme = document.body.classList.contains("light-mode") ? "dark" : "light";

            document.body.classList.replace(current_theme + "-mode", newTheme + "-mode");
            header.classList.replace(current_theme + "-mode", newTheme + "-mode");
            theme_mode_btn.classList.replace(current_theme + "-mode", newTheme + "-mode");
            if (back_btn) back_btn.classList.replace(current_theme + "-mode", newTheme + "-mode");

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

changeMode();