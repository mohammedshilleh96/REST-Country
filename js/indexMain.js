var allCountriesNumber = 0;
var allCountriesDomArray = [];


$(document).ready(function () {

    /* If the search bar is clicked, prepare the allCountriesDomArray */
    $(document).on('click', '#search>input', function () {

        for (var i = 0; i < allCountriesNumber; i++) {

            /* Fetch element */
            var selector = '#country_id_' + i;
            var fetchedElement = $(selector)[0];

            /* Add element */
            allCountriesDomArray[i] = fetchedElement;
        }
    });

    /* If the value in search bar is changed, handle it */
    $(document).on('input', '#search>input', function (event) {

        var length = allCountriesDomArray.length;
        var search = event.currentTarget;
        var searchValue = ($(search).val()).toLowerCase();

        allCountriesDomArray.forEach(function (item) {

            var countryName = (item.getAttribute('data-country-name')).toLowerCase();
            var selector = '#' + item.getAttribute('id');

            if (!countryName.includes(searchValue))
                $(selector).addClass('hidden');

            else
                $(selector).removeClass('hidden');
        })
    });

    /* Call the action handler when a card is clicked and pass the country name */
    $(document).on('click', '.country-container', function (event) {
        var countryId = event.currentTarget.id;
        var selector = $('#' + countryId);
        var fetchedElement = $(selector)[0];
        countryName = fetchedElement.getAttribute('data-country-name');
        openCountry(countryName);
    })

    /* Get all countries information from the API */
    getAllCountries();

})

/************************************************************************************************/
/* Action performed when the menu button on mobile is clicked */
function showMenu() {
    $('.dropdown-content').toggleClass('show-menu-button');
}


/* This function talks with the API and get all countries information then triggers the main function */
function getAllCountries() {

    jQuery.ajax({
        url: 'https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;population;area;languages;flag',
        dataType: 'json',
        type: 'GET',
        cache: false,
        success: function (dataJSON) {
            displayAllCountries(dataJSON);
        },
        error: function () {
            alert('Something went wrong. Refresh the page or visit us later. Thank u');
        }
    });
}

/* Data contains array of countries. Saved in JSON format */
function displayAllCountries(data) {

    allCountriesNumber = data.length;

    for (var i = 0; i < data.length; i++)
        displayCountry(data[i], i);
}

/* Dynamically generates the html code to display the country information and adds it to index.html */
function displayCountry(country, index) {

    /* country container ID */
    var id = 'country_id_' + index;

    /* Variables that will be displayed. */
    var name = country.name;
    var capital = country.capital;
    var language = country.languages[0].name;
    var area = country.area;
    var population = country.population;
    var currency = country.currencies[0].name;
    var flag = country.flag;

    /* Basic components of html code */

    var countryContainerHtml = $('<div class="country-container flex-column"></div>');
    countryContainerHtml.attr('id', id);
    countryContainerHtml.attr('data-country-name', name);

    var nameFlagContainerHtml = $('<div class="name-flag-container"></div>');
    var countryNameP = $('<p class="first-font-style"></p>').text(name);
    var flagAll = $('<img class="flag">');
    flagAll.attr('src', flag);
    flagAll.attr('alt', name + '.jpg');

    nameFlagContainerHtml.append(countryNameP);
    nameFlagContainerHtml.append(flagAll);

    countryContainerHtml.append(nameFlagContainerHtml);


    var infoContainer = $('<div class="info-container flex-column"></div>');


    var infoObj = new info(capital, language, area, population, currency);

    /* make object with 5 attrbutes */
    for (var i in infoObj) {

        if (infoObj.hasOwnProperty(i)) {
            var key = captalize(i + ": "); 
            var value = captalize(infoObj[i]);
        }

        var infoLine = $('<div class="info"></div>');
        var keySpanHTML = $('<span></span>');
        var valueSpanHTML = $('<span></span>');
        keySpanHTML.text(key);
        valueSpanHTML.text(value);

        infoLine.append(keySpanHTML);
        infoLine.append(valueSpanHTML);
        infoContainer.append(infoLine);
    }
    countryContainerHtml.append(infoContainer);
    $('.all-countries-container').append(countryContainerHtml);
}

/* This function stores the country name in localstorage then triggers another page to view all countries info */
function openCountry(countryName) {

    window.open('../html/country.html?name=' + countryName, "_self");
}

/* Remove the window loader after the window content has fully loaded */
$(window).on('load', function () {
    console.log('hi1');
    $('body').css('overflow', 'auto');
    $('.loading-overlay > .spinner').fadeOut(3000, function () {
        $(this).parent().fadeOut('slow', function () {
            $(this).remove();
        })
    });
})

function info(capital, language, area, population, currency) {
    this.capital = capital;
    this.language = language;
    this.area = area;
    this.population = population;
    this.currency = currency;
}

function captalize (str) {
    var result = new String(str);
    return result.charAt(0).toUpperCase() + result.slice(1);
}