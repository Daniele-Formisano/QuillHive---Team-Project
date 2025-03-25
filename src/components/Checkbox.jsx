import { IconCheck } from "@tabler/icons-react";

export default function Checkbox({
  id,
  children,
  checked,
  onChange,
  ...others
}) {
  return (
    <label className="flex items-center gap-3" htmlFor={id}>
      <input
        type="checkbox"
        className="hidden peer"
        id={id}
        checked={checked}
        onChange={onChange}
        {...others}
      />
      <div className="w-6 h-6 rounded-sm border-2 border-primary-brand peer-checked:bg-primary-brand shrink-0 cursor-pointer flex justify-center items-center">
        {checked && <IconCheck stroke={2} />}
      </div>
      <span className="text-sm font-script text-secondary-brand">
        <p>{children}</p>
      </span>
    </label>
  );
}
