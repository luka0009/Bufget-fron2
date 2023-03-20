import Graph from "./components/Graph";
import Form from './components/Form';
import LabelComponent from "./components/LabelComponent";

function App() {

  return (
    <div className="App bg-slate-800">
       <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
      <h1 className="text-4xl py-8 mb-10 bg-[cyan] text-slate-800 rounded">Manage your finances</h1>

      <div className="grid md:grid-cols-2 gap-4">
          <Graph></Graph>
          <Form></Form>
          <LabelComponent />
      </div>
    </div>
    </div>
  )
}

export default App;
