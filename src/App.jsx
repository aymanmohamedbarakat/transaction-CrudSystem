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
