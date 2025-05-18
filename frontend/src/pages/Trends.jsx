import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar
  } from "recharts";
  
  const lineData = [
    { date: "Mon", value: 200 },
    { date: "Tue", value: 500 },
    { date: "Wed", value: 400 },
    { date: "Thu", value: 600 },
    { date: "Fri", value: 300 },
  ];
  
  const pieData = [
    { name: "Food", value: 400 },
    { name: "Bills", value: 300 },
    { name: "Entertainment", value: 300 },
    { name: "Other", value: 200 },
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  
  export default function Trends() {
    return (
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">Financial Trends</h1>
  
        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 text-white p-4 rounded-lg shadow">Total Spending: $2,400</div>
          <div className="bg-gray-800 text-white p-4 rounded-lg shadow">Income: $3,000</div>
          <div className="bg-gray-800 text-white p-4 rounded-lg shadow">Savings: $600</div>
        </div>
  
        {/* Line chart for trends over time */}
        <div className="bg-gray-900 p-4 rounded-lg shadow text-white">
          <h2 className="text-lg mb-2">Spending Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#00C49F" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
  
        {/* Pie chart for category breakdown */}
        <div className="bg-gray-900 p-4 rounded-lg shadow text-white">
          <h2 className="text-lg mb-2">Spending by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  