"use client";

import { signOut, useSession } from "next-auth/react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import { useEffect, useState } from "react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Sidebar = () => {
  const { data: session } = useSession();

  const [show, setShow] = useState(false);

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setShow(true);
    }
    window.addEventListener("resize", handleResize);
  });

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  return (
    <div
      className={`p-2 flex gap-5 md:flex-col md:h-screen ${
        !show ? "items-center" : ""
      }`}
    >
      <div className="flex-1 w-[50%] md:w-[100%]">
        {/* For small screen show Three bars*/}
        <div
          className={`text-gray-400 p-2 max-w-[42px] rounded-lg cursor-pointer ${
            show && "hidden"
          }`}
          onClick={() => setShow(true)}
        >
          <Bars3Icon className="h-6 w-6" />
        </div>
        {/* If bars are clicked show this */}
        <div className={`${!show && "hidden"}`}>
          <div
            className={`text-gray-400 p-2 max-w-[42px] rounded-lg cursor-pointer mb-3 ${
              show && window.innerWidth >= 768 && "hidden"
            }`}
            onClick={() => setShow(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </div>
          <div>
            <NewChat setShow={setShow} />
            <div>
              <ModelSelection />
            </div>

            {loading && (
              <div className="animate-pulse  text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}

            <div className="flex flex-col space-y-2 my-2">
              {chats?.docs.map((chat) => (
                <ChatRow key={chat.id} id={chat.id} setShow={setShow} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {session && (
        <div className="flex md:flex-col md:gap-2 flex-grow md:flex-grow-0 justify-end md:items-center">
          <img
            className="h-12 w-12 rounded-full mr-3 md:mx-auto"
            src={session.user?.image!}
            alt=""
          />
          <button
            onClick={() => signOut()}
            id="logout"
            className={`h-12 w-12 md:w-[100%] md:h-auto flex items-center justify-center gap-2  border font-bold p-2 text-gray-300 rounded-lg hover:bg-[#11A37F] transition duration-300 hover:border-transparent hover:text-white active:scale-90 ${
              window.innerWidth < 768 && "bg-[#11A37F] text-white border-none"
            }`}
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            {window.innerWidth >= 768 ? "Log out" : ""}
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
