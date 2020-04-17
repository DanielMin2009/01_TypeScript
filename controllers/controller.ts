let myCar: Car;
// Aquesta és la manera de declarar un array d'objectes buit.
let arrCar: Car[] = new Array();

let arrWheel: Wheel[];

let brandCarArr: string[] = new Array("Abarth", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Cadillac", "Caterham", "Chevrolet", "Citroen", "Dacia", "Ferrari", "Fiat", "Ford", "Honda", "Infiniti", "Isuzu", "Iveco", "Jaguar", "Jeep", "Kia", "KTM", "Lada", "Lamborghini", "Lancia", "Land Rover", "Lexus", "Lotus", "Maserati", "Mazda", "Mercedes-Benz", "Mini", "Mitsubishi", "Morgan", "Nissan", "Opel", "Peugeot", "Porsche", "Renault", "Rolls-Royce", "Seat", "Skoda", "Smart", "SsangYong", "Subaru", "Suzuki", "Tata", "Tesla", "Toyota", "Volkswagen", "Volvo");


/* ====================== Inputs car form ====================== */
let plateInput = (<HTMLInputElement>document.getElementById("txtPlate"));
let brandInput = (<HTMLInputElement>document.getElementById("txtBrand"));
let colorInput = (<HTMLInputElement>document.getElementById("txtColor"));

/* ====================== Events validate inputs car form ====================== */
plateInput.addEventListener("blur", validatePlate, false);
brandInput.addEventListener("blur", validateBrand, false);
colorInput.addEventListener("change", validateColor, false);

/* ====================== Car Values addWheelsForm ====================== */
let selectCar: any = document.getElementById("selectCar");

/* Error messages */
let issues: any = (<HTMLInputElement>document.getElementById("issues"));

/* ========================== Creat Car =========================== */

function createCar() {

    let plate = plateInput.value;
    let brand = brandInput.value;
    let color = colorInput.value;



    let i: number = 0;

    if (validatePlate() && validateBrand() && validateColor()) {

        myCar = new Car(plate, brand, color);

        if (arrCar.length <= 2) {
            arrCar.push(myCar);
            console.log(myCar);
            printCar();
            if (arrCar[2]) {
                issues.innerHTML = "You have already created 3 cars. Please, refresh the window.";
                (<HTMLInputElement>document.querySelector("#refreshWindow")).classList.remove("dnone");
            }
        }
    } else {
        issues.innerHTML = "Your car has not been created";
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


    for (i = 0; i < arrCar.length; i++) {
    }
    selectCar.innerHTML += '<option id="' + i + '" value="' + myCar.plate + '">' + myCar.brand + ': ' + myCar.plate + ', ' + myCar.color + '</option>';


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

    // Adjudico una id única + i a cada img de fitxa tècnica
    for (let i = 0; i <= arrCar.length; i++) {
        carImage.setAttribute("id", "carImage" + i);
    }

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
        resetError(errorPlate, plateInput);
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
            resetError(errorPlate, plateInput);
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
function sendFormWheels() {

    let errors: number = 0;
    let i: number;

    // Pas 1: Validar tots els inputs
    for (i = 1; i <= 4; i++) {
        let wheelDiameter: number = Number((<HTMLInputElement>document.getElementById("wheelDiameter" + i)).value);
        let wheelBrand: string = (<HTMLInputElement>document.getElementById("wheelBrand" + i)).value;

        let correctInput: any;
        let incorrectInput: any;

        if (!validateDiameter(Number(wheelDiameter))) {
            incorrectInput = (<HTMLInputElement>document.getElementById("wheelDiameter" + i));
            incorrectInput.setAttribute("class", "incorrectBorder");
            issues.innerHTML = "wheel diameter has to be 0.4 to 2";
            errors++;
        } else {
            correctInput = (<HTMLInputElement>document.getElementById("wheelDiameter" + i));
            correctInput.setAttribute("class", "inputOk");

        }

        if (wheelBrand == "") {
            issues.innerHTML = "* All Add Wheels inputs are required";
            errors++;
        }
    }


    // Pas 2: Si totes estan bé, les afgim

    if (errors == 0) {
        let x: number;


        for (x = 1; x <= 4; x++) {
            let wheelDiameter: number = Number((<HTMLInputElement>document.getElementById("wheelDiameter" + x)).value);
            let wheelBrand: string = (<HTMLInputElement>document.getElementById("wheelBrand" + x)).value;

            let wheelGenerica = new Wheel(Number(wheelDiameter), wheelBrand);
            let j: any;

            for (let carItem of arrCar) {
                j = carItem;
                if ((j.wheels.length < 4) && (selectCar.value === j.plate)) {
                    j.addWheel(wheelGenerica);
                } else if (j.wheels.length > 4) {
                    issues.innerHTML = "* This car has already 4 wheels";
                }
            }

        }

    }

    let j: any;
    for (let carItem of arrCar) {
        j = carItem;

        if ((selectCar.value === j.plate) && (selectCar.value === selectCar.options[0].value)) {
            printColorCarWheels1(j.color);
        }

        else if ((selectCar.value === j.plate) && (selectCar.value === selectCar.options[1].value)) {
            printColorCarWheels2(j.color);
        }

        else if ((selectCar.value === j.plate) && (selectCar.value === selectCar.options[2].value)) {
            printColorCarWheels3(j.color);
        }
    }

}


/*
var validateWheelBrand = (brand: string) => {
    
    let i: number = 0;
    let wheelBrand: any = (<HTMLInputElement>document.getElementById("wheelBrand" + i));
    brand = wheelBrand.value;
 
    brandCarArr.forEach(brandCarItem => {
        if (brandCarItem.toLowerCase() != wheelBrand.toLowerCase()) {
            return false;
        } 
    });
    return brand;
}
*/

var validateDiameter = (diameter: number) => {
    let isValidDiameter: boolean = false;
    if (diameter < 0.4 || diameter > 2) {
        isValidDiameter = false;
    } else {
        isValidDiameter = true;
    }
    return isValidDiameter;
}


/* ====== Escollir imatge de cotxe a l'afegir les rodes ====== */


var printColorCarWheels1 = (color: string) => {

    let j: any;
    for (let carItem of arrCar) {
        j = carItem;
        if ((selectCar.value === j.plate) && (selectCar.value === selectCar.options[0].value)) {

            switch (j.color) {

                case (j.color = "white"):
                    selectCar.value = "white";
                    break;

                case (j.color = "silver"):
                    selectCar.value = "silver";
                    break;

                case (j.color = "red"):
                    selectCar.value = "red";
                    break;

                case (j.color = "green"):
                    selectCar.value = "green";
                    break;

                case (j.color = "blue"):
                    selectCar.value = "blue";
                    break;

                case (j.color = "yellow"):
                    selectCar.value = "yellow";
                    break;

                default:
                    break;

            }

            // recorro array de cotxes per imprimir rodes en el cotxe seleccionat. Fora del bucle d'afegir rodes, perquè si no
            let carImage1: any = document.getElementById("carImage1");

            switch (j.color) {
                case "white":
                    carImage1.src = "../images/white-car.svg";
                    break;
                case "silver":
                    carImage1.src = "../images/silver-car.svg";
                    break;
                case "red":
                    carImage1.src = "../images/red-car.svg";
                    break;
                case "green":
                    carImage1.src = "../images/green-car.svg";
                    break;
                case "blue":
                    carImage1.src = "../images/blue-car.svg";
                    break;
                case "yellow":
                    carImage1.src = "../images/yellow-car.svg";
                    break;
                default:
                    break;
            }
        }
    }
}

var printColorCarWheels2 = (color: string) => {

    let j: any;
    for (let carItem of arrCar) {
        j = carItem;
        if ((selectCar.value === j.plate) && (selectCar.value === selectCar.options[1].value)) {

            switch (j.color) {

                case (j.color = "white"):
                    selectCar.value = "white";
                    break;

                case (j.color = "silver"):
                    selectCar.value = "silver";
                    break;

                case (j.color = "red"):
                    selectCar.value = "red";
                    break;

                case (j.color = "green"):
                    selectCar.value = "green";
                    break;

                case (j.color = "blue"):
                    selectCar.value = "blue";
                    break;

                case (j.color = "yellow"):
                    selectCar.value = "yellow";
                    break;

                default:
                    break;

            }

            // recorro array de cotxes per imprimir rodes en el cotxe seleccionat. Fora del bucle d'afegir rodes, perquè si no
            let carImage2: any = document.getElementById("carImage2");

            switch (j.color) {
                case "white":
                    carImage2.src = "../images/white-car.svg";
                    break;
                case "silver":
                    carImage2.src = "../images/silver-car.svg";
                    break;
                case "red":
                    carImage2.src = "../images/red-car.svg";
                    break;
                case "green":
                    carImage2.src = "../images/green-car.svg";
                    break;
                case "blue":
                    carImage2.src = "../images/blue-car.svg";
                    break;
                case "yellow":
                    carImage2.src = "../images/yellow-car.svg";
                    break;
                default:
                    break;
            }

        }
    }
}


var printColorCarWheels3 = (color: string) => {

    let j: any;
    for (let carItem of arrCar) {
        j = carItem;
        if ((selectCar.value === j.plate) && (selectCar.value === selectCar.options[2].value)) {

            switch (j.color) {

                case (j.color = "white"):
                    selectCar.value = "white";
                    break;

                case (j.color = "silver"):
                    selectCar.value = "silver";
                    break;

                case (j.color = "red"):
                    selectCar.value = "red";
                    break;

                case (j.color = "green"):
                    selectCar.value = "green";
                    break;

                case (j.color = "blue"):
                    selectCar.value = "blue";
                    break;

                case (j.color = "yellow"):
                    selectCar.value = "yellow";
                    break;

                default:
                    break;

            }

            // recorro array de cotxes per imprimir rodes en el cotxe seleccionat. Fora del bucle d'afegir rodes, perquè si no
            let carImage3: any = document.getElementById("carImage3");

            switch (j.color) {
                case "white":
                    carImage3.src = "../images/white-car.svg";
                    break;
                case "silver":
                    carImage3.src = "../images/silver-car.svg";
                    break;
                case "red":
                    carImage3.src = "../images/red-car.svg";
                    break;
                case "green":
                    carImage3.src = "../images/green-car.svg";
                    break;
                case "blue":
                    carImage3.src = "../images/blue-car.svg";
                    break;
                case "yellow":
                    carImage3.src = "../images/yellow-car.svg";
                    break;
                default:
                    break;
            }

        }
    }
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



