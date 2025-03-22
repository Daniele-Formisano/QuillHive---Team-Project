import { IconUpload } from "@tabler/icons-react";

export default function LoadCoverImg() {
  const handleClick = () => {};

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center w-[150px] h-[230px] bg-primary-brand rounded-[12px] shadow-lg">
        <button
          className="flex flex-col items-center gap-2.5 font-script text-secondary-brand"
          onClick={handleClick}
        >
          <IconUpload stroke={1.5} />
          Load an Image
        </button>
      </div>
    </div>
  );
}
