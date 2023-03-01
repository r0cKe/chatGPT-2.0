"use client";

import { signOut, useSession } from "next-auth/react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
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

  // create an event listener
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
      className={`p-2 flex md:flex-col md:h-screen ${!show && "items-center"}`}
    >
      <div className="flex-1">
        {!show ? (
          <div
            className="text-gray-400 p-2 border border-transparent hover:border-gray-400 max-w-[42px] rounded-lg cursor-pointer"
            onClick={() => setShow(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </div>
        ) : (
          <>
            <div
              className={`text-gray-400 p-2 border border-transparent hover:border-gray-400 max-w-[42px] rounded-lg cursor-pointer mb-3 ${
                show && window.innerWidth >= 768 && "hidden"
              }`}
              onClick={() => setShow(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </div>
            <div>
              <NewChat />
              <div className="hidden sm:inline">
                <ModelSelection />
              </div>

              {loading && (
                <div className="animate-pulse  text-center text-white">
                  <p>Loading Chats...</p>
                </div>
              )}

              <div className="flex flex-col space-y-2 my-2">
                {chats?.docs.map((chat) => (
                  <ChatRow key={chat.id} id={chat.id} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      {session && (
        <div className=" flex flex-1 md:flex-grow-0 justify-end">
          <img
            onClick={() => signOut()}
            id="logout"
            className="h-12 w-12 rounded-full cursor-pointer mr-3 md:mx-auto md:mb-2 hover:opacity-50"
            src={session.user?.image!}
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
