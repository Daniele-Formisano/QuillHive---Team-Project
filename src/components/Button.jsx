import clsx from "clsx";

export default function Button({ children, isColorYellow, onClick, type }) {
  return (
    <div className="flex-grow flex">
      <button
        type={type}
        onClick={onClick}
        className={clsx(
          "px-4 py-1 rounded-[50px] text-secondary-brand font-script text-center cursor-pointer transition-all flex-grow",
          isColorYellow ? "bg-primary-brand" : "border-2 border-secondary-brand"
        )}
      >
        {children}
      </button>
    </div>
  );
}
