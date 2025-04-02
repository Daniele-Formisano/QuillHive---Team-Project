import { useState } from "react";
import BackButton from "../components/BackButton";
import InputField from "../components/InputField";
import LoadCoverImg from "../components/LoadCoverImg";
import SelectOptions from "../components/SelectOptions";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAddStoryMutation } from "../services/apiService";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function NewStory_1({ genres }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.global.user);
  const [addStoryMutation] = useAddStoryMutation();
  const [storyGenres, setStoryGenres] = useState([]); // Stato per la selezione dei generi
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

    toast.promise(addStoryMutation(storyData).unwrap(), {
      loading: "Creating story...",
      success: "Story created and added successfully",
      error: "Error",
    });
  };

  return (
    <form
      className="pr-8 pl-8 pt-3 pb-3 gap-5 flex flex-col"
      onSubmit={handleSubmit}
    >
      <BackButton pageUrl="" /> {/* DEVI COLLEGARE IL PATH della libreria */}
      <LoadCoverImg />
      <InputField
        placeholder="Choose a title"
        type="text"
        id="title"
        label="Title"
        value={newStory.title}
        onChange={handleInputChange}
      />
      <InputField
        placeholder="Write a brief description of your story"
        type="text"
        id="plot"
        label="Description"
        value={newStory.plot}
        onChange={handleInputChange}
      />
      <SelectOptions
        selectTitle="Add genres"
        paragraph="Select your creative role-choose at least 1 option, up to 5, or just continue as a reader"
        dataSelect={genres}
        placeholder="Select genres"
        arraySelectedItems={storyGenres}
        toggleItems={toggleGenre}
      />
      <div className="flex flex-col gap-5 mt-30">
        <Button
          onClick={() => {
            navigate("/NewStory_2");
          }}
          type="submit"
          isColorYellow={true}
        >
          Start Writing
        </Button>
        <Button
          onClick={() => {
            navigate("url");
          }}
        >
          Back
        </Button>
      </div>
    </form>
  );
}
