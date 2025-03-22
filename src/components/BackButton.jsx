import { useNavigate } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";

export default function BackButton({ pageURL }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        navigate(pageURL);
      }}
    >
      <IconChevronLeft stroke={1} />
    </button>
  );
}
