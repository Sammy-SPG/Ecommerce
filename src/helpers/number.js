export const formatPrice = (amount) => {
    if (typeof amount != 'number') return 'Is not a number';
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "narrowSymbol"
    }).format(amount / 100);
}