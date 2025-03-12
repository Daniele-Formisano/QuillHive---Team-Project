import FilterButton from "./FilterButton";

export default function FilterList() {
  return (
    <div className="grid grid-cols-3 justify-between w-screen items-center p-1 border-2 border-[#FAF5E6] rounded-4xl">
      <FilterButton active={true}>Reading now</FilterButton>
      <FilterButton active={false}>My creations</FilterButton>
      <FilterButton active={false}>Favorites</FilterButton>
    </div>
  );
}
