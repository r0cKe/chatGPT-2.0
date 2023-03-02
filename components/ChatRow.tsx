import {
  ChatBubbleLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

type Props = {
  id: string;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const ChatRow = ({ id, setShow }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && "bg-gray-500"}`}
      onClick={() => {
        if(window.innerWidth < 768) {
          setShow(false);
        }
      }}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 truncate">
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New chat"}
      </p>
      {/* <PencilSquareIcon className="h-5 w-6 text-gray-700 hover:text-white" /> */}
      <TrashIcon
        onClick={removeChat}
        className="h-5 w-5 text-gray-700 hover:text-red-700"
      />
    </Link>
  );
};

export default ChatRow;
