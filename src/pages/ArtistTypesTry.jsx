import { useDispatch, useSelector } from "react-redux";
import Select_artist_type from "../components/Select_artist_type";
import { toggleArtistType } from "../features/global/globalSlice";
import { useGetArtistTypeQuery } from "../services/apiService";
import toast from "react-hot-toast";

export default function ArtistTypesTry() {
  const { data, isLoading, error } = useGetArtistTypeQuery();
  const { selectedArtistType } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  function toggleArtistAction(id) {
    if (selectedArtistType.length >= 2 && !selectedArtistType.includes(id)) {
      toast.error("You can't select more than 2 types");
      return;
    }
    dispatch(toggleArtistType(id));
  }

  return (
    <div>
      {!isLoading && !error && (
        <Select_artist_type
          list={data}
          selected={selectedArtistType}
          toggleGenre={toggleArtistAction}
        />
      )}
    </div>
  );
}
