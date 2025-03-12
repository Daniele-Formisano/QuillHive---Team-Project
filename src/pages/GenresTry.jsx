import { useEffect, useState } from "react";
import GenreList from "../components/GenresList";
import toast from "react-hot-toast";
import { useGetGenresQuery } from "../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { toggleGenre } from "../features/global/globalSlice";

export default function GenresTry() {
  const { data, isLoading, error } = useGetGenresQuery();
  const { selectedGenres } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  function toggleGenreAction(id) {
    // avvisiamo l'utente che non può selezionare più di 5 generi, permettiamo di deselezionare i generi anche quando sono 5
    if (selectedGenres.length >= 5 && !selectedGenres.includes(id)) {
      toast.error("You can't select more than 5 genres");
      return;
    }

    dispatch(toggleGenre(id));
  }

  // controlliamo che l'utente selezioni un massimo di 5 generi, se cosi fosse il nostro stato passa a true, per attivare l'alert della funzione

  return (
    <div>
      {!isLoading && !error && (
        <GenreList
          list={data}
          selected={selectedGenres}
          toggleGenre={toggleGenreAction}
        />
      )}
    </div>
  );
}
