import { PhoneBook } from "./components/PhoneBook";
import toast, { Toaster } from "react-hot-toast";
import { BookUser } from "lucide-react";

function App() {
  return (
    <div className="w-full justify-center flex h-screen">
      <div className="lg:border lg:w-3/4 xl:w-1/2 w-full h-full">
        <div className="flex justify-center w-full h-fit p-5 items-center bg-blue-400">
          <BookUser style={{ color: "white", height: "2.25rem" }} />
          <h1 className="text-2xl px-5 text-white text-bold">Phone Book App</h1>
        </div>
        <div className="flex w-full h-full">
          <Toaster />
          <PhoneBook />
        </div>
      </div>
    </div>
  );
}

export default App;
