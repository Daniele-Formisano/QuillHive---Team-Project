import { IconEdit } from "@tabler/icons-react";

export default function ButtonEdit({ handleClick }) {
  return (
    <div className="flex items-center justify-center">
      <button type="button" onClick={handleClick}>
        <IconEdit stroke={2} color="#203955" size={40} />
      </button>
    </div>
  );
}
