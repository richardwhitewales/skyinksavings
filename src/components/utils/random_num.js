export function randomNum(numNumbers) {
    const usedDigits = [];
    let uniqueNumber = "";

    while (uniqueNumber.length < numNumbers) {
        const digit = Math.floor(Math.random() * numNumbers);

        if (!usedDigits.includes(digit)) {
            uniqueNumber += digit;
            usedDigits.push(digit);
        }
    }

    return Number(uniqueNumber);
}
