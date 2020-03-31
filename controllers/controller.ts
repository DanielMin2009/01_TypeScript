let myCar: Car;
// Aquesta és la manera de declarar un array d'objectes buit.
let arrCar: { plate: string, brand: string, color: string }[] = [];
//let arrWheel: { diameter: number, brand: string }[] = [];

let brandCarArr: string[] = new Array("Abarth", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Cadillac", "Caterham", "Chevrolet", "Citroen", "Dacia", "Ferrari", "Fiat", "Ford", "Honda", "Infiniti", "Isuzu", "Iveco", "Jaguar", "Jeep", "Kia", "KTM", "Lada", "Lamborghini", "Lancia", "Land Rover", "Lexus", "Lotus", "Maserati", "Mazda", "Mercedes-Benz", "Mini", "Mitsubishi", "Morgan", "Nissan", "Opel", "Peugeot", "Porsche", "Renault", "Rolls-Royce", "Seat", "Skoda", "Smart", "SsangYong", "Subaru", "Suzuki", "Tata", "Tesla", "Toyota", "Volkswagen", "Volvo");


/* ====================== Inputs car form ====================== */
let plateInput = (<HTMLInputElement>document.getElementById("txtPlate"));
let brandInput = (<HTMLInputElement>document.getElementById("txtBrand"));
let colorInput = (<HTMLInputElement>document.getElementById("txtColor"));

/* ====================== Events validate inputs car form ====================== */
plateInput.addEventListener("blur", validatePlate, false);
brandInput.addEventListener("blur", validateBrand, false);
colorInput.addEventListener("change", validateColor, false);

/* ====================== Inputs wheels form ====================== */

let checkWheels = (<HTMLInputElement>document.querySelector("#btnAddWheels"));

/* ========================== Creat Car =========================== */
function createCar(plate: string, brand: string, color: string) {

    plate = plateInput.value;
    brand = brandInput.value;
    color = colorInput.value;

    if (validatePlate() && validateBrand() && validateColor()) {

        myCar = new Car(plate, brand, color);

        if (arrCar.length <= 2) {
            arrCar.push(myCar);
            printCar();
            if (arrCar[2]) {
                (<HTMLInputElement>document.querySelector("#issues")).innerHTML = "You have already created 3 cars. Please, refresh the window.";
                (<HTMLInputElement>document.querySelector("#refreshWindow")).classList.remove("dnone");
            }
        }

    } else {
        (<HTMLInputElement>document.querySelector("#issues")).innerHTML = "Your car has not been created";
    }
}

/* ========================== Refresh Window =========================== */
var refreshWindow = () => location.reload();


/* ======== Show Color on select color ======== */
function showColor(bubbleColor: any) {

    let divColor: any = (<HTMLInputElement>document.getElementById("bubble"));

    switch (bubbleColor.toLowerCase()) {

        case "white":
            divColor.style.backgroundColor = "whitesmoke";
            break;
        case "silver":
            divColor.style.backgroundColor = "silver";
            break;
        case "red":
            divColor.style.backgroundColor = "#e73845";
            break;
        case "green":
            divColor.style.backgroundColor = "seagreen";
            break;
        case "blue":
            divColor.style.backgroundColor = "#3285CE";
            break;
        case "yellow":
            divColor.style.backgroundColor = "#F5D41F";
            break;
        default:
            break;
    }
}
/* UI Car -- Imprimir el cotxe  */
var printCar = () => {

    let i: number = 0;
    console.log(arrCar[i]);

    (<HTMLInputElement>document.getElementById("selectCar")).innerHTML += '<option value="' + myCar.plate + '">' + myCar.brand + ': ' + myCar.plate + ', ' + myCar.color + '</option>';

    // Referencio el div que te 3 caixetins amb grid
    let datasheet: any = document.getElementById("allCarGrid");
    // Creo els tags semàntics article i figure en js per si el programa creix amb un caroussel per exemple
    let article: any = document.createElement("article");
    let figure: any = document.createElement("figure");
    // En ser elements creats amb js, amb clau d'obertura i tancamentm no puc utilitzar innerHTML i els afegeixo just després, amb appenChild
    article.appendChild(figure);
    // Dins de figure li passo la funció que crea l'img amb el switch case que determina el color d'imatge, segons el color escollit a l'input
    figure.appendChild(printColorCar(colorInput.value));
    article.classList.add("carData");
    // Creo tot el codi amb claus d'ecmaScript6 per estructurar bé entre ${...} cada atribut de la classe cotxe
    article.innerHTML += `
                        <div class="carAtributesLi">
                            <ul>
                                <li>Plate</li>
                                <li>Brand</li>
                                <li>Color</li>
                            </ul>
                        </div>
                        <div class="answer">
                            <ul>
                                <li>${myCar.plate}</li>
                                <li>${myCar.brand}</li>
                                <li>${myCar.color}</li>
                            </ul>
                        <div>`;
    // imprescindible al final del cicle afegir l'article, una vegada igualat a l'article amb tota la informació a dins
    datasheet.appendChild(article);
}

/* ====== Escollir imatge de cotxe al crear-lo, sense rodes i segons el color escollit per pantalla ====== */
var printColorCar = (bubbleColor: any) => {

    var carImage: any = document.createElement("img");
    carImage.setAttribute("width", "100%");
    carImage.setAttribute("height", "auto");
    carImage.setAttribute("class", "carImage");

    switch (bubbleColor.toLowerCase()) {

        case "white":
            carImage.src = "../images/white-car-before.svg";
            break;
        case "silver":
            carImage.src = "../images/silver-car-before.svg";
            break;
        case "red":
            carImage.src = "../images/red-car-before.svg";
            break;
        case "green":
            carImage.src = "../images/green-car-before.svg";
            break;
        case "blue":
            carImage.src = "../images/blue-car-before.svg";
            break;
        case "yellow":
            carImage.src = "../images/yellow-car-before.svg";
            break;
        default:
            break;
    }
    return carImage;
}

/* ========================== Validates Car Form =========================== */
/* ======== Validate Plate ======== */
function validatePlate() {
    let isValidPlate: boolean = false;
    let errorPlate: any = document.querySelector("#errorPlate");
    let regExPlate: RegExp = /^(\d{4})([A-Z]{3})$/;

    if ((plateInput.value.length < 7) || (regExPlate.test(plateInput.value) == false)) {
        errorPlate.innerHTML = "Required Input. You have to write a correct plate with 7 characters. Ex: (1234XYZ)";
        error(errorPlate, plateInput);
        //return false;
    } else {
        plateInput.setAttribute("class", "inputOk");
        resetError(errorPlate, plateInput)
        isValidPlate = true;
    }
    // Comprovo que la matrícula sigui única
    for (let carItem of arrCar) {
        if (carItem.plate === plateInput.value) {
            isValidPlate = false;
            errorPlate.innerHTML = "The plate has to be unique. Please, write another plate.";
            error(errorPlate, plateInput);
        } else {
            plateInput.setAttribute("class", "inputOk");
            resetError(errorPlate, plateInput)
            isValidPlate = true;
        }
    }

    return isValidPlate;
}
/* ======== Validate Brand ======== */
function validateBrand() {
    let isValidBrand: boolean = false;
    let errorBrand: any = document.querySelector("#errorBrand");

    // Probar con el for of
    brandCarArr.forEach(carElement => {
        if (carElement.toLowerCase() === brandInput.value.toLowerCase()) {
            isValidBrand = true;
        }
    });

    if ((brandInput.value != "") && (isValidBrand)) {
        brandInput.setAttribute("class", "inputOk");
        resetError(errorBrand, brandInput);
    } else {
        errorBrand.innerHTML = "Required input. Please, enter a real car brand.";
        error(errorBrand, brandInput);
    }
    (<HTMLInputElement>document.querySelector("#issues")).innerHTML = "";
    return isValidBrand;
}
/* ======== Validate Color ======== */
function validateColor() {
    let isValidColor: boolean = false;
    let errorColor: any = (<HTMLInputElement>document.querySelector("#errorColor"));

    if (colorInput.value != "") {
        isValidColor = true;
        colorInput.setAttribute("class", "inputOk");
        showColor(colorInput.value);
        //setTimeout(function () { showColor(colorInput.value) }, 500);
    } else {
        error(errorColor, colorInput);
    }
    return isValidColor;
}

/* =============================================== WHEELS =============================================== */


var addWheels = () => {
    let i: number = 0;
    let j: any;
    let selectedCar: string = (<HTMLInputElement>document.getElementById("selectCar")).value;

    let wheels: number[] = [];
    for (i = 1; i <= 4; i++) {
        let wheelDiameter: number = Number((<HTMLInputElement>document.getElementById("wheelDiameter" + i)).value);
        //let wheelBrand: string = (<HTMLInputElement>document.getElementById("wheelBrand" + i)).value;
        wheels.push(wheelDiameter);
    }

    console.log(wheels);
    if (wheels.every(validateDiameter) && wheels.every(validateWheelBrand)) {
        let wheelDiameter: number = Number((<HTMLInputElement>document.getElementById("wheelDiameter" + i)).value);
        let wheelBrand: string = (<HTMLInputElement>document.getElementById("wheelBrand" + i)).value;

        for (let carItem of arrCar) {

            if (selectedCar === j.plate) {
                j = carItem;
                j.addWheel(new Wheel(wheelDiameter, wheelBrand));
                printColorCarWheels(colorInput.value);
            }
        }
    }
}

var validateWheelBrand = () => {
    let isValidBrand: boolean = false;
    let i: number = 0;

    for (i = 1; i < 5; i++) {

        let wheelBrand: any = (<HTMLInputElement>document.getElementById("wheelBrand" + i)).value;
        let errWheelBrand: any = (<HTMLInputElement>document.getElementById("errWheelBrand" + i));

        // Probar con el for of?
        brandCarArr.forEach(carItem => {
            if (carItem.toLowerCase() === wheelBrand.toLowerCase()) {
                isValidBrand = true;
                wheelBrand.setAttribute("class", "inputOk");
                resetError(errWheelBrand, wheelBrand);
            } else {
                isValidBrand = false;
                error(errWheelBrand, wheelBrand);
            }
        });
    }
    return isValidBrand;
}

var validateDiameter = () => {
    //El diàmetre de la roda ha de ser major que 0.4 m i menor que 2 m.
    let isValidDiameter: boolean = false;
    let i: number = 0;

    for (i = 1; i < 5; i++) {
        let wheelDiameter: any = Number((<HTMLInputElement>document.getElementById("wheelDiameter" + i)).value);
        let errWheelDiameter: any = (<HTMLInputElement>document.getElementById("errWheelDiameter" + i));
        // if (diameter < 0.4 || diameter > 2) {
        if (wheelDiameter < 0.4 || wheelDiameter > 2) {
            isValidDiameter = false;
            error(errWheelDiameter, wheelDiameter);
        } else {
            wheelDiameter.setAttribute("class", "inputOk");
            resetError(errWheelDiameter, wheelDiameter);
        }
    }
    return isValidDiameter;
}
/* ====== Escollir imatge de cotxe a l'afegir les rodes ====== */
var printColorCarWheels = (bubbleColor: any) => {

    let carImage: any = document.createElement("img");
    carImage.setAttribute("width", "100%");
    carImage.setAttribute("height", "auto");
    carImage.setAttribute("class", "carImage");

    switch (bubbleColor.toLowerCase()) {

        case "white":
            carImage.src = "../images/white-car.svg";
            break;
        case "silver":
            carImage.src = "../images/silver-car.svg";
            break;
        case "red":
            carImage.src = "../images/red-car.svg";
            break;
        case "green":
            carImage.src = "../images/green-car.svg";
            break;
        case "blue":
            carImage.src = "../images/blue-car.svg";
            break;
        case "yellow":
            carImage.src = "../images/yellow-car.svg";
            break;
        default:
            break;
    }
    return carImage;
}


// Error functions
function error(text: any, field: any) {
    text.classList.add("incorrectText");
    field.classList.add("incorrectBorder");
}

function resetError(text: any, field: any) {
    text.innerHTML = "";
    field.classList.remove("incorrectBorder");
}

function resetCorrect(text: any, field: any) {
    field.classList.remove("inputOk");
    text.classList.add("incorrectText");
    field.classList.add("incorrectBorder");
}

function correctInput(field: any) {
    field.classList.add("inputOk");
}



