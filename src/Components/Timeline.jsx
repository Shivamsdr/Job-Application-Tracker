import React from "react";

const statusColors = {
  applied: "bg-blue-500 text-white",
  interview: "bg-orange-500 text-white",
  offered: "bg-green-500 text-white",
  rejected: "bg-red-500 text-white",
};

const statusLabels = {
  applied: "Applied",
  interview: "Interview",
  offered: "Offered",
  rejected: "Rejected",
};

const Timeline = ({ statusHistory = [] }) => {
  if (!statusHistory.length) return <div>No status history available.</div>;
  return (
    <div className="flex flex-col gap-4 mt-4">
      {statusHistory.map((entry, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <div className={`w-28 py-1 px-3 rounded-full text-center text-sm font-semibold ${statusColors[entry.status] || "bg-gray-300 text-black"}`}>
            {statusLabels[entry.status] || entry.status}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(entry.date).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline; 