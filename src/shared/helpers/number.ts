export const getFormattedAmount = (amount: number, precision = 0): string =>
    Number(amount).toLocaleString('en-In', {
        minimumFractionDigits: precision,
        maximumFractionDigits: 2,
    });
