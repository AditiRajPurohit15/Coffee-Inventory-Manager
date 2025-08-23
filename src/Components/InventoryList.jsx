import InventoryItem from "./InventoryItem";
import { Trash2 } from "lucide-react"; 
import AddCoffeeForm from "./AddCoffeeForm";
import { useState } from "react";

const InventoryList = ({ coffeeData, setselectedCoffee, handleDelete, managerMode, setCoffeeData }) => {
  const [showForm, setshowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered coffees based on search term
  const filteredCoffees = coffeeData.filter(coffee =>
    coffee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search coffee..."
    className="w-full max-w-md p-3 rounded-lg border-2 border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 text-black placeholder-gray-500 transition outline-none"
  />
</div>


      {/* Manager Add Coffee */}
      {managerMode && (
        <div className="flex flex-col items-center justify-center mb-4">
          <button
            onClick={() => setshowForm(!showForm)}
            className="mb-4 px-4 py-2 bg-yellow-500 text-black rounded-lg"
          >
            {showForm ? "Close Form" : "Add Coffee"}
          </button>

          {showForm && (
            <div className="w-full max-w-md">
              <AddCoffeeForm coffeeData={coffeeData} setCoffeeData={setCoffeeData} />
            </div>
          )}
        </div>
      )}

      {/* Coffee List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCoffees.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No coffees found.</p>
        )}

        {filteredCoffees.map((coffee) => (
          <div
            key={coffee.id}
            onClick={() => setselectedCoffee(coffee)}
            className={`flex justify-between items-center px-4 py-2 rounded-lg shadow cursor-pointer transition
              ${coffee.stock < 5 ? 'bg-red-100 border border-red-500 animate-pulse' : 'bg-[#ffdb58] hover:bg-[#ffba00]'}`}
          >
            <span className={`text-lg font-medium ${
              coffee.stock < 5 ? 'text-red-600' : 'text-[#14213d]'
            }`}>
              {coffee.name}
            </span>

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
