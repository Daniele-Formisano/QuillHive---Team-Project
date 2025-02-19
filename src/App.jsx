import GenreTags from "./GenreTags";

function App() {
  const selectedGenres = [
    "Fantasy",
    "Romance",
    "Storico",
    "Comedy",
    "Horror",
    "Drammatico",
    "Thriller",
    "Avventura",
  ];
  return <GenreTags selectedGenres={selectedGenres} />;
}

export default App;
