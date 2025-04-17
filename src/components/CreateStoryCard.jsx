import { useNavigate } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";

export default function CreateStoryCard() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate("/stories/create")}
      className="flex flex-col justify-center items-center rounded-2xl w-[150px] h-[230px] border-secondary-brand border-1 text-secondary-brand"
    >
      <div className="">
        <IconPlus stroke={2} />
      </div>
      <span>Create a new story!</span>
    </button>
  );
}
