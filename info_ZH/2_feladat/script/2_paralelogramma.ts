//megadjuk a paramétereket:'base' és 'height', mindkettő 'number' típusú
function areaWithHeightAndBase(base: number, height: number): number {
    return base * height;
}
//itt adjuk meg a funkciót, vagyis számolja ki a paralelogramma területét az alap és magasság szorzataként
function areaWithSidesAndAngle(side1: number, side2: number, angleInDegrees: number): number {
    const angleInRadians = angleInDegrees * (Math.PI / 180);
    return side1 * side2 * Math.sin(angleInRadians);
}

// példa használatra
const base = 10; // alap
const height = 5; // magasság
const side1 = 10; // oldal1
const side2 = 8; // oldal2
const angle = 60; // szög fokban
//a számítások elvégzése
const area1 = areaWithHeightAndBase(base, height);
console.log(`A paralelogramma területe (magasság és alap segítségével): ${area1}`);
//eredmények kiírása: a kiszámított területeket kiírja a konzolta szöveges üzenetként
const area2 = areaWithSidesAndAngle(side1, side2, angle);
console.log(`A paralelogramma területe (két oldal és közbezárt szög segítségével): ${area2}`);
