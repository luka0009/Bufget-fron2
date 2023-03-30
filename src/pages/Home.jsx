import Graph from "../components/Graph";
import LabelComponent from "../components/LabelComponent";
import Form from "../components/Form";
import { useGetLabelsQuery } from "../redux/apiSlice";

export default function Home() {
  const { isLoading } = useGetLabelsQuery();
  return (
    <div className="App bg-slate-800 min-h-screen">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        <h1 className="text-4xl py-8 mb-10 bg-[cyan] text-slate-800 rounded">
          Manage your finances
        </h1>

        {/* {isLoading ? <div className="text-white text-[44px]"> Loading... </div> : <div className="grid md:grid-cols-2 gap-4">
          <Graph></Graph>
          <Form></Form>
          <LabelComponent />
        </div>} */}
        {isLoading ? (
          <div className="flex flex-col gap-5 items-center justify-center text-white text-[44px]">
            <div className="animate-spin mr-4">
              <svg
                className="w-32 h-32 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.981 1.657 5.602 4 6.965v-2.674zm16-2.674A7.962 7.962 0 0120 12h4c0 2.981-1.657 5.602-4 6.965v-2.674zM12 20a8 8 0 008-8h-4a4 4 0 11-8 0H4a8 8 0 008 8z"
                ></path>
              </svg>
            </div>
            <div>Please wait, it might take a while to load.</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            <Graph></Graph>
            <Form></Form>
            <LabelComponent />
          </div>
        )}
      </div>
    </div>
  );
}
