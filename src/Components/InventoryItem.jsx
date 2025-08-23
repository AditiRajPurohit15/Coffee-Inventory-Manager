import React, { useState } from "react";
import AddCoffeeForm from "./AddCoffeeForm";
// import toast from "react-hot-toast";

const InventoryItem = ({ coffee, setselectedCoffee, setCoffeeData , managerMode}) => {
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
    <div className={`p-6 max-w-md mx-auto border rounded-2xl shadow-lg transition
  ${coffee.stock < 5 ? 'bg-red-100 border-red-500 animate-pulse' : 'bg-[#ffba00] border-[#ffdb58]'}`}>
  
  <h2 className={`text-2xl font-bold mb-4 ${coffee.stock < 5 ? 'text-red-600' : 'text-[#14213d]'}`}>
    {coffee.name}
  </h2>

  <div className="space-y-2 text-[#003153]">
    <p><span className="font-semibold">Price:</span> ${coffee.price}</p>
    <p><span className="font-semibold">Stock:</span> {coffee.stock}</p>
  </div>

  {!editMode ? (
    <>
      {managerMode && (
        <button 
          onClick={() => seteditMode(true)} 
          className="mt-3 px-3 py-1 bg-blue-500 text-white rounded"
        >
          Edit
        </button>
      )}

      <button
        onClick={() => setselectedCoffee(null)}
        className="mt-6 w-full bg-[#14213d] text-white py-2 rounded-xl shadow hover:bg-[#003153] transition"
      >
        Back to List
      </button>
    </>
  ) : ( 
    <AddCoffeeForm
      coffee={coffee}
      setCoffeeData={setCoffeeData}
      onSubmit={handleUpdate}
      onCancel={() => seteditMode(false)}
    />
  )}
</div>


  );
};

export default InventoryItem;

