/* When the logo us clicked, this functions runs */
function returnToHomePage() {
    location.href = '../html/index.html';
}

/* Load the footer */
$(function () {
    $('.footer').load('../html/footer.html');
})

/* Update the header when the document loads and on resize */
$(document).ready(function () {

    chooseHeader();
    $(window).resize(chooseHeader);
})

/* Select the appropiate header file according to the window width */
function chooseHeader() {
    if (window.innerWidth < 576)
        $('.header').load('../html/headerMobile.html');
    else
        $('.header').load('../html/headerPc.html');
}
