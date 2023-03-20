import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Labels from "./Labels";
import { useGetLabelsQuery } from "../redux/apiSlice";

Chart.register(ArcElement);

export default function Graph() {
  const { data, isFetching, isSuccess, isError, error } = useGetLabelsQuery();

  console.log(data);
  const investmentSavingTotal = data?.transactions
    .filter((transaction) => transaction.type === "Investment/Saving")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const incomeTotal = data?.transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenseTotal = data?.transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalAmount = data?.transactions.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
  console.log("Investment/Saving Total: ", investmentSavingTotal);
  console.log("Income Total: ", incomeTotal);
  console.log("Expense Total: ", expenseTotal);

  const config = {
    data: {
      datasets: [
        {
          data: [investmentSavingTotal, incomeTotal, expenseTotal],
          backgroundColor: [
            "deeppink", //inv
            "lawngreen", // income
            "red", // exp
          ],
          hoverOffset: 10,
          borderRadius: 10,
          spacing: 9,
        },
      ],
    },
    // options : {
    //     cutout: 100
    // }
  };
  return (
    <div className="mt-[150px]">
      <div className="flex justify-center items-center mx-auto md:mt-[-150px]">
        <div className="item">
          <div className="chart relative">
            <Doughnut {...config}></Doughnut>
            <h3 className="mb-4 font-bold title">
              Total
              <span className="block text-3xl text-emerald-400">
                ${totalAmount}
              </span>
            </h3>
          </div>
          <div className="flex flex-col py-8 gap-4">
            <Labels></Labels>
          </div>
        </div>
      </div>
    </div>
  );
}
