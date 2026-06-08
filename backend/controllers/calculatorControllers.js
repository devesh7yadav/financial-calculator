//Calculations -----------------------------------------------
//Interest calculator
const findInterest = async (req, res) => {
     //Get the values
    const {principal, rate, freq, time} = req.body;

    //Missing fields
    if (principal == null || rate == null || freq == null || time == null) {
        return res.status(400).json({ message: "Missing fields" });
    } 

    try {
        //Calculate the compounded amount
        const decimal_rate = rate / 100;
        const val1 = 1 + (decimal_rate/freq);
        const amount = principal * (val1 ** (freq * time));
        return res.json({amount});
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

//Savings goal calculator -- PMT
const savingsGoal = async (req, res) => {
    //Get the values
    const {goal, current, interest, time} = req.body; 

    //Missing fields
    if (goal == null || current == null || interest == null || time == null) {
        return res.status(400).json({ message: "Missing fields" });
    } 

    try {
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
        return res.json({amount});
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

//Mortgage payments -- PMT
const mortgage = async (req, res) => {
    //Get the values
    const {principal, interest, time} = req.body;

    //Missing fields
    if (principal == null || interest == null || time == null) {
        return res.status(400).json({ message: "Missing fields" });
    } 


    try {
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

        return res.json({amount});

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

//Budget calculator
const budget = async (req, res) => {

    const {income, expenses} = req.body

    const incomeNum = Number(income);

    let total_expenses = 0;

    //Get the total expense amount
    for (let i = 0; i < expenses.length; i++) {
        total_expenses += Number(expenses[i].amount);
    }

    //Find the leftover amount
    const total = incomeNum - total_expenses;

    return res.json({
        amount: total,
        total_expenses
    });
}

export {
    findInterest,
    savingsGoal,
    mortgage,
    budget
};