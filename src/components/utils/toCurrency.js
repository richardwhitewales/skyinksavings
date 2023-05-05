export function toCurrency(amount, places = 2) {
    const numAsNumber = Number(parseInt(amount).toFixed(places));

    const numAsString = numAsNumber.toFixed(places);

    const [integerPart, fractionalPart] = numAsString.split('.');

    const integerPartWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const formattedString = `$${integerPartWithCommas}.${fractionalPart}`;

    return formattedString;
}