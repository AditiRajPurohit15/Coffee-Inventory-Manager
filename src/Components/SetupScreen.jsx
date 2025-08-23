import { useState } from "react";
import toast from "react-hot-toast";

const SetupScreen = ({ setauthMode }) => {
  const [newPass, setNewPass] = useState("");

  const handleSetPassword = () => {
    if (newPass.length < 4) {
      toast.error("Password must be at least 4 characters long", {
        duration: 2000,
        position: "top-right",
      });
      return;
    }

    localStorage.setItem("managerPass", newPass);

    toast.success("Password set successfully! Please log in.", {
      duration: 1500,
      position: "top-right",
    });

    // Wait for toast to disappear, then go to login
    setTimeout(() => {
      setauthMode("login");
    }, 1500);
  };

  return (
    <form className="flex flex-col items-center space-y-4 bg-[#ffdb58] p-6 rounded-xl shadow-md max-w-sm mx-auto">
  <input
    type="password"
    value={newPass}
    onChange={(e) => setNewPass(e.target.value)}
    placeholder="Enter new manager password"
    className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 text-black placeholder-gray-500 outline-none transition"
  />
  <button
    type="button"
    onClick={handleSetPassword}
    className="w-full bg-[#14213d] text-white font-semibold py-3 rounded-lg shadow hover:bg-[#003153] transition"
  >
    Set Password
  </button>
</form>

  );
};

export default SetupScreen;
