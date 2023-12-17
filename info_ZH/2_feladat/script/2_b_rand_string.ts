// a getRandomStrings függvény véletlenszerűen válogat ki szövegeket egy adott tömbből
//'inputstring': a tömb a választható paramétereket tartalmazza
//'count: number': a kiválasztandó szövegek száma
//a 'const shuffledStrings = inputStrings.sort(() => Math.random() - 0.5); sor véletlenszerűen rendezni próbálja a inputStrings tömböt
//majd jön egy visszatérési érték, amikor a függvény visszaadja a kevert tömb első 3 elemét
function getRandomStrings(inputStrings: string[], count: number): string[] {
    const shuffledStrings = inputStrings.sort(() => Math.random() - 0.5);
    return shuffledStrings.slice(0, 3);
  }