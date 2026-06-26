//Pie Chart showing the principal and interest

import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

function MortgageChart( {principal, interest}) {

    let data = [];

    if(principal === 0){
        data.push({name:"Enter Inputs", value: 1});
    } else {
        data = [
            { name: "Principal", value: principal },
            { name: "Interest", value: interest }
        ];
    }

    return (
        <div className="grid justify-items-center"> 
            <h2>Mortgage Breakdown</h2>

            <PieChart width={250} height={225}>
                <Pie
                    data={data}
                    nameKey="name"
                    dataKey="value"
                    outerRadius={80}
                >
                    <Cell fill={"#22bde4"}/>
                    <Cell fill={"#dd446a"}/>
                </Pie> 

                <Legend/>

                <Tooltip/>
            </PieChart>
        </div>
    );
}

export default MortgageChart;