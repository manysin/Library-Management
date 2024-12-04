import localFont from "next/font/local";
import "../app/globals.css";
// import StoreProvider from "./StoreProvider";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
        <Navbar />
          <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            {children}
            </div>
          </div>
    </div>
          
  );
}
