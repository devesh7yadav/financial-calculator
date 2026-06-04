
//Interest calculator
const findInterest = async (req, res) => {

    try {
        //Get the values
        const {principal, rate, freq, time} = req.body;


        //Calculate the compounded amount
        const decimal_rate = rate / 100;
        const val1 = 1 + (decimal_rate/freq);
        const amount = principal * (val1 ** (freq * time));

        //Rounds the number to two decimals
        const roundedAmount = Math.round(amount * 100) / 100;

        return res.json({roundedAmount}); 

    } catch (error) {
        //figure out later, if every value isnt given 
        return res.status(400).json({
            message: "Not all fields are filled"
        });
    }
}

export {
    findInterest
};