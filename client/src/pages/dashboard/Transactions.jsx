import { useEffect, useState } from "react";
import AddTransaction from "../../components/AddTransaction";
import Table from "../../components/CustomTable";
import SectionHeading from "../../components/SectionHeading";
import { data } from "../../data";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTransactions(data.transactions);
      });
  }, []);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear() + 1);

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <SectionHeading
          title={"Transactions"}
          description={"List of your recent transactions"}
        />

        <AddTransaction />
      </div>

      {/* Transaction table */}
      <div className="mt-10">
        <table className="table-auto w-full bg-white border border-gray-300 overflow-hidden shadow-md rounded-xl">
          <thead className="rounded-xl border">
            <tr className="bg-gray-100">
              <th className="p-4 text-left text-gray-600 text-sm font-bold capitalize">
                Date
              </th>
              <th className="p-4 text-left text-gray-600 text-sm font-bold capitalize">
                Amount
              </th>
              <th className="p-4 text-left text-gray-600 text-sm font-bold capitalize">
                Description
              </th>
              <th className="p-4 text-left text-gray-600 text-sm font-bold capitalize">
                Category
              </th>
              <th className="p-4 text-left text-gray-600 text-sm font-bold capitalize">
                Wallet
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td className="p-4 border-b text-sm border-gray-200">
                  {formatDate(transaction.date)}
                </td>
                <td className="p-4 border-b text-sm border-gray-200">
                  {transaction.amount}
                </td>
                <td className="p-4 border-b text-sm border-gray-200">
                  {transaction.description}
                </td>
                <td className="p-4 border-b text-sm border-gray-200">
                  {transaction.category.name}
                </td>
                <td className="p-4 border-b text-sm border-gray-200">
                  {transaction.wallet.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
