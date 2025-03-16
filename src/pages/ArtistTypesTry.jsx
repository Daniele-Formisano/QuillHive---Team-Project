import { useDispatch, useSelector } from "react-redux";
import Select_artist_type from "../components/Select_artist_type";
import { toggleArtistType } from "../features/global/globalSlice";
import { useGetArtistTypeQuery } from "../services/apiService";
import toast from "react-hot-toast";
import ButtonContinue from "../components/ButtonContinue";
import ButtonExplore from "../components/ButtonExplore";

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
      {/* INSERISCI CASO DI LOADING ED ERROR*/}
      {!isLoading && !error && (
        <div>
          <form onSubmit={() => {}}>
            <h2 className="font-title">Wich artist hides within you?</h2>
            <p>
              Select your creative role-choose at least 1 option, up to two, or
              just continue as a reader
            </p>
            <Select_artist_type
              list={data}
              selected={selectedArtistType}
              toggleGenre={toggleArtistAction}
            />
            <ButtonContinue />
          </form>
          <ButtonExplore />
        </div>
      )}
    </div>
  );
}
