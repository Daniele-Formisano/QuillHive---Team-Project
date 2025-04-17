import SaveButton from "./ButtonSave";
import { IconBookmark } from "@tabler/icons-react";
import { IconBook } from "@tabler/icons-react";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetChaptersByStoryIdQuery,
  useGetUsersQuery,
} from "../services/apiService";
import toast from "react-hot-toast";

export default function BookInfoList({ story, user }) {
  const navigate = useNavigate();
  const { id } = useParams();

  /* Chiamata per ricevere i capitoli della storia */
  const {
    data: storyChapters,
    isLoading: isLoadingStoryChapters,
    error: errorStoryChapters,
  } = useGetChaptersByStoryIdQuery(story.id);

  /* Chiamata per ricevere l'autore della storia */
  const {
    data: author,
    isLoading: isLoadingAuthor,
    error: errorAuthor,
  } = useGetUsersQuery({ id: story.userId });

  function handleClick() {
    if (storyChapters.length === 0) {
      toast.error("You can't read this story because there are no chapters")
      return;
    }
    navigate(`/story/${story.id}/read-story/chapter/${1}`);
  }

  function handleClickEdit() {
    navigate(`/stories/${story.id}/chapters`);
  }
  if (isLoadingStoryChapters || isLoadingAuthor) return <p>Loading...</p>;
  if (errorStoryChapters || errorAuthor) return <p>Error loading</p>;
  if (!storyChapters || !author) return <p>There is no data available</p>;

  return (
    <div className="flex flex-col gap-8">
      {/* Sezione che contiene la copertina del libro, il suo titolo e autore + buttonSave */}
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <img
            src={story.cover_image}
            width={150}
            height={230}
            className="border-transparent rounded-2xl "
          />
          <div className="absolute -bottom-4.5 -right-4.5">
            {user && <SaveButton storyId={story.id} userId={user.id} />}
          </div>
          {story.userId === user?.id && (
            <div
              className="absolute -bottom-4.5 -left-4.5"
              onClick={handleClickEdit}>
              <svg
                width="40"
                height="46"
                viewBox="0 0 40 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17 1.73205C18.8564 0.660254 21.1436 0.660254 23 1.73205L36.9186 9.76795C38.775 10.8397 39.9186 12.8205 39.9186 14.9641V31.0359C39.9186 33.1795 38.775 35.1603 36.9186 36.2321L23 44.2679C21.1436 45.3397 18.8564 45.3397 17 44.2679L3.08142 36.2321C1.22501 35.1603 0.0814152 33.1795 0.0814152 31.0359L0.0814152 14.9641C0.0814152 12.8205 1.22501 10.8397 3.08142 9.76795L17 1.73205Z"
                  fill="#F3BC26"
                />
                <path
                  d="M24.75 20.5833L21.25 16.75M11.1875 31.6041L14.1488 31.2438C14.5106 31.1997 14.6915 31.1777 14.8606 31.1178C15.0106 31.0646 15.1534 30.9895 15.285 30.8944C15.4334 30.7872 15.5621 30.6463 15.8195 30.3643L27.375 17.7083C28.3415 16.6498 28.3415 14.9335 27.375 13.875C26.4085 12.8164 24.8415 12.8164 23.875 13.875L12.3195 26.531C12.0621 26.8129 11.9334 26.9538 11.8356 27.1164C11.7488 27.2606 11.6801 27.4169 11.6316 27.5812C11.5768 27.7664 11.5567 27.9645 11.5165 28.3607L11.1875 31.6041Z"
                  stroke="#203955"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-script font-bold text-secondary-brand">
            {story.title}
          </h2>
          <h4 className="font-script-semibold font-medium text-secondary-brand">
            {author[0].username || "Autore sconosciuto"}
          </h4>
        </div>
      </div>

      {/* Sezione che contiene le info del libro  */}
      <div className="grid grid-cols-[1fr_auto_1fr] px-25 justify-center text-center">
        {/* Colonna sinistra: Saved */}
        <div className="flex flex-col items-center justify-center font-script text-secondary-brand">
          <IconBookmark stroke={2} color="#203955" size={32} />
          <p>Saved</p>
          <p className="font-extrabold">{story.likes}</p>
        </div>

        {/* Colonna centrale: Icona verticale */}
        <div className="flex justify-center items-center">
          <svg
            width="36"
            height="100%"
            viewBox="0 0 36 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none">
            <rect x="17" y="0" width="3" height="100%" fill="#203955" rx="3" />
          </svg>
        </div>

        {/* Colonna destra: Chapters */}
        <div className="flex flex-col items-center justify-center font-script text-secondary-brand">
          <IconBook stroke={2} color="#203955" size={32} />
          <p>Chapters</p>
          <p className="font-extrabold">{storyChapters?.length}</p>
        </div>
      </div>

      {/* Sezione che contiene il plot del libro */}
      <div className="flex flex-col justify-center items-center font-script-semibold text-secondary-brand px-10">
        <h5 className="self-start text-2xl">Plot</h5>
        <p>{story.plot}</p>
      </div>

      {/* Sezione che contiene i bottoni */}
      <div className="flex px-14 h-[40px]">
        <Button onClick={handleClick} type="button" isColorYellow={true}>
          Start reading
        </Button>
      </div>
    </div>
  );
}
