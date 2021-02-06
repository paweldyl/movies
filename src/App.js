import React, { useEffect } from "react";
import Header from "./components/Header";
import Movies from "./components/Movies";

function App() {
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=2cdaf6cbedf866a6ab6174b0475811f4&language=en-US&page=3")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data.results.length);
      })
  }, []);
  return (
    <div className="App">
      <Header />
      <Movies />
    </div>
  );
}

export default App;
