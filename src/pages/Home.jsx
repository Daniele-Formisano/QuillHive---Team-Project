import Navbar from "../components/navbar";
import Searchbar from "../components/Searchbar";

//div Header (hamburger menu, search, profile)
//travel in the hive(div( map of componet that displys authors))
// buzzing for you (no display if not logged) (div(map of card book component))
//hive's choice (div(map of card book component))
// footer navbar z index position absolute


function Home() {
  return (
    <div className="flex flex-col">
      <Searchbar />
      <Navbar />
    </div>
  );
}export default Home;
