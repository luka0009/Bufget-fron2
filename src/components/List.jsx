import "boxicons";
import { useEffect, useState } from "react";
import {
  useDeleteTransactionMutation,
  useGetLabelsQuery,
  useUpdateTransactionMutation,
} from "../redux/apiSlice";

export default function List() {
  const { data, isFetching, isSuccess, isError, error } = useGetLabelsQuery();
  const [deleteTransasction, result] = useDeleteTransactionMutation();
  // const [updateTransaction, updateResult] = useUpdateTransactionMutation();
  const [editState, setEditState] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [idForEdit, setIdForEdit] = useState("");
  const handleClick = (e) => {
    const id = e.target.id;
    deleteTransasction(id);
  };

  const handleEdit = async (e) => {
    setEditState(true);
    const id = e.target.id;
    setIdForEdit(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (["Income", "Investment/Saving", "Expense"].indexOf(type) === -1) {
      // type is not valid, show an error message
      alert("Please choose a valid transaction type.");
      return;
    }

    const data = {
      name: name,
      type: type,
      amount: amount,
    };
    console.log(idForEdit, data);
    // await updateTransaction(idForEdit, data).unwrap();
    const response = await fetch(
      `https://financial-management.onrender.com/api/transactions/${idForEdit}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log(result);
    setEditState(false);
    if (data.name !== '' && data.name !== null && data.name !== undefined) {
      setName("");
    }
  
    if (data.amount !== '' && data.amount !== null && data.amount !== undefined) {
      setAmount("");
    }
  
    setType("");
    location.reload();
  };

  let edits = (
    <form className="text-white" onSubmit={handleSubmit}>
      <label htmlFor="name">name</label>
      <br />
      <input
        className="text-black w-[200px] placeholder:text-gray-600 my-1"
        placeholder="...Name of the transaction"
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label htmlFor="type">type</label>
      <br />
      <select
        className="text-black w-[200px] my-1 py-1"
        name="type"
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      >
        <option value="" disabled selected>
          Choose one of the options
        </option>
        <option value="Expense">Expense</option>
        <option value="Income">Income</option>
        <option value="Investment/Saving">Investment/Saving</option>
      </select>
      <br />
      <label htmlFor="amount">amount</label>
      <br />
      <input
        className="mb-3 text-black w-[200px] placeholder:text-gray-600 my-1"
        type="text"
        placeholder=" ...Amount"
        name="amount"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <div className="flex gap-9 justify-center">
        <span
          className="text-md bg-blue-500 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => setEditState(false)}
        >
          Cancel
        </span>
        <span
          className="text-md bg-blue-500 px-3 py-1 rounded-md cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </span>
      </div>
    </form>
  );

  let transactions;
  if (isFetching) {
    transactions = <div>Fetching...</div>;
  } else if (isSuccess) {
    transactions = data?.transactions?.map((v, i) => (
      <Transaction
        key={i}
        category={v}
        i={i}
        handleClick={handleClick}
        handleEdit={handleEdit}
      ></Transaction>
    ));
  } else if (isError) {
    transactions = <div>Error fetching data</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl text-white">History</h1>
      {editState ? edits : transactions}
    </div>
  );
}

function Transaction({ category, handleClick, handleEdit }) {
  if (!category) return null;
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-md"
      style={{
        background: "blue",
        color: "white",
        borderRight: `8px solid ${(() => {
          if (category.type === "Expense") {
            return "red";
          } else if (category.type === "Income") {
            return "lawngreen";
          } else if (category.type === "Investment/Saving") {
            return "deeppink";
          } else {
            return "#e5e5e5";
          }
        })()}`,
      }}
    >
      <button className="px-3" onClick={handleClick}>
        <box-icon
          id={category._id}
          color={(() => {
            if (category.type === "Expense") {
              return "red";
            } else if (category.type === "Income") {
              return "lawngreen";
            } else if (category.type === "Investment/Saving") {
              return "deeppink";
            } else {
              return "#e5e5e5";
            }
          })()}
          size="21px"
          name="trash"
        ></box-icon>
      </button>
      <button onClick={handleEdit} className="cursor-pointer px-3 ml-[-19px]">
        <box-icon
          id={category._id}
          color={"white"}
          size="21px"
          name="edit"
        ></box-icon>
      </button>
      {/* ${category.type}  */}
      <span className="block w-full ml-[-10px]">
        {`${category.name} - $${category.amount}` ?? ""}
      </span>
    </div>
  );
}
