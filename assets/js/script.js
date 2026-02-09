document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('price-slider');
    const priceValue = document.getElementById('price-value');
    const buyButton = document.getElementById('buy-button');

    if (slider && priceValue && buyButton) {
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            priceValue.textContent = value;
            buyButton.textContent = `Purchase for $${value}`;
        });

        buyButton.addEventListener('click', () => {
            const amount = slider.value;
            console.log(`Payment initiated for $${amount}`);
        });
    }
});
