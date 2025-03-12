import clsx from "clsx";

export default function FilterButton({ children, active }) {
  return (
    <button
      className={clsx(
        "text-[14px] text-secondary-brand font-script hover:cursor-pointer transition-all text-center py-1 px-5",
        active
          ? "bg-primary-brand rounded-4xl"
          : "hover:bg-gray-300/50 rounded-4xl"
      )}
    >
      {children}
    </button>
  );
}
