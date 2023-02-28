"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../firebase";
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

type Props = {
  chatId: string;
};
const ChatInput = ({ chatId }: Props) => {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  // TODO useSWR to get model
  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatar.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    // Notification toast loading
    const notification = toast.loading("ChatGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // Notification toast Successful
      toast.success("ChatGPT has responded!", {
        id: notification,
      });
    });
  };

  return (
    <>
      <div className="bg-gray-600/50 text-gray-200 rounded-lg text-sm w-[90%] xl:w-[70%] mx-auto mb-5 mt-5">
        <form
          onSubmit={sendMessage}
          method="post"
          className="flex p-3 md:p-4 space-x-5"
        >
          <input
            className="outline-none bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
            disabled={!session}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Get answers to your questions here..."
          />

          <button
            type="submit"
            disabled={!prompt || !session}
            className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-2 py-1 md:px-4 md:py-2  rounded cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="h-4 w-4 -rotate-45 " />
          </button>
        </form>
      </div>
      <div className="md:hidden w-[70%] mx-auto mb-5">
        <ModelSelection />
      </div>
    </>
  );
};

export default ChatInput;
