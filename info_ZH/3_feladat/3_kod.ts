//típusdefiníció a termékek adatairól: név (string típuső), ár (number típusú)
type Product = {
    name: string;
    price: number;
};
//eseménykezelő: a weboldal betöltődése után ezek a lépések történnek
//funkciók rendelése a termékek hozzáadásához, űrlap beküldésének kezeléséhez
//egy jól működő felhasználói felületnek kell lennie - intuitív, könnyen kezelhető
window.onload = () => {
    const form = document.getElementById('productForm') as HTMLFormElement;
    const productInputs = document.getElementById('productInputs');
    const resultsDiv = document.getElementById('results');

    document.getElementById('addProduct')?.addEventListener('click', () => {
        const newInput = document.createElement('div');
        newInput.innerHTML = `
            <input type="text" placeholder="Termék neve" required>
            <input type="number" placeholder="Ár" min="0" required>
        `;
        productInputs?.appendChild(newInput);
    });

    form.onsubmit = (event) => {
        event.preventDefault();
        const products: Product[] = [];
        const inputGroups = form.querySelectorAll('div > div');

        inputGroups.forEach(group => {
            const inputs = group.querySelectorAll('input');
            const nameInput = inputs[0];
            const priceInput = inputs[1];

            if (nameInput && priceInput && !isNaN(parseFloat(priceInput.value))) {
                products.push({
                    name: nameInput.value,
                    price: parseFloat(priceInput.value)
                });
            }
        });

        if (products.length === 0) {
            resultsDiv!.innerHTML = `<p>Nincsenek termékek</p>`;
            return;
        }
//segédfüggvények megadása sorrendben:
//legolcsóbb termék kiválasztása
//termékek átlagárának kiszámítása
//az árak szórásának kiszámítása a termékek tömbjében
//a termékek adatait a fomrból összegyűjti és egy 'Product[]' típusú tömbbe helyezi
//eseménykezelés: új termék hozzáadása gombra kattintva új input mezők jelennek meg az adatok beviteléhez
        const cheapest = getCheapestProduct(products);
        const averagePrice = getAveragePrice(products);
        const priceStandardDeviation = getStandardDeviation(products);

        resultsDiv!.innerHTML = `
            <p>Legolcsóbb termék: ${cheapest?.name || 'N/A'}</p>
            <p>Átlagár: ${averagePrice.toFixed(2)}</p>
            <p>Árak szórása: ${priceStandardDeviation.toFixed(2)}</p>
        `;
    };
};

function getCheapestProduct(products: Product[]): Product | undefined {
    return products.reduce((prev, curr) => (prev.price < curr.price ? prev : curr), products[0]);
}

function getAveragePrice(products: Product[]): number {
    const total = products.reduce((sum, product) => sum + product.price, 0);
    return total / products.length;
}

function getStandardDeviation(products: Product[]): number {
    const average = getAveragePrice(products);
    const squareDiffs = products.map(product => Math.pow(product.price - average, 2));
    const avgSquareDiff = squareDiffs.reduce((sum, diff) => sum + diff, 0) / products.length;
    return Math.sqrt(avgSquareDiff);
}
