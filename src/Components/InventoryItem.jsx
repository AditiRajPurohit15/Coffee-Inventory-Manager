import React, { useState } from "react";
import AddCoffeeForm from "./AddCoffeeForm";
import toast from "react-hot-toast";

const InventoryItem = ({ coffee, setselectedCoffee, setCoffeeData }) => {
  const [editMode, seteditMode] = useState(false)
  const [successMessage, setsuccessMessage] = useState("")

  const handleUpdate =(updatedCoffee) =>{
    setCoffeeData(prev =>
      prev.map(item => item.id === updatedCoffee.id ? updatedCoffee : item)
    )
    setselectedCoffee(updatedCoffee);
    seteditMode(false);

    //  toast.success("Coffee updated successfully!");

    // setsuccessMessage("Coffee updated successfully!");
    // setTimeout(() => setsuccessMessage(""), 2000); // Clear message after 3 seconds
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-[#ffba00] border border-[#ffdb58] rounded-2xl shadow-lg">
      {/* {successMessage && (
        <div className="mb-3 p-2 bg-green-600 text-white text-sm rounded-lg shadow">
          {successMessage}
        </div>
      )} */}

  <h2 className="text-2xl font-bold text-[#14213d] mb-4">{coffee.name}</h2>
  
  <div className="space-y-2 text-[#003153]">
    <p><span className="font-semibold">Price:</span> ${coffee.price}</p>
    <p><span className="font-semibold">Stock:</span> {coffee.stock}</p>
  </div>

  {!editMode ? (
<>
  <button 
            onClick={() => seteditMode(true)} 
            className="mt-3 px-3 py-1 bg-blue-500 text-white rounded"
          >
            Edit
  </button>

  <button
    onClick={() => setselectedCoffee(null)}
    className="mt-6 w-full bg-[#14213d] text-white py-2 rounded-xl shadow hover:bg-[#003153] transition"
  >
    Back to List
  </button>
  </>
  ): ( 
    <AddCoffeeForm
    coffee={coffee}
    setCoffeeData={setCoffeeData}
    
    onSubmit={handleUpdate}
    onCancel={() => seteditMode(false)}/>
  ) }
</div>

  );
};

export default InventoryItem;

