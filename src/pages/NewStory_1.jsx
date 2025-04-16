import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import InputField from "../components/InputField";
import LoadCoverImg from "../components/LoadCoverImg";
import SelectOptions from "../components/SelectOptions";
import { useAddStoryMutation } from "../services/apiService";
import { useAddChapterMutation } from "../services/apiService";

export default function NewStory_1({ genres }) {
  const navigate = useNavigate();
  const [addStoryMutation] = useAddStoryMutation();
  const [storyGenres, setStoryGenres] = useState([]);
  const [addChapterMutation] = useAddChapterMutation();
  const user = useSelector((state) => state.global.user);
  const [newStory, setNewStory] = useState({
    title: "",
    plot: "",
    usersId: user.id,
    cover_image: null,
    status: "draft",
    likes: 0,
    created_at: new Date(),
    updated_at: null,
  });

  // Funzione per gestire la selezione e deselezione dei generi
  const toggleGenre = (genre) => {
    if (storyGenres.length >= 5 && !storyGenres.includes(genre)) {
      toast.error("You can't select more than 5 genres");
      return;
    }

    setStoryGenres((prevSelected) => {
      if (prevSelected.includes(genre)) {
        return prevSelected.filter((g) => g.id !== genre.id);
      } else {
        return [...prevSelected, genre];
      }
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setNewStory((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storyData = { ...newStory, genres: storyGenres };

    if (storyData.plot.trim() === "" || storyData.title.trim() === "") {
      toast.error("This field cannot be empty.");
      return;
    }

    try {
      const response = await addStoryMutation(storyData);

      if (response?.data?.id) {
        const createdStoryId = response.data.id;
        toast.success("Story created successfully!");

        // CREA IL CAPITOLO 1
        const firstChapterData = {
          storyId: createdStoryId,
          title: "Chapter",
          order: 1,
          content: "",
          created_at: new Date(),
          updated_at: null,
        };

        const createdChapter = await addChapterMutation(
          firstChapterData
        ).unwrap();

        if (createdChapter?.id) {
          // VAI DIRETTAMENTE ALLA PAGINA DI MODIFICA DEL CAPITOLO 1
          navigate(`/stories/${createdStoryId}/chapters/${createdChapter.id}`);
        } else {
          toast.error("Story created, but failed to create the first chapter.");
          navigate(`/stories/${createdStoryId}/chapters`);
        }
      } else {
        toast.error("Failed to create the story.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the story.");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="p-2">
        <BackButton pageURL={"/library"} />
      </div>

      <form
        className="pr-8 pl-8 pt-3 pb-3 gap-5 flex flex-col"
        onSubmit={handleSubmit}
      >
        <LoadCoverImg />
        <InputField
          placeholder="Choose a title"
          type="text"
          id="title"
          label="Title"
          value={newStory.title}
          onChange={handleInputChange}
          labelTextSize={"text-lg"}
        />
        <InputField
          placeholder="Write a brief description of your story"
          type="text"
          id="plot"
          label="Description"
          value={newStory.plot}
          onChange={handleInputChange}
          labelTextSize={"text-lg"}
        />
        <SelectOptions
          selectTitle="Add genres"
          paragraph="Select your creative role-choose at least 1 option, up to 5, or just continue as a reader"
          dataSelect={genres}
          placeholder="Select genres"
          arraySelectedItems={storyGenres}
          toggleItems={toggleGenre}
          selectTitleSize={"text-lg"}
        />
        <div className="flex flex-col gap-5 mt-10">
          <Button type={"submit"} isColorYellow={true}>
            Start Writing
          </Button>
          <Button
            type={"button"}
            onClick={() => {
              navigate("/home");
            }}
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}
