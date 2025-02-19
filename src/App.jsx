import GenreTags from "./GenreTags";
import Button from "./components/Button";
import HamburgerMenu from "./components/hamburgerMenu";
import InputField from "./InputField";

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

  return (
    <div className="p-8">
      <HamburgerMenu />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <InputField
          label="E-mail or username"
          id="username"
          type="text"
          placeholder="E-mail or username"
        />
        <InputField
          label="Password"
          id="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <div className="flex flex-col items-center gap-8">
        <Button
          textType="signup"
          bg="brand-yellow"
          hover="brand-yellow-hover"
        />
        <Button textType="login" bg="brand-yellow" hover="brand-yellow-hover" />
        <Button
          textType="startReading"
          bg="brand-yellow-border"
          hover="brand-yellow-hover"
        />
      </div>
      <GenreTags selectedGenres={selectedGenres} />;
    </div>
  );
}

export default App;
