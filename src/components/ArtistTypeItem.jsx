import {
  IconBallpen,
  IconCamera,
  IconMovie,
  IconMusic,
  IconWritingSign,
} from "@tabler/icons-react";
import clsx from "clsx";

export default function ArtistTypeItem({
  artistType,
  selected,
  toggleArtistType,
}) {
  const svgArtistTypes = [
    {
      name: "writer",
      icon: <IconWritingSign stroke={1.25} size={35} color="#203955" />,
    },
    {
      name: "photographer",
      icon: <IconCamera stroke={1.25} size={35} color="#203955" />,
    },
    {
      name: "videomaker",
      icon: <IconMovie stroke={1.25} size={35} color="#203955" />,
    },
    {
      name: "illustrator",
      icon: <IconBallpen stroke={1.25} size={35} color="#203955" />,
    },
    {
      name: "musician",
      icon: <IconMusic stroke={1.25} size={35} color="#203955" />,
    },
  ];

  const iconForArtist = svgArtistTypes.find(
    (svg) => artistType.name.toLowerCase() === svg.name
  );

  return (
    <div>
      <label htmlFor={artistType.id}>
        <input
          type="checkbox"
          checked={selected}
          id={artistType.id}
          className="hidden"
          onChange={() => toggleArtistType(artistType.id)}
        />
        <div className="flex flex-col justify-center">
          <div className="p-3 absolute bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2258%22%20height%3D%2264%22%20viewBox%3D%220%200%2058%2064%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M53.7921%2050.2939C55.9579%2049.0435%2057.2921%2046.7326%2057.2921%2044.2317L57.2921%2019.4784C57.2921%2016.9776%2055.9579%2014.6667%2053.7921%2013.4163L32.3551%201.03959C30.1893%20-0.210837%2027.5209%20-0.210836%2025.3551%201.03959L3.91813%2013.4163C1.75232%2014.6667%200.418129%2016.9776%200.418129%2019.4784L0.41813%2044.2318C0.41813%2046.7326%201.75232%2049.0435%203.91813%2050.2939L25.3551%2062.6706C27.5209%2063.921%2030.1893%2063.921%2032.3551%2062.6706L53.7921%2050.2939Z%22%20fill%3D%22%23F5C43D%22/%3E%3C/svg%3E')] bg-no-repeat bg-center bg-contain -translate-x-2">
            {iconForArtist.icon}
          </div>
          <span
            className={clsx(
              "rounded-4xl text-sm px-4 py-2 flex justify-center font-script-bold items-center border-2 border-secondary-brand transition-all",
              selected
                ? "bg-secondary-brand text-primary-brand"
                : "border-secondary-brand text-secondary-brand"
            )}
          >
            {artistType.name}
          </span>
        </div>
      </label>
    </div>
  );
}
