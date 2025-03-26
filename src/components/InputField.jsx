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
        className="text-sm text-secondary-brand font-script-semibold"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        className="px-4 py-3 text-sm border-2 border-stroke-brand rounded-4xl bg-white focus:outline-none focus:ring-primary-brand focus:border-primary-brand transition-all text-input-text-brand placeholder:text-gray-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...others}
      />
    </div>
  );
}
