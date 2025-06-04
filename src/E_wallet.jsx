import {
  DollarSign,
  Trash,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function E_wallet() {
  const [balance, setBalance] = useState(1000);
  const [amount, setAmout] = useState();
  const amountInput = useRef();

  const [transactions, setTransactions] = useState([]);

  const Deposite = () => {
    let amount = +amountInput.current.value;

    if (!amount) {
      toast.warning(
        `You can't deposit ${amount}. Please enter a valid positive amount.`
      );
      return;
    }
    setBalance(balance + amount);
    setAmout(amount);
    if (amount > 50) {
      let newtransaction = {
        id: transactions.length + 1,
        beforeBalance: balance,
        amount: amount,
        type: "deposit",
        afterBalance: balance + amount,
        date: "2025-02-17",
      };
      transactions.push(newtransaction);
      amountInput.current.value = "";
    } else {
      toast.warning(`You can't deposit ${amount} , minmum is 50`);
    }
  };

  const WithDraw = () => {
    let amount = +amountInput.current.value;
    if (!amount) {
      toast.warning(
        `You can't withdraw ${amount}. Please enter a valid positive amount.`
      );
      return;
    }
    if (balance > amount) {
      setBalance(balance - amount);
      let newtransaction = {
        id: transactions.length + 1,
        beforeBalance: balance,
        amount: amount,
        type: "withdraw",
        afterBalance: balance - amount,
        date: "2025-02-17",
      };
      transactions.push(newtransaction);
      amountInput.current.value = "";
    } else {
      toast.warning(`You can't decrease below ${balance}`);
    }
  };

  const handleremove = (index) => {
    let copy = [...transactions];
    copy.splice(index, 1);
    setTransactions(copy);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">E-Wallet</h1>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6 text-green-500" />
              <h2 className="text-lg font-semibold text-gray-700">
                Current Balance
              </h2>
            </div>
            <p className="text-3xl font-bold text-green-600">{balance} EGP</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700">
                Last Transaction
              </h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {amount || 0} EGP
            </p>
          </div>
        </div>

        {/* Transaction Input */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Make a Transaction
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              ref={amountInput}
              placeholder="Enter amount"
              min="0"
              step="0.01"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
            />
            <div className="flex gap-3">
              <button
                onClick={Deposite}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
              >
                <TrendingUp className="w-5 h-5" />
                Deposit
              </button>
              <button
                onClick={WithDraw}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
              >
                <TrendingDown className="w-5 h-5" />
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">
              Transaction History
            </h3>
          </div>

          {transactions.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Before
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      After
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
              </table>

              <div className="max-h-69 overflow-y-auto">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map((el, index) => (
                      <tr
                        key={el.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          #{el.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {el.beforeBalance} EGP
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          {el.amount} EGP
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                              el.type === "withdraw"
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {el.type === "withdraw" ? (
                              <TrendingDown className="w-3 h-3" />
                            ) : (
                              <TrendingUp className="w-3 h-3" />
                            )}
                            {el.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {el.afterBalance} EGP
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {el.date}
                        </td>
                        <td className="px-6 py-4">
                          {index === transactions.length - 1 ? (
                            <button
                              onClick={() => handleremove(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash size={16} />
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <table className="w-full text-sm">
                <tfoot className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-4 text-center text-lg font-bold text-blue-700"
                    >
                      Current Balance: {balance} EGP
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <Wallet className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-500">
                  No transactions yet
                </h3>
                <p className="text-gray-400">
                  Start by making your first deposit or withdrawal
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
