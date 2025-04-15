import { useSelector } from "react-redux";

export default function ProfileIcon({ user, onClick, width, height }) {
  return (
    <button onClick={onClick}>
      {user ? (
        <div
          className={`${
            size ? size : "w-[100px] h-[100px]"
          } flex items-center justify-center`}
        >
          <img
            src={user?.profile_picture}
            alt="Profile"
            className="w-full h-full object-cover"
            style={{
              clipPath:
                "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
            }}
          />
        </div>
      ) : (
        <div
          className={`${width ? width : "w-[100px]"} ${
            height ? height : "h-[100px]"
          }`}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 87 98"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M81.6025 77.188C84.6965 75.4017 86.6025 72.1004 86.6025 68.5278L86.6025 30.0748C86.6025 26.5021 84.6966 23.2008 81.6025 21.4145L48.3013 2.18802C45.2073 0.401694 41.3953 0.401694 38.3013 2.18802L5 21.4145C1.90599 23.2008 2.35795e-07 26.5021 2.31536e-07 30.0748L1.85696e-07 68.5278C1.81438e-07 72.1004 1.90599 75.4017 5 77.188L38.3013 96.4145C41.3953 98.2008 45.2073 98.2008 48.3013 96.4145L81.6025 77.188Z"
              fill="#F5C43D"
            />
            <g clipPath="url(#clip0_0_1)">
              <path
                d="M52.5769 62.8977C51.8667 62.8977 51.3933 63.3712 51.3933 64.0814V65.0283C51.3933 67.0407 50.4463 68.9346 48.7891 70.1183L44.4093 73.3144L39.9112 70.1184C38.254 68.9347 37.1886 67.0407 37.1886 64.91V64.0815C37.1886 63.3712 36.7151 62.8978 36.005 62.8978C35.2947 62.8978 34.8213 63.3713 34.8213 64.0815V64.9101C34.8213 67.751 36.2418 70.3552 38.4908 72.0124L43.6992 75.6819C43.9359 75.8003 44.1727 75.9186 44.4094 75.9186C44.6461 75.9186 44.8829 75.8002 45.1196 75.6819L50.2096 72.0124C52.4586 70.3552 53.7607 67.751 53.7607 65.0284V64.0815C53.7607 63.3712 53.2872 62.8977 52.5769 62.8977Z"
                fill="#203955"
              />
              <path
                d="M45.5929 28.6884C46.0664 27.2679 47.4868 26.2027 49.0256 26.2027C49.7359 26.2027 50.2093 25.7291 50.2093 25.019C50.2093 24.3088 49.7359 23.8352 49.0256 23.8352C47.1317 23.8352 45.3561 24.7822 44.2908 26.2027C43.2255 24.7822 41.45 23.8352 39.5559 23.8352C38.8457 23.8352 38.3723 24.3087 38.3723 25.0189C38.3723 25.729 38.8458 26.2027 39.5559 26.2027C41.0947 26.2027 42.5152 27.268 42.9886 28.6884C39.6742 29.3987 37.1885 32.2395 37.1885 35.6724C37.1885 36.3826 37.662 36.856 38.3722 36.856C39.0823 36.856 39.5559 36.3825 39.5559 35.6724C39.5559 33.0682 41.6866 30.9376 44.2907 30.9376C46.8949 30.9376 49.0255 33.0682 49.0255 35.6724C49.0255 36.3826 49.4991 36.856 50.2092 36.856C50.9194 36.856 51.3929 36.3825 51.3929 35.6724C51.3931 32.2395 48.9073 29.3987 45.5929 28.6884Z"
                fill="#203955"
              />
              <path
                d="M47.8426 65.2651H40.7403C40.0301 65.2651 39.5566 65.7387 39.5566 66.4488C39.5566 67.159 40.0302 67.6325 40.7403 67.6325H47.8426C48.5528 67.6325 49.0262 67.159 49.0262 66.4488C49.0262 65.7387 48.5528 65.2651 47.8426 65.2651Z"
                fill="#203955"
              />
              <path
                d="M47.8426 59.3467H40.7403C40.0301 59.3467 39.5566 59.8202 39.5566 60.5304C39.5566 61.2405 40.0302 61.714 40.7403 61.714H47.8426C48.5528 61.714 49.0262 61.2405 49.0262 60.5304C49.0262 59.8202 48.5528 59.3467 47.8426 59.3467Z"
                fill="#203955"
              />
              <path
                d="M45.5931 53.428H43.2257C42.5154 53.428 42.042 53.9015 42.042 54.6117C42.042 55.3218 42.5155 55.7953 43.2257 55.7953H45.5931C46.3034 55.7953 46.7768 55.3218 46.7768 54.6117C46.7768 53.9015 46.3034 53.428 45.5931 53.428Z"
                fill="#203955"
              />
              <path
                d="M64.2957 47.6279C59.4425 41.9461 45.238 37.0929 44.6462 36.8561C44.4095 36.7377 44.1727 36.7377 43.9359 36.8561C43.3441 37.0929 29.1395 41.9461 24.2863 47.6279C22.5108 49.7586 21.5638 52.4811 21.8005 55.0853C22.0372 57.4528 23.1026 59.4651 24.7598 60.8855C28.5476 64.0815 34.5846 63.2529 38.0174 59.1099C40.0297 56.7424 41.9236 52.481 43.4624 46.5626C43.5808 45.9707 43.2257 45.2605 42.6339 45.1421C42.042 45.0237 41.3318 45.3788 41.2134 45.9707C39.6746 51.5342 38.0174 55.5588 36.2417 57.5711C33.5192 60.7671 29.1395 61.3589 26.2986 58.9916C24.9965 57.9262 24.2863 56.5058 24.168 54.7302C24.0496 52.7179 24.6415 50.7055 26.0619 49.0483C30.0865 44.3135 41.9236 39.9337 44.2911 39.1052C46.5401 39.9337 58.4956 44.3135 62.5202 49.0483C63.9407 50.7055 64.6509 52.7179 64.4142 54.7302C64.2957 56.3874 63.4672 57.9262 62.2835 58.9916C59.4426 61.359 54.9445 60.6488 52.3404 57.5711C50.5648 55.4404 48.7892 51.4158 47.3688 45.9707C47.2503 45.3789 46.5402 45.0238 45.9483 45.1422C45.3563 45.2606 45.0013 45.9707 45.1196 46.5627C46.7768 52.4812 48.5523 56.7426 50.5647 59.11C52.577 61.4774 55.5363 62.7795 58.3772 62.7795C60.3895 62.7795 62.2834 62.1877 63.9406 60.8856C65.7162 59.4651 66.7815 57.3345 66.8999 55.0854C67.0183 52.4811 66.0714 49.7586 64.2957 47.6279Z"
                fill="#203955"
              />
            </g>
            <defs>
              <clipPath id="clip0_0_1">
                <rect
                  width="52.0833"
                  height="52.0833"
                  fill="white"
                  transform="translate(17 23)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      )}
    </button>
  );
}
