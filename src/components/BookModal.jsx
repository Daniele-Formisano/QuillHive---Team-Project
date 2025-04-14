import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import Button from "./Button";
import SaveButton from "./ButtonSave";
import { useNavigate } from "react-router-dom";

function BookModal({ story, isOpen, onClose, user }) {
  if (!story) return null;
  const navigate = useNavigate();

  return (
    <>
      {/* //scurire background quando open  */}
      {isOpen && <div className="fixed inset-0 bg-bg-brand z-20" />}
      <Dialog open={isOpen} onClose={onClose} className="relative z-40">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-xl space-y-4 border-transparent rounded-2xl bg-white px-3 pt-3 pb-7">
            <div className="relative ">
              <img
                src={story.cover_image}
                alt="cover book "
                className="w-full h-[400px] rounded-t-2xl rounded-br-[72px] rounded-bl-2xl "
              />
              <div className=" absolute -bottom-1.5 right-2 ">
                {user && <SaveButton storyId={story.id} userId={user.id} />}
              </div>
            </div>
            {/* aggiungere un controllo che dia un numero massimo di caratteri per evitare che la modal venga coperta da header e navbar  */}
            <DialogTitle className="font-bold text-xl text-center text-secondary-brand whitespace-normal break-words">
              {story.title} - {story.authorName}
            </DialogTitle>
            <Description className="text-secondary-brand font-medium text-[14px] whitespace-normal break-words">
              {story.plot}
            </Description>

            <div className="flex gap-4 px-8">
              <Button
                isColorYellow={true}
                children={"Read book"}
                type={"button"}
                onClick={() =>
                  navigate(`/story/${story.id}/read-story/chapter/${1}`)
                }
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
