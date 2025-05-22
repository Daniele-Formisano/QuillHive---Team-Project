import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import Button from "./Button";
import SaveButton from "./ButtonSave";
import { useNavigate } from "react-router-dom";
import { IconBook } from "@tabler/icons-react";
import {
  useAddUserStoriesMutation,
  useLazyGetUserStoryQuery,
} from "../services/apiService";

function BookModal({ story, isOpen, onClose, user }) {
  if (!story) return null;
  const navigate = useNavigate();

  const [triggerUserStory] = useLazyGetUserStoryQuery();
  const [addUserStory] = useAddUserStoriesMutation();

  console.log(user);

  async function handleClickReadStory() {
    if (user) {
      try {
        // per recuperare le informazioni della storia (saved, status) in base all'utente
        const response = await triggerUserStory({
          userId: user.id,
          storyId: story.id,
        }).unwrap();

        const { userStory } = response;

        // controllo se il record non esiste o lo status è diverso da reading non effetua la chiamata al DB
        if (!("status" in userStory) || userStory.status !== "reading") {
          await addUserStory({
            userId: user.id,
            storyId: story.id,
            status: "reading",
            saved: userStory[0]?.user_saved || false,
          });
        }
      } catch (error) {
        console.log(error);
      }

      navigate(`/story/${story.id}/read-story/chapter/${1}`);
    }
  }

  return (
    <>
      {/* //scurire background quando open  */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-[50]" />}
      <Dialog open={isOpen} onClose={onClose} className="relative z-[70]">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-xl space-y-4 border-transparent rounded-2xl bg-white px-3 pt-3 pb-7">
            <div className="relative ">
              {story.cover_image ? (
                <img
                  src={story.cover_image}
                  alt="cover book "
                  className="w-full h-full rounded-t-2xl rounded-br-[72px] rounded-bl-2xl "
                />
              ) : (
                <div className="flex flex-col justify-center items-center rounded-2xl min-w-[330px] min-h-[500px] border-secondary-brand border-1 text-secondary-brand">
                  <IconBook stroke={2} color="#203955" />
                  <span>{story.title}</span>
                </div>
              )}
              <div className=" absolute -bottom-1.5 right-2 ">
                {user && <SaveButton storyId={story.id} userId={user.id} />}
              </div>
            </div>
            {/* aggiungere un controllo che dia un numero massimo di caratteri per evitare che la modal venga coperta da header e navbar  */}
            <DialogTitle className="font-bold text-xl text-center text-secondary-brand whitespace-normal break-words">
              {story.title} - {story.author}
            </DialogTitle>
            <Description className="text-secondary-brand font-medium text-[14px] whitespace-normal break-words">
              {story.plot}
            </Description>

            <div className="flex gap-4 px-8">
              <Button
                isColorYellow={true}
                children={"Read book"}
                type={"button"}
                onClick={handleClickReadStory}
              />
              <Button
                isColorYellow={false}
                children={"More info"}
                type={"button"}
                onClick={() => navigate(`/story/${story.id}/info`)}
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
export default BookModal;
