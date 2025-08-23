import InventoryItem from "./InventoryItem";
import { Trash2 } from "lucide-react"; // ✅ import icon
import AddCoffeeForm from "./AddCoffeeForm";
import { useState } from "react";
import toast from "react-hot-toast";

const InventoryList = ({ coffeeData, setselectedCoffee, handleDelete, managerMode,  setCoffeeData }) => {
  const [showForm, setshowForm] = useState(false)
  return (

    <div>
      <h2 className="m-5 text-[#ffdb58] text-xl font-bold">
  {managerMode ? "Manager Mode" : "Worker Mode"}
</h2>

{managerMode && (
  <div className="flex flex-col items-center justify-center">
    <button
      onClick={() => setshowForm(!showForm)}
      className="mb-4 px-4 py-2 bg-yellow-500 text-black rounded-lg"
    >
      {showForm ? "Close Form" : "Add Coffee"}
    </button>

    {showForm && (
      <div className="w-full max-w-md">
        <AddCoffeeForm
          coffeeData={coffeeData}
          setCoffeeData={setCoffeeData}
        />
      </div>
    )}
  </div>
)}


    <div className="p-4 grid grid-cols-1 gap-4">
      {coffeeData.map((coffee) => (
        <div
  key={coffee.id}
  onClick={() => setselectedCoffee(coffee)}
  className="flex justify-between items-center bg-[#ffdb58] px-4 py-2 rounded-lg shadow cursor-pointer hover:bg-[#ffba00] transition"
>
  <span className="text-lg font-medium text-[#14213d]">{coffee.name}</span>


          {managerMode && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(coffee.id);
              }}
              className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
            >
              <Trash2 className="w-5 h-5" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default InventoryList;
