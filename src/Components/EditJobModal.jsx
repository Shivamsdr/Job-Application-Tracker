import { useState } from "react";

const statusOptions = [
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "offered", label: "Offered" },
  { value: "rejected", label: "Rejected" },
];

const EditJobModal = ({ job, setEditModal, onEditJob }) => {
  const [editedJob, setEditedJob] = useState(job);
  const [newStatus, setNewStatus] = useState("");
  const [newStatusDate, setNewStatusDate] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedJob({ ...editedJob, [name]: value });
  };

  const handleAddStatus = () => {
    if (!newStatus || !newStatusDate) return;
    setEditedJob({
      ...editedJob,
      status: newStatus,
      statusHistory: [
        ...(editedJob.statusHistory || []),
        { status: newStatus, date: newStatusDate },
      ],
    });
    setNewStatus("");
    setNewStatusDate("");
  };

  const handleSaveChanges = () => {
    onEditJob(editedJob);
    setEditModal(false);
  };

  const handleCancel = () => {
    setEditModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-40 flex justify-center items-center">
      <div className="p-6 w-[80%] lg:w-[50%] shadow-md bg-[#f3f3f3] rounded-lg">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Edit Job</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              name="jobTitle"
              value={editedJob.jobTitle}
              onChange={handleInputChange}
              placeholder="Job Title"
              className="border border-light-gray rounded-md p-2 outline-none focus:ring-[1px] focus:ring-[#E0E1E6]"
              required
            />
            <input
              type="text"
              name="companyName"
              value={editedJob.companyName}
              onChange={handleInputChange}
              placeholder="Company Name"
              className="border border-light-gray rounded-md p-2 outline-none focus:ring-[1px] focus:ring-[#E0E1E6]"
              required
            />
            <input
              type="date"
              name="applicationDate"
              value={editedJob.applicationDate}
              onChange={handleInputChange}
              placeholder="Application Date"
              className="border border-light-gray rounded-md p-2 outline-none focus:ring-[1px] focus:ring-[#E0E1E6]"
              required
            />
            {/* Status history section */}
            <div className="bg-white p-3 rounded border border-light-gray">
              <h4 className="font-semibold mb-2">Status History</h4>
              <ul className="mb-2">
                {(editedJob.statusHistory || []).map((entry, idx) => (
                  <li key={idx} className="flex gap-2 items-center text-sm mb-1">
                    <span className="font-bold">{entry.status}</span>
                    <span className="text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 items-center">
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="">Select status</option>
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={newStatusDate}
                  onChange={e => setNewStatusDate(e.target.value)}
                  className="border rounded p-1"
                />
                <button type="button" onClick={handleAddStatus} className="bg-black text-white rounded px-2 py-1 text-xs">Add</button>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={handleSaveChanges}
                className="bg-black text-white rounded-md py-2 px-4"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-light-gray text-primary-text rounded-md py-2 px-4"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJobModal;
