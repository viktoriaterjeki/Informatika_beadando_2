//a ts kód lefordítása js-re, hogy kompatibilis legyen a böngészővel
window.onload = function () {
    var _a;
    var form = document.getElementById('productForm');
    var productInputs = document.getElementById('productInputs');
    var resultsDiv = document.getElementById('results');
    (_a = document.getElementById('addProduct')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        var newInput = document.createElement('div');
        newInput.innerHTML = "\n            <input type=\"text\" placeholder=\"Term\u00E9k neve\" required>\n            <input type=\"number\" placeholder=\"\u00C1r\" min=\"0\" required>\n        ";
        productInputs === null || productInputs === void 0 ? void 0 : productInputs.appendChild(newInput);
    });
    form.onsubmit = function (event) {
        event.preventDefault();
        var products = [];
        var inputGroups = form.querySelectorAll('div > div');
        inputGroups.forEach(function (group) {
            var inputs = group.querySelectorAll('input');
            var nameInput = inputs[0];
            var priceInput = inputs[1];
            if (nameInput && priceInput && !isNaN(parseFloat(priceInput.value))) {
                products.push({
                    name: nameInput.value,
                    price: parseFloat(priceInput.value)
                });
            }
        });
        if (products.length === 0) {
            resultsDiv.innerHTML = "<p>Nincsenek term\u00E9kek</p>";
            return;
        }
        var cheapest = getCheapestProduct(products);
        var averagePrice = getAveragePrice(products);
        var priceStandardDeviation = getStandardDeviation(products);
        resultsDiv.innerHTML = "\n            <p>Legolcs\u00F3bb term\u00E9k: ".concat((cheapest === null || cheapest === void 0 ? void 0 : cheapest.name) || 'N/A', "</p>\n            <p>\u00C1tlag\u00E1r: ").concat(averagePrice.toFixed(2), "</p>\n            <p>\u00C1rak sz\u00F3r\u00E1sa: ").concat(priceStandardDeviation.toFixed(2), "</p>\n        ");
    };
};
function getCheapestProduct(products) {
    return products.reduce(function (prev, curr) { return (prev.price < curr.price ? prev : curr); }, products[0]);
}
function getAveragePrice(products) {
    var total = products.reduce(function (sum, product) { return sum + product.price; }, 0);
    return total / products.length;
}
function getStandardDeviation(products) {
    var average = getAveragePrice(products);
    var squareDiffs = products.map(function (product) { return Math.pow(product.price - average, 2); });
    var avgSquareDiff = squareDiffs.reduce(function (sum, diff) { return sum + diff; }, 0) / products.length;
    return Math.sqrt(avgSquareDiff);
}
