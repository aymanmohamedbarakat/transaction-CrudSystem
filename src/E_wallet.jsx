import {
  ArrowRight,
  DollarSign,
  Trash,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function E_wallet() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      beforeBalance: 1000,
      amount: 500,
      type: "deposit",
      afterBalance: 1500,
      date: "2025-01-10",
    },
  ]);
  const [balance, setBalance] = useState(1000);
  const [amount, setAmout] = useState();
  const amountInput = useRef();
  const currncy = "$";

  const Deposit = () => {
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

  const handleRemove = (index) => {
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
            <p className="text-3xl font-bold text-green-600">
              {balance} {currncy}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-700">
                Last Transaction
              </h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {amount || 0} {currncy}
            </p>
          </div>
        </div>

        {/* Transaction Input */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Make a Transaction
          </h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="number"
              ref={amountInput}
              placeholder="Enter amount"
              min="0"
              step="0.01"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={Deposit}
                className="flex w-full items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
              >
                <TrendingUp className="w-5 h-5" />
                Deposit
              </button>
              <button
                onClick={WithDraw}
                className="flex w-full items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
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
              {/* Desktop Table View */}
              <div className="hidden lg:block">
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
                          {el.beforeBalance} {currncy}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          {el.amount} {currncy}
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
                          {el.afterBalance} {currncy}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {el.date}
                        </td>
                        <td className="px-6 py-4">
                          {index === transactions.length - 1 ? (
                            <button
                              onClick={() => handleRemove(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash size={16} />
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-4 text-center text-lg font-bold text-blue-700"
                      >
                        Current Balance: {balance}
                        {currncy}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="block lg:hidden p-4">
                <div className="space-y-4">
                  {transactions.map((el, index) => (
                    <div
                      key={el.id}
                      className="bg-white rounded-xl shadow-lg border border-slate-200 p-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-3 sm:p-4 mb-3 gap-3 sm:gap-0">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="bg-blue-100 p-2 sm:p-3 rounded-full flex-shrink-0">
                            <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                              Previous Balance
                            </p>
                            <div className="flex justify-between">
                              <p className="font-bold text-base sm:text-lg text-gray-900 truncate">
                                {el.beforeBalance} {currncy}
                              </p>
                              <span className="inline-flex sm:hidden items-center px-2 py-1 rounded-full text-xs sm:text-sm font-bold bg-blue-100 text-blue-600 self-start sm:self-center">
                                #{el.id}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                          <div className="flex items-center bg-white rounded-full px-2 sm:px-3 py-1 shadow-sm w-full sm:w-auto justify-center sm:justify-start">
                            {el.type === "deposit" ? (
                              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mr-1" />
                            )}
                            <span
                              className={`font-semibold text-xs sm:text-sm ${
                                el.type === "deposit"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {el.type === "deposit" ? "+" : "-"}
                              {el.amount} {currncy}
                            </span>
                          </div>
                          <span className="hidden sm:block items-center px-2 py-1 rounded-full text-xs sm:text-sm font-bold bg-blue-100 text-blue-600 self-start sm:self-center">
                            #{el.id}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-slate-600 text-sm mb-1">Amount</p>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                            {el.amount} {currncy}
                          </span>
                        </div>

                        <div>
                          <p className="text-slate-600 text-sm">Type</p>
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
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
                        </div>
                        <div>
                          <p className="text-slate-600 text-sm mb-1">
                            Before Balance
                          </p>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                            {el.beforeBalance} {currncy}
                          </span>
                        </div>
                        <div>
                          <p className="text-slate-600 text-sm mb-1">
                            After Balance
                          </p>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">
                            {el.afterBalance} {currncy}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <p className="text-slate-600 text-sm mb-1">Date</p>
                          <p className="font-bold text-lg text-slate-900">
                            {el.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Total */}
                <div className="mt-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                  <div className="text-center">
                    <span className="text-xl font-bold text-slate-900">
                      Current Balance:
                      <span className="text-blue-600 ml-1.5">
                        {balance}
                        {currncy}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
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
