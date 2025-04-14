import { useSelector } from "react-redux";
import { IconHexagon } from "@tabler/icons-react";

export default function ProfileIcon({ onClick }) {
  return (
    <div className="bg-primary-brand w-10 h-10">
      <button className="bg-primary-brand w-10 h-10" onClick={onClick}></button>
    </div>
  );
}
