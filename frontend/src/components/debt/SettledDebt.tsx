"use client";

import React from "react";

const SettledDebts = ({ settledDebts }) => {
  if (!settledDebts || settledDebts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6">
        <p className="text-gray-500 text-center">No settled debts yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto max-h-[400px] space-y-4 bg-white rounded-2xl shadow-xl border border-gray-200/50 p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Settled Debts</h2>
      {settledDebts.map((debt, index) => (
        <div
          key={debt.id || index}
          className="flex justify-between items-center p-4 rounded-lg bg-green-50 border border-green-100"
        >
          <div>
            <p className="font-medium text-gray-800">{debt.user?.name || "Unknown"}</p>
            <p className="text-sm text-gray-500">Owed to: {debt.owed_to?.name || "Unknown"}</p>
          </div>
          <p className="font-semibold text-green-600">${debt.settled_amount}</p>
        </div>
      ))}
    </div>
  );
};

export default SettledDebts;
