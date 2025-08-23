import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";

const AddCoffeeForm = ({ coffeeData, setCoffeeData, coffee, onSubmit, onCancel }) => {
  const [newCoffeeName, setnewCoffeeName] = useState("");
  const [newCoffeeStock, setnewCoffeeStock] = useState("");
  const [newCoffeePrice, setnewCoffeePrice] = useState("");

  useEffect(() => {
    if (coffee) {
      // Prefill when editing
      setnewCoffeeName(coffee.name);
      setnewCoffeeStock(coffee.stock);
      setnewCoffeePrice(coffee.price);
    } else {
      // Empty when adding
      setnewCoffeeName("");
      setnewCoffeeStock("");
      setnewCoffeePrice("");
    }
  }, [coffee]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newCoffeeName && newCoffeeStock && newCoffeePrice) {
      const updatedCoffee = {
        id: coffee ? coffee.id : Date.now(),
        name: newCoffeeName,
        stock: parseInt(newCoffeeStock),
        price: parseFloat(newCoffeePrice),
      };

      if (coffee) {
        // Edit mode → send updated coffee back to InventoryItem
        onSubmit(updatedCoffee);
      } else {
        // Add mode → directly add to coffeeData
        setCoffeeData([...coffeeData, updatedCoffee]);
        setnewCoffeeName("");
        setnewCoffeeStock("");
        setnewCoffeePrice("");
      }
    }
    toast.success(coffee ? "Coffee updated successfully!" : "Coffee added successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#ffdb58] p-6 rounded-2xl shadow-md max-w-md mx-auto space-y-4">
  <input 
    type="text"
    placeholder="Coffee Name"
    value={newCoffeeName}
    onChange={(e)=> setnewCoffeeName(e.target.value)}
    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 text-[#14213d] placeholder-[#14213d] outline-none transition"
  />

  <input 
    type="number"
    placeholder="Stock"
    value={newCoffeeStock}
    onChange={(e)=> setnewCoffeeStock(e.target.value)}
    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 text-[#14213d] placeholder-[#14213d] outline-none transition"
  />

  <input 
    type="number"
    placeholder="Price"
    value={newCoffeePrice}
    onChange={(e)=> setnewCoffeePrice(e.target.value)}
    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 text-[#14213d] placeholder-[#14213d] outline-none transition"
  />

  <button type="submit" className="w-full bg-[#14213d] hover:bg-[#003153] text-white py-3 rounded-lg shadow-md font-semibold transition">
    {coffee ? "Update Coffee" : "Add Coffee"}
  </button>

  {coffee && (
    <button 
      type="button" 
      onClick={onCancel} 
      className="w-full mt-2 bg-gray-400 hover:bg-gray-500 text-black py-3 rounded-lg transition"
    >
      Cancel
    </button>
  )}
</form>

  );
};

export default AddCoffeeForm;
