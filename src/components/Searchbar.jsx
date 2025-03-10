function Searchbar() {
  return (
    <div className="h-[50px] w-[225px] flex justify-center align-middle rounded-[50px] border border-stroke-brand gap-[10px] pl-5">
      <button>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.64566 0C10.3141 0 13.2913 2.97726 13.2913 6.64566C13.2913 10.3141 10.3141 13.2913 6.64566 13.2913C2.97726 13.2913 0 10.3141 0 6.64566C0 2.97726 2.97726 0 6.64566 0ZM6.64566 11.8145C9.50108 11.8145 11.8145 9.50108 11.8145 6.64566C11.8145 3.78951 9.50108 1.47681 6.64566 1.47681C3.78951 1.47681 1.47681 3.78951 1.47681 6.64566C1.47681 9.50108 3.78951 11.8145 6.64566 11.8145ZM12.911 11.8669L15 13.9552L13.9552 15L11.8669 12.911L12.911 11.8669Z"
            fill="#203955"
          />
        </svg>
      </button>

      <input
        type="text"
        className="placeholder-secondary-brand placeholder:text-[12px] w-auto  border border-transparent focus:border-0 focus:outline-none"
        placeholder="Search a book or author..."
      />
    </div>
  );
}
export default Searchbar;
