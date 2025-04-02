import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import ChapInput from "../components/ChapInput";
import ChapDropdown from "../components/ChapDropdown";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function NewStory_2({ stories }) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.global.user);

  // LAVORA QUI
  // devo aggiungere all'ultima storia dello user
  // (quindi prendi le storie dello user e di queste quella con il biggest created_at)
  // devi aggiungere
  const [newChapter, setNewChapter] = useState({
    id: "1",
    storyId: "1",
    title: "Capitolo 1",
    order: 1,
    content: "",
    created_at: new Date(),
    updated_at: null,
  });

  function handleChange(e) {}
  function handleAddChapter() {}

  return (
    <form className="ml-4 mr-4">
      {/* BOTTONI */}
      <div className="flex justify-between mb-6">
        {/* INDIETRO */}
        <BackButton pageUrl="/NewStory_1" />
        {/* SAVE */}
        <span className="w-[110px] h-[40]">
          <Button
            onClick={() => {
              navigate(""); // url libreria
            }}
            type="submit"
            isColorYellow={true}
          >
            Save
          </Button>
        </span>
      </div>

      {/* CHAP DROPDOWN */}
      <ChapDropdown handleAddChapter={handleAddChapter} />
      {/* TEXT INPUT */}
      <ChapInput handleChange={handleChange} />
    </form>
  );
}
