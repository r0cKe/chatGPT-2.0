import { PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { db } from "../firebase";

type Props = {
  setShow: Dispatch<SetStateAction<boolean>>;
};

const NewChat = ({setShow} : Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const createNewChat = async () => {
    if(window.innerWidth < 768) {
      setShow(false);
    }
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
        name: "New chat"
      }
    );
    router.push(`/chat/${doc.id}`);
  };
  return (
    <div onClick={createNewChat} className="border-gray-700 border chatRow">
      <PlusIcon className="h-4 w-4" />
      <p className="">New chat</p>
    </div>
  );
};

export default NewChat;
