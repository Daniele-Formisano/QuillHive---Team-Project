import clsx from "clsx";

export default function Button({ children, iscolorYellow, onClick, type }) {
  return (
    <div className="flex-grow flex">
      <button
        type={type}
        onClick={onClick}
        className={clsx(
          "px-4 py-1 rounded-[50px] text-secondary-brand font-semibold text-center cursor-pointer transition-all flex-grow",
          iscolorYellow ? "bg-primary-brand" : "border-2 border-secondary-brand"
        )}
      >
        {children}
      </button>
    </div>
  );
}
