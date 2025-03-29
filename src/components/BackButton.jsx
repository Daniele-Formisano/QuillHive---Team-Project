import { useNavigate } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";

export default function BackButton({ pageURL }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => {
          navigate(pageURL);
        }}
      >
        <IconChevronLeft stroke={2} size={40} color="#203955" />

        {/*  <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.7071 9.29289C26.0976 9.68342 26.0976 10.3166 25.7071 10.7071L16.4142 20L25.7071 29.2929C26.0976 29.6834 26.0976 30.3166 25.7071 30.7071C25.3166 31.0976 24.6834 31.0976 24.2929 30.7071L14.2929 20.7071C13.9024 20.3166 13.9024 19.6834 14.2929 19.2929L24.2929 9.29289C24.6834 8.90237 25.3166 8.90237 25.7071 9.29289Z"
        fill="#203955"
      />
    </svg> */}
      </button>
    </div>
  );
}
