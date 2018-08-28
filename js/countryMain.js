var countryName;

/* Basic components for HTML code */
var titleElement = $('<p class="first-font-style"></p>');
var divElement = $('<div class="toggle-sidenav"></div>');
var spanElement = $('<span class="key-font"></span>');
var pElement = $('<p class="value-font"></p>');
var line = '<hr />';

var allInfo = new Object;
/*******************************************************************************************************/
/****************************************** Event listener *********************************************/
/*******************************************************************************************************/


$(document).ready(function () {

    /* Action performed when a link in side navbar is clicked */
    $('.side-nav-container > a').on('mouseup', function () {
        scrollShift();
    });

    /* Action performed when the menu button is clicked */
    $('.header').on('click', '#btn', function () {

        $('.side-nav-container').animate({
            width: 'toggle'
        }, 500);

        setTimeout(
            function () {
                $('.content').toggleClass('toggle-content');
            }, 200);
    });

    /* Adds a line at the end of each section */
    /*$('.info').before(line);*/

    /* Read the country name from URL and save it countryName variable */
    getCountryNameFromUrl();

})

/*********************************** Most important functions *************************************/

/* Gets all information about a specific country */
function getCountry(countryName) {

    /* Change the website title according to the country name */
    document.title = countryName;

    var theUrl = 'https://restcountries.eu/rest/v2/name/' + countryName;
    jQuery.ajax({
        url: theUrl,
        dataType: 'json',
        type: 'GET',
        cache: false,
        success: function (dataJSON) {
            displayCountry(dataJSON);
        }
    });
}

/* Generates the HTML code and displays all country information */
function displayCountry(data) {

    /* Elements in Flag Section */
    var flag = data[0].flag;

    /* Elements in Languages Section*/
    var languages = data[0].languages;

    /* Elements in Currencies */
    var currencies = data[0].currencies;

    var CapitalKeysArray = ['Capital: '];
    var capitalValuesArray = [data[0].capital];
    addAttribute('capital', CapitalKeysArray, capitalValuesArray, 'CAPITAL', '#capital');

    var tldKeysArray = ['Top Level Domain: '];
    var tldValuesArray = [data[0].topLevelDomain];
    addAttribute('tld', tldKeysArray, tldValuesArray, 'TOP LEVEL DOMAIN', '#topLevelDomain');

    var populationKeysArray = ['Population: '];
    var populationValuesArray = [data[0].population];
    addAttribute('population', populationKeysArray, populationValuesArray, 'POPULATION', '#population');

    var areaKeysArray = ['Area: '];
    var areaValuesArray = [data[0].area];
    addAttribute('area', areaKeysArray, areaValuesArray, 'AREA', '#area');

    var timeKeysArray = ['Keys: '];
    var timeValuesArray = [data[0].timezones];
    addAttribute('time', timeKeysArray, timeValuesArray, 'TIME', '#time');

    var nameKeysArray = ['Country Name: ', 'Alternative Spellings: ', 'Native Name: ', 'Demonym: '];
    var nameValuesArray = [data[0].name, data[0].altSpellings, data[0].nativeName, data[0].demonym];
    addAttribute('name', nameKeysArray, nameValuesArray, 'NAME', '#name');

    var codesKeysArray = ['Alpha2Code: ', 'Alpha3Code: ', 'Calling Codes: ', 'Numeric Code: '];
    var codesValuesArray = [data[0].alpha2Code, data[0].alpha3Code, data[0].callingCodes, data[0].numericCode];
    addAttribute('codes', codesKeysArray, codesValuesArray, 'CODES', '#codes');

    var coordinatesKeysArray = ['Latitude: ', 'longitude: '];
    var coordinatesValuesArray = [data[0].latlng[0], data[0].latlng[1]];
    addAttribute('coordinates', coordinatesKeysArray, coordinatesValuesArray, 'COORDINATES', '#coordinates');

    var geographyKeysArray = ['Region: ', 'Subregion: ', 'Borders: '];
    var geographyValuesArray = [data[0].region, data[0].subregion, data[0].borders];
    addAttribute('geography', geographyKeysArray, geographyValuesArray, 'GEOGRAPHY', '#region');

    var ciocKeysArray = ['Cioc: '];
    var ciocValuesArray = [data[0].cioc];
    addAttribute('cioc', ciocKeysArray, ciocValuesArray, 'CIOC', '#cioc');

    for (var i in allInfo) {
        if (allInfo.hasOwnProperty(i)) 
            infoHandler(allInfo[i]);
    }

    flagInfoHandler(flag);
    languagesInfoHandler(languages);
    currenciesInfoHandler(currencies);
}

/***********************************************************/
/**************************** Handlers ********************/
/*********************************************************/

/* Handles the Flag Section Information */
function flagInfoHandler(flag) {

    var newImage = '<img class="center" src=\"' + flag + '\" +  alt="" + countryName + "">';
    $('#flag').append(newImage);
}

/* Languages handler */
function languagesInfoHandler(languages) {

    var title = titleElement;
    title.text('Languages');
    $('#language').append(title);

    for (var i = 0; i < languages.length; i++) {
        var nameDiv = divElement;
        var tempSpan = spanElement;
        tempSpan.text(objectToString(languages[i]));
        nameDiv.append(tempSpan);
        $('#language').append(nameDiv);
    }
}

/* Currencies handler */
function currenciesInfoHandler(currencies) {

    var title = titleElement;
    title.text('Currencies');
    $('#currency').append(title);

    for (var i = 0; i < currencies.length; i++) {

        var nameDiv = divElement;
        var tempSpan = spanElement;
        tempSpan.text(objectToString(currencies[i]));
        nameDiv.append(tempSpan);
        $('#currency').append(nameDiv);
    }
}


function infoHandler(info) {

    /* Add the title */
    var keysArray = info[0];
    var valuesArray = info[1];
    var title = info[2];
    var id = info[3];

    var titleDOM = $('<p class="first-font-style"></p>');
    titleDOM.text(title);
    $(id).append(titleDOM);

    var length = keysArray.length;
    for (var i = 0; i < length; i++) {

        var newDiv = $('<div class="toggle-sidenav"></div>');
        var spanTemp = $('<span class="key-font"></span>');
        var tempP = $('<p class="value-font"></p>');

        spanTemp.text(keysArray[i]);
        newDiv.append(spanTemp);

        var type = typeof valuesArray[i];


        if (valuesArray[i] instanceof Array)
            tempP.text(arrayToString(valuesArray[i]));

        else if (type === 'object')
            tempP.text(objectToString(valuesArray[i]));

        else
            tempP.text(valuesArray[i]);

        newDiv.append(tempP);
        $(id).append(newDiv);
    }

}

/**************************************************************************************/
/*************************** Helping Functions ***************************************/
/*************************************************************************************/


function arrayToString(array) {

    var outStr = '';
    for (var i = 0; i < array.length; i++) {
        outStr += array[i];
        if (array.length - 1 != i)
            outStr += ', ';
    }

    return outStr;
}

function objectToString(p) {

    /*key is key and value is p[key]*/
    var result = '';
    for (var key in p)
        if (p.hasOwnProperty(key))
            result += p[key] + ', ';

    /* Delete the additional comma and space at the end */
    var length = result.length - 2;
    result = result.slice(0, length);
    return result;
}


/* Action performed when a link in side navbar is clicked */
function scrollShift() {

    window.scrollBy(0, -100);
}

function getCountryNameFromUrl() {

    var urlString = window.location.href;
    var urlObj = new URL(urlString);
    countryName = urlObj.searchParams.get('name');
    getCountry(countryName);
}

function addAttribute(key, keysArray, valuesArray, title, id) {
    var value = [keysArray, valuesArray, title, id];
    allInfo[key] = value;
}