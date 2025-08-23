import React from "react";
import { Coffee, Leaf } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-[#14213d] py-4 shadow-md flex justify-center items-center gap-3 rounded-lg">
  <Coffee className="text-[#ffba00] w-8 h-8" />
  <h1 className="text-3xl md:text-4xl font-extrabold text-[#ffdb58]">
    Coffee Inventory
  </h1>
  <Leaf className="text-[#003153] w-8 h-8" />
</div>

  );
};

export default TopBar;
