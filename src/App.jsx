import E_wallet from "./E_wallet";
import { ToastContainer } from "react-toastify";
import FatoraCrud from "./FatoraCrud";

export default function App() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <ToastContainer />
      <div className="flex flex-col gap-3">
        <E_wallet />
        <FatoraCrud />
      </div>
    </div>
  );
}

{
  /*
    {
    id: 1,
    beforeBalance: 1000,
    amount: 500,
    type: "deposit",
    afterBalance: 1500,
    date: "2025-01-10",
  },
  {
    id: 2,
    beforeBalance: 1500,
    amount: 200,
    type: "withdraw",
    afterBalance: 1300,
    date: "2025-01-12",
  },
  {
    id: 3,
    beforeBalance: 1300,
    amount: 700,
    type: "deposit",
    afterBalance: 2000,
    date: "2025-01-15",
  },
  {
    id: 4,
    beforeBalance: 2000,
    amount: 1200,
    type: "withdraw",
    afterBalance: 800,
    date: "2025-01-20",
  },
  {
    id: 5,
    beforeBalance: 800,
    amount: 300,
    type: "deposit",
    afterBalance: 1100,
    date: "2025-01-22",
  },
  {
    id: 6,
    beforeBalance: 1100,
    amount: 100,
    type: "withdraw",
    afterBalance: 1000,
    date: "2025-01-25",
  },
  {
    id: 7,
    beforeBalance: 1000,
    amount: 1000,
    type: "deposit",
    afterBalance: 2000,
    date: "2025-02-01",
  },
  {
    id: 8,
    beforeBalance: 2000,
    amount: 500,
    type: "withdraw",
    afterBalance: 1500,
    date: "2025-02-03",
  },
  {
    id: 9,
    beforeBalance: 1500,
    amount: 200,
    type: "deposit",
    afterBalance: 1700,
    date: "2025-02-07",
  },
  {
    id: 10,
    beforeBalance: 1700,
    amount: 300,
    type: "withdraw",
    afterBalance: 1400,
    date: "2025-02-10",
  },
  
      { id: 1, name: "iphonex", price: 400, qty: 3 },
      { id: 2, name: "iphone11", price: 450, qty: 5 },
      { id: 3, name: "iphone12", price: 500, qty: 2 },
      { id: 4, name: "Samsung", price: 600, qty: 6 },
      { id: 5, name: "Nokia", price: 300, qty: 7 },
      { id: 6, name: "OnePlus 9 Pro", price: 650, qty: 10 },
      { id: 7, name: "Xiaomi Mi 11", price: 450, qty: 15 },
      { id: 8, name: "Google Pixel 6", price: 550, qty: 8 },
      { id: 9, name: "Huawei P50", price: 480, qty: 12 },
      { id: 10, name: "Sony Xperia 1", price: 700, qty: 4 },
      { id: 11, name: "Oppo Find X3", price: 520, qty: 9 },
      { id: 12, name: "Vivo X70", price: 380, qty: 11 },
  */
}
