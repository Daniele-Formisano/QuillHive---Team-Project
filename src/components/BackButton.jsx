import { useNavigate } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";

export default function BackButton({ pageURL, onClick }) {
  const navigate = useNavigate();

  return (
    <div className="inline-flex items-center">
      <button
        type="button"
        onClick={() => {
          if (pageURL) navigate(pageURL);
          else onClick();
        }}
      >
        <IconChevronLeft stroke={1.25} size={40} color="#203955" />
      </button>
    </div>
  );
}
