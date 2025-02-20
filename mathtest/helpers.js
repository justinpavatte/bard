function preciseRound(value, decimalPlaces) {
    // Ensure the input is treated as a number
    let num = parseFloat(value);
    if (isNaN(num)) {
        throw new Error("Invalid number input");
    }
    // Perform rounding with Math.round and Number.EPSILON
    let factor = Math.pow(10, decimalPlaces);
    return Math.round((num + Number.EPSILON) * factor) / factor;
}