export const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "narrowSymbol"
    }).format(amount/100);
}