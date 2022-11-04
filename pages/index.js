import Link from "next/link";
import { Navbar } from "../components";

const Home = () => {
  return (
    <>
      <Navbar title="Home" />
      <div className="min-h-home z-10 flex items-center justify-center flex-col mx-7">
        <div className="max-h-home flex flex-col rounded-lg bg-white p-4">
          <img src="./BULSU LOGO.JPG" alt="logo" className="w-20 h-20 m-auto" />
          <h1 className="p-4 text-2xl text-center font-semibold">
            Hello there !
            <br />
            How would you like to continue?
          </h1>
          <div className="flex items-center justify-center gap-4 sm:flex-row flex-col">
            <Link href="./input_data_individually">
              <a className="ease-in-out duration-300 hover:bg-slate-300 hover:text-slate-900 transition-colors p-4 uppercase bg-slate-900 text-white font-semibold text-md rounded-md">
                Input Data Individually
              </a>
            </Link>
            <Link href="./import_data">
              <a className="ease-in-out duration-300 hover:bg-slate-300 hover:text-slate-900 transition-colors p-4 uppercase bg-slate-900 text-white font-semibold text-md rounded-md">
                Import Data
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
