import {useState, useEffect, use} from 'react';
import InventoryList from './Components/InventoryList';
import InventoryItem from './Components/InventoryItem';
import TopBar from './Components/TopBar';
import toast, { Toaster } from "react-hot-toast";
import SetupScreen from './Components/SetupScreen';
import LoginScreen from './Components/LoginScreen';


const App = () => {
  const [selectedCoffee, setselectedCoffee] = useState(null);
  const [managerPass, setmanagerPass] = useState(()=>{
    return localStorage.getItem("managerPass") || null
  })
  const [authMode, setauthMode] = useState(null);

 const [coffeeData, setCoffeeData] = useState(() => {
  const saved = localStorage.getItem("coffeeData");
  return saved ? JSON.parse(saved) : [
    { id: 1, name: "Espresso", stock: 10, price: 120 },
    { id: 2, name: "Cappuccino", stock: 8, price: 150 },
    { id: 3, name: "Latte", stock: 5, price: 170 },
    { id: 4, name: "Mocha", stock: 7, price: 180 }
  ];
});


  useEffect(() => {
    localStorage.setItem("coffeeData", JSON.stringify(coffeeData));
  }, [coffeeData]);


   const handleDelete = (id) => {
   setCoffeeData(coffeeData.filter(coffee => coffee.id !== id));
   toast.success("Coffee deleted successfully!");
    };

    const handleManagerClick = ()=>{
       if (authMode === "dashboard") {
    // Already in manager → switch back to worker
    setauthMode(null);
    return;
  }
   
  const storedPass = localStorage.getItem("managerPass");

      if (storedPass) {
       setauthMode("login")   // password exists
      } else {
          setauthMode("setup")   // no password yet
        }

    }

  
return (
  <div className="min-h-screen bg-[#14213d] text-white">
    <Toaster position="top-right" />
    <TopBar />
    
    <div className='m-5'>
      <button 
        onClick={handleManagerClick}
        className="bg-[#ffdb58] text-[#14213d] px-4 py-2 rounded-lg shadow hover:bg-[#ffba00] transition cursor-pointer"
      >
        {authMode === "dashboard" ? "Switch to Worker View" : "Switch to Manager View"}
      </button>
    </div>

    {/* ---------------- AUTH FLOW ---------------- */}
    {authMode === "setup" && (
      <SetupScreen setauthMode={setauthMode} />
    )}

    {authMode === "login" && (
      <LoginScreen setauthMode={setauthMode} />
    )}

    {authMode === "dashboard" && (
      selectedCoffee ? (
        <InventoryItem
          coffee={selectedCoffee}
          setselectedCoffee={setselectedCoffee}
          setCoffeeData={setCoffeeData}
          managerMode={true}   // Manager Mode
        />
      ) : (
        <InventoryList
          coffeeData={coffeeData}
          setselectedCoffee={setselectedCoffee}
          handleDelete={handleDelete}
          managerMode={true}   // Manager Mode
          setCoffeeData={setCoffeeData}
        />
      )
    )}

    {/* ---------------- WORKER FLOW ---------------- */}
    {authMode === null && (
      selectedCoffee ? (
        <InventoryItem
          coffee={selectedCoffee}
          setselectedCoffee={setselectedCoffee}
          setCoffeeData={setCoffeeData}
          managerMode={false}  // Worker Mode
        />
      ) : (
        <InventoryList
          coffeeData={coffeeData}
          setselectedCoffee={setselectedCoffee}
          handleDelete={handleDelete}
          managerMode={false}  // Worker Mode
          setCoffeeData={setCoffeeData}
        />
      )
    )}
  </div>
);


  
}

export default App;
