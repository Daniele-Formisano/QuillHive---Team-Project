import { IconCircleDashedX } from "@tabler/icons-react";

export default function RemoveButton({ language, handleRemove }) {
  return (
    <div className="flex items-center justify-center">
      <button type="button" onClick={handleRemove}>
        <IconCircleDashedX stroke={2} size={24} color="red" />
      </button>
    </div>
  );
}
