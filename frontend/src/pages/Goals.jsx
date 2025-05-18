import { useState } from 'react';

export default function Goals() {
  const [goals, setGoals] = useState([
    { id: 1, title: "Save for Emergency Fund", amount: 5000, deadline: "2025-12-31" },
    { id: 2, title: "Pay Off Student Loan", amount: 15000, deadline: "2026-06-30" }
  ]);
  const [form, setForm] = useState({ title: '', amount: '', deadline: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      id: goals.length + 1,
      ...form,
      amount: parseFloat(form.amount),
    };
    setGoals([...goals, newGoal]);
    setForm({ title: '', amount: '', deadline: '' });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Financial Goals</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Goal Title (e.g. Save for vacation)"
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
          required
        />
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Target Amount (e.g. 2000)"
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
          required
        />
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Goal
        </button>
      </form>

      {/* Existing Goals */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="p-4 rounded border border-gray-700 bg-gray-900 text-white"
          >
            <h2 className="text-lg font-semibold">{goal.title}</h2>
            <p>Target: ${goal.amount.toLocaleString()}</p>
            <p>Deadline: {goal.deadline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
