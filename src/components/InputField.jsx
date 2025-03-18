export default function InputField({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  ...others
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-sm text-secondary-brand font-script text-[14px]"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        className="px-4 py-3 text-sm text-gray-800 border-2 border-stroke-brand rounded-4xl bg-white focus:outline-none focus:ring-primary-brand focus:border-primary-brand transition-all"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...others}
      />
    </div>
  );
}
