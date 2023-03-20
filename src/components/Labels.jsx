import React from "react";
import { useGetCategoriesQuery, useGetLabelsQuery } from "../redux/apiSlice";
import LabelComponent from "./LabelComponent";

export default function Labels() {
  const { data, isFetching, isSuccess, isError, error } = useGetLabelsQuery();

  console.log(data);

  let transactions;
  if (isFetching) {
    transactions = <div>Fetching...</div>;
  } else if (isSuccess) {
    <div> asdlaslkdjaskldj</div>  
  } else if (isError) {
    transactions = <div>Error fetching data</div>;
  }

  return <>{transactions}</>;
}

