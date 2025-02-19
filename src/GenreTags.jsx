// selectedGenres sarà un array di tags selezionati che arriverà come prop da un secondo componente
// al momento ho inserito una versione statica su App
export default function GenreTags({ selectedGenres }) {
  const genres = [
    "Fantasy",
    "Romance",
    "Storico",
    "Comedy",
    "Horror",
    "Drammatico",
    "Thriller",
    "Avventura",
  ];

  const genreColors = {
    Fantasy: "bg-blue-200 text-blue-800",
    Romance: "bg-pink-200 text-pink-800",
    Storico: "bg-yellow-200 text-yellow-800",
    Comedy: "bg-green-200 text-green-800",
    Horror: "bg-red-200 text-red-800",
    Drammatico: "bg-purple-200 text-purple-800",
    Thriller: "bg-indigo-200 text-indigo-800",
    Avventura: "bg-orange-200 text-orange-800",
  };

  // togliendo la riga '{selectedGenres.includes(genre) && <span className="mr-1">X</span>}' si ha il componente standard
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre, index) => (
        <div
          key={index}
          className={`flex items-center rounded-full px-3 py-1 text-sm font-medium ${genreColors[genre]}`}
        >
          {selectedGenres.includes(genre) && <span className="mr-1">X</span>}
          {genre}
        </div>
      ))}
    </div>
  );
}
// la "X" erediterà automaticamente il colore del testo perché è all'interno dello stesso div a cui è applicato genreColors[genre].
