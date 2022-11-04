import React from "react";
import Link from "next/link";
import { HeaderLayout } from "../../components";

const Navbar = ({ title }) => {
  const links = [
    {
      name: "Import Data",
      link: "/import_data",
    },
    {
      name: "Input Data Individually",
      link: "/input_data_individually",
    },
    {
      name: "Cluster Visualization",
      link: "/visualization",
    },
    {
      name: "Cluster Graph",
      link: "/graph",
    },
  ];
  return (
    <>
      <HeaderLayout title={title} />
      <div>
        <div className="p-4 flex items-center justify-between bg-black/80 w-full text-white sticky top-0">
          <input type="checkbox" id="burger" className="hidden" />
          <div
            id="drawer"
            className="fixed top-16 rounded-md bg-white text-black transition-all"
          >
            <div
              id="triangle"
              className="bg-white absolute -top-4 left-2 w-4 h-4"
            ></div>
            <ul>
              {links.map(({ name, link }, index) => (
                <li
                  key={index}
                  className="font-semibold text-md cursor-pointer hover:bg-slate-900 hover:text-white"
                >
                  <Link href={link}>
                    <a className="block p-4">{name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <label htmlFor="burger" className="cursor-pointer">
            <img
              htmlFor="burger"
              src="./menuicon.png"
              alt="menuicon"
              className="w-10 h-10"
            />
          </label>
          <Link href="/">
            <div className="cursor-pointer flex items-center gap-4 ">
              <img
                src="BULSU LOGO.JPG"
                alt="icon"
                className="w-7 h-7 rounded-full"
              />
              <p>Bulacan State University</p>
            </div>
          </Link>
          <span className="sm:block hidden"></span>
        </div>
        <img
          src="BACKGROUND.JPG"
          alt="bg"
          className="w-screen h-screen object-cover fixed top-0 left-0 -z-10"
        />
      </div>
    </>
  );
};

export default Navbar;
