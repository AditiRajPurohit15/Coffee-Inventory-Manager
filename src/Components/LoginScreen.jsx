import { useState } from 'react';
import toast from "react-hot-toast";

const LoginScreen = ({ setauthMode }) => {
  const [enteredPass, setenteredPass] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (localStorage.getItem("managerPass") === enteredPass) {
      // ✅ CHANGE 1: Show toast first, then switch to dashboard
      toast.success("Login successful!", {
        duration: 1000, // 1 second
        position: "top-right",
      });

      // ✅ CHANGE 2: Wait 1 second for toast to disappear, then open dashboard
      setTimeout(() => {
        setauthMode("dashboard");
      }, 1000);

    } else {
      toast.error("Incorrect password", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  return (
    <>
  <form 
    onSubmit={handleLogin} 
    className="flex flex-col items-center space-y-4 bg-[#ffdb58] p-6 rounded-xl shadow-md max-w-sm mx-auto"
  >
    <input
      type="password"
      value={enteredPass}
      onChange={(e) => setenteredPass(e.target.value)}
      placeholder="Enter manager password"
      className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 text-black placeholder-gray-500 outline-none transition"
    />
    <button
      type="submit"
      className="w-full bg-[#14213d] text-white font-semibold py-3 rounded-lg shadow hover:bg-[#003153] transition"
    >
      Enter
    </button>
  </form>

  <button
    onClick={(e) => {
      e.preventDefault();
      setauthMode(null); // go back to worker mode
    }}
    className="mt-4 w-full max-w-sm block mx-auto bg-gray-400 text-black font-medium py-3 rounded-lg shadow hover:bg-gray-500 transition"
  >
    Go Back to Worker Mode
  </button>
</>

  );
};

export default LoginScreen;
