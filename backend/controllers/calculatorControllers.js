//Functions --------------------------------------------------

//Print function
function print(res, amount) {
    //Rounds the number to two decimals
    const new_Amount = Math.round(amount * 100) / 100;

    return res.json({new_Amount}); 
}

//Calculations -----------------------------------------------

//Interest calculator
const findInterest = async (req, res) => {

    try {
        //Get the values
        const {principal, rate, freq, time} = req.body;


        //Calculate the compounded amount
        let amount;
        if (rate == 0){ //avoid dividing by 0
            amount = principal;
        } else {
            const decimal_rate = rate / 100;
            const val1 = 1 + (decimal_rate/freq);
            amount = principal * (val1 ** (freq * time));
        }

        print(res, amount);

    } catch (error) {
        //figure out later, if every value isnt given 
        return res.status(400).json({
            message: "Not all fields are filled"
        });
    }
}

//Savings goal calculator -- PMT
const savingsGoal = async (req, res) => {
    try {
        
        //Get the values
        const {goal, current, interest, time} = req.body; 

        //Convert interest and time to months
        const monthly_interest = interest / 100 / 12;
        const months = time * 12;

        //Calculations
        let amount;
        if(interest == 0){ //If interest = 0, so it doesn't divide by 0
            amount = (goal - current) / months;
        } else { //Every other case
            const val1 = (1 + monthly_interest) ** months
            amount = ((goal - current * val1) * monthly_interest) / (val1 - 1);
        }

        print(res, amount);

    } catch (error) {
        //figure out later, if every value isnt given 
        return res.status(400).json({
            message: "Not all fields are filled"
        });
    }
}

//Mortgage payments -- PMT
const mortgage = async (req, res) => {
    try {
        const {principal, interest, time} = req.body;

        //Convert interest and time to months
        const monthly_interest = interest / 100 / 12;
        const months = time * 12;

        //Calculations
        let amount;
        if(interest == 0){ //If interest = 0, so it doesn't divide by 0
            amount = principal / months;
        } else { //Every other cases
            amount = (principal * monthly_interest) / (1 - (1 + monthly_interest) ** -months);
        }

        print(res, amount);

    } catch (error) {
        //figure out later, if every value isnt given 
        return res.status(400).json({
            message: "Not all fields are filled"
        });
    }
}

//Budget calculator
const budget = async (req, res) => {

    const {income, expenses} = req.body

    let total_expenses = 0;

    //Get the total expense amount
    for (let i = 0; i < expenses.length; i++) {
        total_expenses += expenses[i].amount;
    }

    //Find the leftover amount
    const total = income - total_expenses;

    print(res, total);
}

export {
    findInterest,
    savingsGoal,
    mortgage,
    budget
};