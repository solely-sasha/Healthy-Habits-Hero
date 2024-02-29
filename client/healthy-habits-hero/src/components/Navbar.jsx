import { useContext } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function Navbar() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignout = async () => {
        try {
            const res = axios.get("/api/auth/signout", { withCredentials: true });
            setUser(null);
            navigate("/signin");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Disclosure as="nav" className="bg-customOrange">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 font-play ">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="-ml-2 mr-2 flex items-center md:hidden">
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-amber-100 hover:bg-customRed hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="block h-8 w-auto lg:hidden"
                                        src={logo}
                                        alt="logo"
                                    />
                                    <img
                                        className="hidden h-8 w-auto lg:block"
                                        src={logo}
                                        alt="logo"
                                    />
                                </div>
                                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                                    <Link
                                        to="/"
                                        className="text-gray-300 hover:bg-amber-100 hover:text-customRed px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Home
                                    </Link>

                                    {user ? (
                                        <>
                                            {user.role === "parent" && (
                                                <>
                                                    <Link
                                                        to="/add-child"
                                                        className="text-gray-300 hover:bg-amber-100 hover:text-customRed px-3 py-2 rounded-md text-sm font-medium"
                                                    >
                                                        Add Child
                                                    </Link>
                                                    <Link
                                                        to="/dashboard"
                                                        className="text-gray-300 hover:bg-amber-100 hover:text-customRed px-3 py-2 rounded-md text-sm font-medium"
                                                    >
                                                        Dashboard
                                                    </Link>
                                                </>
                                            )}
                                            {user.role === "child" && (
                                                <>
                                                    <Link
                                                        to="/child-dashboard"
                                                        className="text-gray-300 hover:bg-amber-100 hover:text-customRed px-3 py-2 rounded-md text-sm font-medium"
                                                    >
                                                        Dashboard
                                                    </Link>
                                                </>
                                            )}
                                     
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/signin"
                                                className="text-gray-300 hover:bg-amber-100 hover:text-customRed px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                Sign In
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    {user ? (
                                        <button
                                            onClick={handleSignout}
                                            className="relative inline-flex items-center rounded-md border border-transparent bg-customRed px-4 py-2 text-sm font-medium
                                                 text-gray-300 shadow-sm hover:bg-amber-100 hover:text-customRed focus:outline-none  focus:ring-offset-2
                                                  focus:ring-offset-gray-800"
                                        >
                                         
                                            <span>Signout</span>
                                        </button>
                                    ) : (
                                        <Link
                                            to="/signup"
                                            className="relative inline-flex items-center rounded-md border border-transparent bg-customRed px-4 py-2 text-sm font-medium
                                                 text-gray-300 shadow-sm hover:bg-amber-100 hover:text-customRed focus:outline-none  focus:ring-offset-2
                                                  focus:ring-offset-gray-800"
                                        >
                                            <PlusIcon
                                                className="-ml-1 mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                            <span>Create Account</span>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                            <Link
                                to="/"
                                className="text-gray-300 hover:bg-amber-100 hover:text-customRed block px-3 py-2 rounded-md text-base 
                                font-medium"
                            >
                                Home
                            </Link>

                            {user ? (
                                <>
                                    {user.role === "parent" && (
                                        <Link
                                            to="/add-child"
                                            className="text-gray-300 hover:bg-amber-100 hover:text-customRed block px-3 py-2 rounded-md text-base font-medium"
                                        >
                                            Add Child
                                        </Link>
                                    )}
                                    {user.role === "child" && (
                                        <Link
                                            to="/child-dashboard"
                                            className="text-gray-300 hover:bg-amber-100 hover:text-customRed block px-3 py-2 rounded-md text-base font-medium"
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleSignout}
                                        className="text-gray-300 hover:bg-amber-100 hover:text-customRed block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Signout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/signin"
                                        className="text-gray-300 hover:bg-amber-100 hover:text-customRed block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
