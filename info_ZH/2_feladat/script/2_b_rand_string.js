//a ts fájl lefordítása js-re, hogy kompatibilis legyen a böngészővel
function getRandomStrings(inputStrings, count) {
    var shuffledStrings = inputStrings.sort(function () { return Math.random() - 0.5; });
    return shuffledStrings.slice(0, 3);
}
