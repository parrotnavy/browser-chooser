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

        slider.addEventListener('change', (e) => {
            const amount = e.target.value;
            if (typeof window.clarity === 'function') {
                window.clarity('set', 'purchase_amount', amount);
                window.clarity('event', 'purchase_slider_change');
            }
        });

        buyButton.addEventListener('click', () => {
            const amount = slider.value;
            console.log(`Payment initiated for $${amount}`);
            if (typeof window.clarity === 'function') {
                window.clarity('set', 'purchase_amount', amount);
                window.clarity('event', 'purchase_buy_click');
            }
        });
    }
});
