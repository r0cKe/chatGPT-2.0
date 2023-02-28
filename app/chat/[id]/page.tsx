import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";

type Props = {
  params: {
    id: string;
  };
};

const Chatpage = ({ params: { id } }: Props) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Main Chat section */}
      <Chat chatId={id} />

      {/* Chat input field */}
      <ChatInput chatId={id} />
    </div>
  );
};

export default Chatpage;
