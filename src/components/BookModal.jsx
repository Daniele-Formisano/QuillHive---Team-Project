import { useGetStoriesQuery } from "../services/apiService";
import SaveButton from "./ButtonSave";


function BookModal() {
  const {
    data: stories,
    error: storiesError,
    isLoading: storiesLoading,
  } = useGetStoriesQuery();

  if (storiesLoading) return <p>Loading</p>;
  if (storiesError) return <p>Error </p>;
  if (!stories || stories.length === 0) return <p>No stories</p>;
  return (
    <div className="flex flex-col gap-2 ">
     <div> <img src={stories.cover_image} alt="Book cover" /> <SaveButton className="fixed bottom-0 right-0"/> </div>
      <p className="text-8xl ">{stories.title}</p>
      <p>{stories.plot}</p>
      <div></div>
    </div>
  );
}
export default BookModal;
