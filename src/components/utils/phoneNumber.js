export default function phoneNumber(number) {
    const maskedNumber = `****${number.slice(-4)}`
    return maskedNumber;
}