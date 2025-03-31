import BackButton from "../components/BackButton";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

export default function NewStory_2() {
  const navigate = useNavigate();

  function handleChange() {}

  return (
    <form>
      {/* BOTTONI */}
      <div className="flex justify-between">
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
      <div></div>

      {/* TEXT INPUT */}
      <div className="ml-2 mr-2 h-[60vh]">
        <InputField
          id="body"
          type="textarea"
          placeholder="Write something..."
          value=""
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
