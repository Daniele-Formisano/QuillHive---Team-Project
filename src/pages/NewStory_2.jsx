import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function NewStory_2() {
  const navigate = useNavigate();

  return (
    <span>
      <BackButton pageUrl="/NewStory_1" />
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
  );
}
