import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

function BudgetChart({ expenses }) {

    //Lopo through the expense array
    const data = expenses
        .filter(item => item.amount)
        .map(item => ({
            name: item.name || "Other",
            value: Number(item.amount)
        }));

    if(data.length === 0){
        data.push({name:"No Expenses", value: 1});
    }

    const colours = ["#22bde4", "#dd446a", "#37b94c"];

    return (
        <div className="grid justify-items-center"> 
            <h2>Expense Breakdown</h2>

            <PieChart width={250} height={225}>
                <Pie
                    data={data}
                    dataKey="value"
                    outerRadius={80}
                >
                    {data.map((_, index) => (
                        <Cell key={index} fill={colours[index % colours.length]} />
                    ))}
                </Pie> 

                <Legend/>

                <Tooltip/>
            </PieChart>
        </div>
    );
}

export default BudgetChart;