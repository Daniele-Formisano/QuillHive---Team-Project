import React, { useEffect, useState } from "react";
import {
  useAddUserStoryMutation,
  useGetUserStoriesQuery,
  useUpdateUserStoriesMutation,
} from "../services/apiService";
import { toast } from "react-hot-toast";

export default function SaveButton({ storyId, userId }) {
  const [userStory, setUserStory] = useState();
  const [isSaved, setIsSaved] = useState();
  const { data: userStories } = useGetUserStoriesQuery({
    userId: userId,
    storyId: storyId,
  });

  useEffect(() => {
    if (userStories) {
      if (userStories.length) {
        setUserStory(userStories[0]);
        setIsSaved(userStories[0].saved);
      }
    }
  }, [userStories]);

  const [addUserStory] = useAddUserStoryMutation();
  const [updateUserStories] = useUpdateUserStoriesMutation();

  const handleClick = async () => {
    switch (userStory?.saved) {
      case undefined:
        try {
          await addUserStory({
            userId: String(userId),
            storyId: String(storyId),
            status: null,
            saved: true,
          }).unwrap();

          setIsSaved(true);
          toast.success("book added to saved");
        } catch (error) {
          toast.error("Errore durante il salvataggio!");
          console.error("Errore nel salvataggio:", error);
        }
        break;
      case false:
        try {
          await updateUserStories({ ...userStory, saved: !isSaved });

          setIsSaved(!isSaved);
          toast.success("book added to saved");
        } catch (error) {
          toast.error("Error during the save");
          console.error("Errore nel salvataggio:", error);
        }
        break;

      case true:
        try {
          await updateUserStories({ ...userStory, saved: !isSaved });

          setIsSaved(!isSaved);
          toast.success("book removed by saved");
        } catch (error) {
          toast.error("Error during the save");
          console.error("Errore nel salvataggio:", error);
        }
        break;
    }
  };

  const IconUnclicked = (
    <svg
      width="40"
      height="46"
      viewBox="0 0 40 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 1.73205C18.8564 0.660254 21.1436 0.660254 23 1.73205L36.9186 9.76795C38.775 10.8397 39.9186 12.8205 39.9186 14.9641V31.0359C39.9186 33.1795 38.775 35.1603 36.9186 36.2321L23 44.2679C21.1436 45.3397 18.8564 45.3397 17 44.2679L3.08142 36.2321C1.22501 35.1603 0.0814152 33.1795 0.0814152 31.0359L0.0814152 14.9641C0.0814152 12.8205 1.22501 10.8397 3.08142 9.76795L17 1.73205Z"
        fill="#F3BC26"
      />
      <g clipPath="url(#clip0_0_1)">
        <path
          d="M20 28L14 32V18C14 16.9391 14.4214 15.9217 15.1716 15.1716C15.9217 14.4214 16.9391 14 18 14H22C23.0609 14 24.0783 14.4214 24.8284 15.1716C25.5786 15.9217 26 16.9391 26 18V23"
          stroke="#203955"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 30H30"
          stroke="#203955"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27 27V33"
          stroke="#203955"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_1">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(8 11)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  const IconClicked = (
    <svg
      width="40"
      height="46"
      viewBox="0 0 40 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 1.73205C18.8564 0.660254 21.1436 0.660254 23 1.73205L36.9186 9.76795C38.775 10.8397 39.9186 12.8205 39.9186 14.9641V31.0359C39.9186 33.1795 38.775 35.1603 36.9186 36.2321L23 44.2679C21.1436 45.3397 18.8564 45.3397 17 44.2679L3.08142 36.2321C1.22501 35.1603 0.0814152 33.1795 0.0814152 31.0359L0.0814152 14.9641C0.0814152 12.8205 1.22501 10.8397 3.08142 9.76795L17 1.73205Z"
        fill="#F3BC26"
      />
      <g clipPath="url(#clip0_0_1)">
        <path
          d="M26 18V32L20 28L14 32V18C14 16.9391 14.4214 15.9217 15.1716 15.1716C15.9217 14.4214 16.9391 14 18 14H22C23.0609 14 24.0783 14.4214 24.8284 15.1716C25.5786 15.9217 26 16.9391 26 18Z"
          fill="#203955"
          stroke="#203955"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_1">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(8 11)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  if (userStories) {
    return (
      <button type="button" onClick={handleClick} className="cursor-pointer">
        {isSaved ? IconClicked : IconUnclicked}
      </button>
    );
  }
}
