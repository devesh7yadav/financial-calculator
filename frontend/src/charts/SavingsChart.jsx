//Shows savings over time

import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

function SavingsChart( {values} ) {

    return(
       <div className="w-full h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={values}
                margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 40
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="year" label={{value: "Time (Months)", offset: -10, position: 'insideBottom'}}/>
                    <YAxis dataKey="amount" label={{value: "Amount ($)", offset: -10, angle:-90, position: 'insideLeft'}}/>
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#22bde4"
                        strokeWidth={3}
                    />
            </LineChart>
        </ResponsiveContainer>
       </div> 
    )
}

export default SavingsChart;