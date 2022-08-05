import React, { useEffect, useState } from "react";
import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import CustomPagination from "../../components/pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [notFound , setNotFound] = useState(false)
  const [favorites, setFavorites] = useState([]);


  
  const setLocalStorage = (productId) => {
    let product = content.find(product => product.id === productId)
    let findInLocalStorage = favorites.find(product => product.id === productId);
    if (findInLocalStorage) return;
    let newFavouries = [...favorites, product]
    setFavorites(newFavouries)
    localStorage.setItem("favorites", JSON.stringify(newFavouries))
}

useEffect(() => {
    let favoritesFromStorage = JSON.parse(localStorage.getItem("favorites") || JSON.stringify([]))
    setFavorites([...favoritesFromStorage])
}, [])

const removeLocalrstorage = (id) => {
  const itemsFav = JSON.parse(localStorage.getItem('favorites'))
  const filteredItems = itemsFav.filter(item => item.id !== id)
  console.log(filteredItems)
  setFavorites(filteredItems)
  localStorage.setItem('favorites' , JSON.stringify(filteredItems))
}

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );

    setContent(data.results.slice(0,8));
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    content.length ? setNotFound(false) : setNotFound(true);

    fetchSearch();
  }, [type, page]);



  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            className="searchBox"
            style={{ flex: "1" }}
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                fetchSearch()
              }
            }}
          />

          <Button onClick={fetchSearch} variant="contained" style={{ marginLeft: "10px" }}>
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          style={{ paddingBottom: "5px" }}
          textColor="primary"
          onChange={(event, newValue) => {
            setPage(1);
            setType(newValue);
          }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV series" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              date={item.first_air_date || item.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={item.vote_average}
              title={item.title || item.name}
              setLocalStorage={setLocalStorage}
              removeLocalrstorage={removeLocalrstorage}
            />
          ))}
        {/* {searchText &&
          !content &&
          (type ? <h2>No series Found</h2> : <h2>No Movies Found</h2>)} */}
           {notFound ? (<h2 style={{color: '#fff'}}>No result Found</h2>) : null}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} />
      )}
    </div>
  );
};

export default Search;
