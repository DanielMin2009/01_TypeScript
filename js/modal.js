/* ======================== Create Car | 01 ======================== */
document.getElementById("btn-modalCreateCar").addEventListener("click", function () {
    document.getElementById("overlayAdd").classList.add("is-visible");
    document.getElementById("modalAdd").classList.add("is-visible");
});

document.getElementById("close-btnAdd").addEventListener("click", function () {
    document.getElementById("overlayAdd").classList.remove("is-visible");
    document.getElementById("modalAdd").classList.remove("is-visible");
});

/*
document.getElementById("btnCreateCar").addEventListener("click", function () {
    setTimeout(function () {
        document.getElementById("overlayAdd").classList.remove("is-visible");
        document.getElementById("modalAdd").classList.remove("is-visible");
    }, 300);
});
*/

document.getElementById("btnCreateCar").addEventListener("click", function () {
    document.getElementById("overlayAdd").classList.remove("is-visible");
    document.getElementById("modalAdd").classList.remove("is-visible");
});

document.getElementById("overlayAdd").addEventListener("click", function () {
    document.getElementById("overlayAdd").classList.remove("is-visible");
    document.getElementById("modalAdd").classList.remove("is-visible");
});


/* ======================== Add Wheels | 02 ======================== */
document.getElementById("btn-modalAddWheels").addEventListener("click", function () {
    document.getElementById("overlay02").classList.add("is-visible");
    document.getElementById("modal02").classList.add("is-visible");
});

document.getElementById("close-btn02").addEventListener("click", function () {
    document.getElementById("overlay02").classList.remove("is-visible");
    document.getElementById("modal02").classList.remove("is-visible");
});

document.getElementById("btnAddWheels").addEventListener("click", function () {
    document.getElementById("overlay02").classList.remove("is-visible");
    document.getElementById("modal02").classList.remove("is-visible");
});

document.getElementById("overlay02").addEventListener("click", function () {
    document.getElementById("overlay02").classList.remove("is-visible");
    document.getElementById("modal02").classList.remove("is-visible");
});

