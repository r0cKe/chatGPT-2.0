import {
  ChatBubbleLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  updateDoc,
} from "firebase/firestore";
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
  const [chatName, setChatName] = useState("");
  const [editable, setEditable] = useState(false);

  const handleChatName = async () => {
    const chatDoc = await getDoc(
      doc(db, "users", session?.user?.email!, "chats", id)
    );
    const response = chatDoc?.data();
    if (response) {
      setChatName(response.name);
    }
  };

  useEffect(() => {
    handleChatName();
  }, []);

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  const updateChatName = async () => {
    setEditable(false);
    await updateDoc(doc(db, "users", session?.user?.email!, "chats", id), {
      name: chatName,
    });
  };

  const deleteChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && "bg-[#343541]"}`}
      onClick={(e) => {
        let target = e.target as Element;
        if (window.innerWidth < 768 && target.classList.contains("close")) {
          setShow(false);
        }
      }}
    >
      <ChatBubbleLeftIcon className="h-4 w-4" />
      {editable ? (
        <input
          type="text"
          className={`flex-1 outline-none bg-transparent`}
          contentEditable={editable}
          onChange={(e) => setChatName(e.target.value)}
          onBlur={updateChatName}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateChatName();
            }
          }}
          value={chatName}
          autoFocus
        />
      ) : (
        <p className={`flex-1 truncate close`}>{chatName}</p>
      )}

      <div className={`${!active && "hidden"} flex gap-2`}>
        <PencilSquareIcon
          onClick={() => {
            if (!editable) {
              setEditable(true);
            }
          }}
          className="h-4 w-4 text-gray-400 hover:text-orange-300"
        />
        <TrashIcon
          onClick={deleteChat}
          className="h-4 w-4 text-gray-400 hover:text-red-600/70 close"
        />
      </div>
    </Link>
  );
};

export default ChatRow;
