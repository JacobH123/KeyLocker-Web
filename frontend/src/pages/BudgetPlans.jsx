const fakeBudgetPlans = [
    {
      name: "Monthly Essentials",
      goal: "Cover basic living costs",
      totalBudget: 2000,
      spent: 1450,
    },
    {
      name: "Vacation Savings",
      goal: "Save for Hawaii trip in July",
      totalBudget: 1200,
      spent: 300,
    },
  ];
  
  export default function BudgetPlans() {
    return (
      <div className="p-4 space-y-6 text-white">
        <h1 className="text-2xl font-bold">Budget Plans</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fakeBudgetPlans.map((plan, index) => {
            const remaining = plan.totalBudget - plan.spent;
            const percent = (plan.spent / plan.totalBudget) * 100;
  
            return (
              <div key={index} className="bg-gray-900 p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-1">{plan.name}</h2>
                <p className="text-sm text-gray-400 mb-3">{plan.goal}</p>
                <div className="space-y-1">
                  <p>Total Budget: ${plan.totalBudget}</p>
                  <p>Spent: ${plan.spent}</p>
                  <p>Remaining: ${remaining}</p>
                </div>
                <div className="w-full bg-gray-700 h-3 rounded mt-3">
                  <div
                    className="h-3 bg-green-500 rounded"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <p className="text-right text-sm text-gray-400 mt-1">{Math.round(percent)}% used</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  