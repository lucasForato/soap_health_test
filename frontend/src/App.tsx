import { PhoneBook } from "./components/PhoneBook";
import { BookUser } from "lucide-react";

function App() {
  return (
    <div className="w-screen justify-center flex drop-shadow-sm h-screen">
      <div className="drop-shadow-sm w-1/2 h-screen border">
        <div className="flex justify-center w-full h-fit p-5 items-center bg-blue-400">
          <BookUser style={{ color: "white", height: "2.25rem" }} />
          <h1 className="text-2xl px-5 text-white text-bold">Phone Book App</h1>
        </div>
        <div className='flex w-full h-full'>
          <PhoneBook />
        </div>
      </div>
    </div>
  );
}

export default App;
