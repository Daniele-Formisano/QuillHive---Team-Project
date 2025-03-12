import { useEffect, useState } from "react";
import GenreList from "../components/GenresList";
import toast from "react-hot-toast";

const genreList = [
  {
    id: 1,
    name: "Action",
  },
  {
    id: 2,
    name: "Adventure",
  },
  {
    id: 3,
    name: "Fantasy",
  },
  {
    id: 4,
    name: "Sci-fi",
  },
  {
    id: 5,
    name: "Dystopian",
  },
  {
    id: 6,
    name: "Urban Fantasy",
  },
  {
    id: 7,
    name: "Supernatural",
  },
  {
    id: 8,
    name: "Crime",
  },
  {
    id: 9,
    name: "Horror",
  },
  {
    id: 10,
    name: "Historical Fiction",
  },
  {
    id: 11,
    name: "Romance",
  },
  {
    id: 12,
    name: "Comedy",
  },
  {
    id: 13,
    name: "True Crime",
  },
  {
    id: 14,
    name: "Paranormal",
  },
  {
    id: 15,
    name: "History",
  },
  {
    id: 16,
    name: "Magical Realism",
  },
  {
    id: 17,
    name: "Mystery",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 19,
    name: "Contemporary",
  },
  {
    id: 20,
    name: "Mythology",
  },
  {
    id: 21,
    name: "Thriller",
  },
  {
    id: 22,
    name: "Steampunk",
  },
  {
    id: 23,
    name: "Young Adult",
  },
  {
    id: 24,
    name: "Poetry",
  },
  {
    id: 25,
    name: "LGBTQ+",
  },
  {
    id: 26,
    name: "Psychology",
  },
];

export default function GenresTry() {
  const [selected, setSelected] = useState([]);
  const [maxFive, setMaxFive] = useState(false);

  function toggleGenre(id) {
    // avvisiamo l'utente che non può selezionare più di 5 generi, permettiamo di deselezionare i generi anche quando sono 5
    if (maxFive && !selected.includes(id)) {
      toast.error("You can't select more than 5 genres");
      return;
    }

    // creiamo un array che prende tutti i generi selezionati
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((genreId) => genreId !== id)
        : [...prevSelected, id]
    );
  }

  // controlliamo che l'utente selezioni un massimo di 5 generi, se cosi fosse il nostro stato passa a true, per attivare l'alert della funzione
  useEffect(() => {
    if (selected.length >= 5) {
      setMaxFive(true);
    } else {
      setMaxFive(false);
    }
  }, [selected]);

  return (
    <div>
      <GenreList
        list={genreList}
        selected={selected}
        toggleGenre={toggleGenre}
      />
    </div>
  );
}
