import { useGetLabelsQuery } from "../redux/apiSlice";

export default function LabelComponent({}) {
  const { data: labelsData } = useGetLabelsQuery();

  const investmentSavingTotal = labelsData?.transactions
    .filter((transaction) => transaction.type === "Investment/Saving")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const incomeTotal = labelsData?.transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenseTotal = labelsData?.transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalAmount = labelsData?.transactions.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);

  console.log(totalAmount);
  return (
    <>
      <div className="fixed scale-110 flex flex-col gap-3 w-[380px] md:ml-[100px] mt-[370px]">
        <div className="labels flex justify-between text-white">
          <div className="flex gap-2">
            <div
              className="w-2 h-2 rounded py-3"
              style={{
                background: `deeppink`,
              }}
            ></div>
            <h3 className="text-md">{"Investment/Saving"}</h3>
          </div>
          <h3 className="font-bold">
            {((investmentSavingTotal / totalAmount) * 100).toFixed(2)}% (${investmentSavingTotal})
          </h3>
        </div>
        <div className="labels flex justify-between text-white">
          <div className="flex gap-2">
            <div
              className="w-2 h-2 rounded py-3"
              style={{
                background: `lawngreen`,
              }}
            ></div>
            <h3 className="text-md">{"Income"}</h3>
          </div>
          <h3 className="font-bold">
            {((incomeTotal / totalAmount) * 100).toFixed(2)}% (${incomeTotal})
          </h3>
        </div>
        <div className="labels flex justify-between text-white">
          <div className="flex gap-2">
            <div
              className="w-2 h-2 rounded py-3"
              style={{
                background: `red`,
              }}
            ></div>
            <h3 className="text-md">{"Expense"}</h3>
          </div>
          <h3 className="font-bold">
            {((expenseTotal / totalAmount) * 100).toFixed(2)}% (${expenseTotal})
          </h3>
        </div>
      </div>
    </>
  );
}
