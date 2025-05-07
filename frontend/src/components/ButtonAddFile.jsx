import { IconPencil } from "@tabler/icons-react";

export default function ButtonAddFile({ handleClick }) {
  return (
    <div className="flex justify-center items-center">
      <button
        type="button"
        onClick={handleClick}
        className="relative w-[40px] h-[44px]"
      >
        <svg
          width="41"
          height="41"
          viewBox="0 0 43 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 1.73205C18.8564 0.660254 21.1436 0.660254 23 1.73205L36.9186 9.76795C38.775 10.8397 39.9186 12.8205 39.9186 14.9641V31.0359C39.9186 33.1795 38.775 35.1603 36.9186 36.2321L23 44.2679C21.1436 45.3397 18.8564 45.3397 17 44.2679L3.08142 36.2321C1.22501 35.1603 0.0814152 33.1795 0.0814152 31.0359V14.9641C0.0814152 12.8205 1.22501 10.8397 3.08142 9.76795L17 1.73205Z"
            fill="#F3BC26"
          />
        </svg>
        <div className="absolute inset-0 flex justify-center items-center">
          <IconPencil stroke={2} color="#203955" size={24} />
        </div>
      </button>
      <button type="button" onClick={handleClick}></button>
    </div>
  );
}
