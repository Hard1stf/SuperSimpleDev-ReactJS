export const formatMoney = (amountCents) => {
    if(amountCents < 0){
        amountCents *= -1;
        // console.log(amountCents);
        return `-$${(amountCents / 100).toFixed(2)}`;
    }
    return `$${(amountCents / 100).toFixed(2)}`;
} 