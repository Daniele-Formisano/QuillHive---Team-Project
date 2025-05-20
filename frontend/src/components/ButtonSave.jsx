import React, { useEffect, useState } from "react";
import {
  useAddUserStoriesMutation,
  useGetUserStoryQuery,
} from "../services/apiService";
import { toast } from "react-hot-toast";
import { IconBookmarkFilled, IconBookmarkPlus } from "@tabler/icons-react";

export default function SaveButton({ storyId, userId }) {
  const [userStoryData, setUserStoryData] = useState();
  const [isSaved, setIsSaved] = useState();
  const { data: userStories } = useGetUserStoryQuery({
    userId: userId,
    storyId: storyId,
  });

  const [addUserStory] = useAddUserStoriesMutation();

  useEffect(() => {
    if (userStories) {
      const { userStory } = userStories;

      if (userStory.length) {
        setIsSaved(userStory[0].user_saved);
        setUserStoryData(userStory[0]);
      }
    }
  }, [userStories]);

  // funzione per il click del salvataggio/rimozione della storia dai salvati
  const handleClick = async () => {
    toast.promise(
      async () => {
        try {
          const userStoryUpdate = {
            userId: userId,
            storyId: storyId,
            status: userStoryData.status,
            saved: !isSaved,
          };
          await addUserStory(userStoryUpdate);
          setIsSaved(!isSaved);
        } catch (error) {
          throw error;
        }
      },
      {
        loading: "Loading...",
        success: !isSaved ? "story added to saved" : "story removed from saved",
        error: (error) => error?.data?.error || "Error",
      }
    );
  };

  if (userStories) {
    return (
      <button type="button" onClick={handleClick} className="cursor-pointer">
        <div className="bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2258%22%20height%3D%2264%22%20viewBox%3D%220%200%2058%2064%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M53.7921%2050.2939C55.9579%2049.0435%2057.2921%2046.7326%2057.2921%2044.2317L57.2921%2019.4784C57.2921%2016.9776%2055.9579%2014.6667%2053.7921%2013.4163L32.3551%201.03959C30.1893%20-0.210837%2027.5209%20-0.210836%2025.3551%201.03959L3.91813%2013.4163C1.75232%2014.6667%200.418129%2016.9776%200.418129%2019.4784L0.41813%2044.2318C0.41813%2046.7326%201.75232%2049.0435%203.91813%2050.2939L25.3551%2062.6706C27.5209%2063.921%2030.1893%2063.921%2032.3551%2062.6706L53.7921%2050.2939Z%22%20fill%3D%22%23F5C43D%22/%3E%3C/svg%3E')] bg-no-repeat bg-center bg-contain p-3">
          {isSaved ? (
            <IconBookmarkFilled color="#203955" />
          ) : (
            <IconBookmarkPlus stroke={2} color="#203955" />
          )}
        </div>
      </button>
    );
  }
}
