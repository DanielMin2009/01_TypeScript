"use strict";
class Car {
    constructor(plate, brand, color) {
        this.wheels = new Array();
        this.plate = plate;
        this.brand = brand;
        this.color = color;
    }
    addWheel(wheel) {
        this.wheels.push(wheel);
    }
}
