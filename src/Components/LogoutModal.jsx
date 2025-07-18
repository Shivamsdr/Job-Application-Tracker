import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ setOpenLogoutModal }) => {
  const navigate = useNavigate();

  const closeLogoutModal = () => {
    setOpenLogoutModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    navigate("/login"); // client-side navigation without full reload
  };

  return (
    <div className="fixed inset-0 bg-[#000]/50 z-40 flex justify-center items-center">
      <div className="bg-white rounded-md py-8 px-6">
        <div className="flex justify-between mb-2 items-center">
          <h3 className="font-medium text-lg">Confirm Logout</h3>
          <button
            className="font-medium text-gray hover:bg-gray-light/90 hover:text-gray-dark rounded-md py-1.5 px-2"
            onClick={closeLogoutModal}
          >
            ×
          </button>
        </div>
        <div className="mb-8 text-gray pr-8">
          <p>Are you sure you want to log out?</p>
        </div>
        <div className="flex gap-4 justify-end">
          <button
            onClick={handleLogout}
            className="py-2 px-3 text-sm font-medium text-white bg-error rounded-md"
          >
            Logout
          </button>
          <button
            onClick={closeLogoutModal}
            className="py-2 px-3 text-sm font-medium text-gray-700 bg-gray-200 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
