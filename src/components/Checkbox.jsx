export default function Checkbox({ id, children, checked }) {
  return (
    <label className="flex items-center gap-2" htmlFor={id}>
      <input type="checkbox" className="hidden peer" id={id} />
      <div className="w-6 h-6 rounded-sm border-2 border-primary-brand peer-checked:bg-primary-brand shrink-0 cursor-pointer flex justify-center items-center">
        {checked && (
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.16675 5.83325L4.50008 9.16659L12.8334 0.833251"
              stroke="#203955"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-sm font-script text-secondary-brand">
        <p>{children}</p>
      </span>
    </label>
  );
}
