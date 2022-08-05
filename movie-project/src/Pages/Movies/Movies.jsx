import React, {useState, useEffect} from "react";
import axios from "axios";
import CustomPagination from "../../components/pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck} from "@fortawesome/free-solid-svg-icons";

const Movies = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [filteredData, setfilteredData] = useState([]);
    const [numOfPages, setnumOfPages] = useState();

    // SORTING STATE
    const [sort, setSort] = useState("Select");
    const [favorites, setFavorites] = useState([]);

    
      // Sending movie object to LocalStorage
        const setLocalStorage = (productId) => {
            let product = content.find((product) => product.id === productId);
            let findInLocalStorage = favorites.find(
            (product) => product.id === productId
            );
            if (findInLocalStorage){
                findin()
                window.scroll(0, 0)
            return
            };
            let newFavouries = [...favorites, product];
            setFavorites(newFavouries);
            localStorage.setItem("favorites", JSON.stringify(newFavouries));
            window.scroll(0, 0)
            addedFav()
        };


        const removeLocalrstorage = (id) => {
            const itemsFav = JSON.parse(localStorage.getItem('favorites'))
            const filteredItems = itemsFav.filter(item => item.id !== id)
            console.log(filteredItems)
            setFavorites(filteredItems)
            localStorage.setItem('favorites' , JSON.stringify(filteredItems))
          }



        // POPUP FUNCTIONS
        const addedFav = () => {
            const popup2 = document.getElementById('pop-up-div2')
            const popupOverlay2 = document.getElementById('pop-up-overlay2')
            const closeButton2 = document.getElementById('close-button2')
            closeButton2.addEventListener('click' , () => {
            popup2.style.display = 'none'
            popupOverlay2.style.display = 'none'
            })
            popup2.style.display = 'flex'
            popupOverlay2.style.display = 'block'
        }

        const findin = () => {
            const popup = document.getElementById('pop-up-div')
            const popupOverlay = document.getElementById('pop-up-overlay')
            const closeButton = document.getElementById('close-button')
            closeButton.addEventListener('click' , () => {
            popup.style.display = 'none'
            popupOverlay.style.display = 'none'
            })
            popup.style.display = 'flex'
            popupOverlay.style.display = 'block'
        }

    useEffect(() => {
        let favoritesFromStorage = JSON.parse(localStorage.getItem("favorites") || JSON.stringify([]))
        setFavorites([...favoritesFromStorage])
    }, [])



    const fetchMovies = async () => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&language=en-US&sort_by=${sort}&include_adult=false&include_vide0=false`
        );

        setContent(data.results.slice(0,8));
        setnumOfPages(data.total_pages);
    };
    const handleSort = (e) => {
        setSort(e.target.value);
        if (e.target.value === "IMDB(asc)") {
            setfilteredData(
                content.sort(function (a, b) {
                    return a.vote_average - b.vote_average;
                })
            );
        } else if (e.target.value === "IMDB(des)") {
            setfilteredData(
                content.sort(function (a, b) {
                    return b.vote_average - a.vote_average;
                })
            );
        } else if (e.target.value === "Year(asc)") {
            setfilteredData(
                content.sort(function (a, b) {
                    return (
                        parseInt(a.release_date.split("-")[0]) - parseInt(b.release_date.split("-")[0])
                    );
                })
            );
        } else if (e.target.value === "Year(des)") {
            setfilteredData(
                content.sort(function (a, b) {
                    return (
                        parseInt(b.release_date.split("-")[0]) - parseInt(a.release_date.split("-")[0])
                    );
                })
            );
        } else {
            return content;
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [page]);


    return (
        <>
            <span className="pageTitle">Movies</span>
            <hr />
            <div id="pop-up-overlay" className="pop-up-overlay">
                <div id="pop-up-div" className="pop-up">
                    <h2>Film already in Favorites</h2>
                    <button id="close-button" > <FontAwesomeIcon icon={faCircleCheck} /></button>
                </div>
            </div>
            <div id="pop-up-overlay2" className="pop-up-overlay2">
                <div id="pop-up-div2" className="pop-up2">
                    <h2>Film added Favorites</h2>
                    <button id="close-button2" > <FontAwesomeIcon icon={faCircleCheck} /></button>
                </div>
            </div>
            {/* FILTER FORM */}
            <div>
                <form style={{marginBottom: "20px"}} action="">
                    <label style={{fontSize: "20px"}} htmlFor="">
                        FILTER MOVIE&nbsp;&nbsp;&nbsp;
                    </label>

                    <select
                        style={{
                            padding: "10px 15px",
                            fontFamily: "Montserrat",
                            textTransform: "uppercase",
                            outline: "none",
                        }}
                        name=""
                        id="filter"
                        defaultValue={"Select"}
                        onChange={handleSort}
                    >
                        <option value="Select">Select</option>
                        <option value="IMDB(asc)">IMDB(asc)</option>
                        <option value="IMDB(des)">IMDB(des)</option>
                        <option value="Year(asc)">Year(asc)</option>
                        <option value="Year(des)">Year(des)</option>
                    </select>
                </form>
            </div>
            <hr/>
            <div className="trending">
                      <div id="pop-up-overlay" className="pop-up-overlay">
        <div id="pop-up-div" className="pop-up">
            <h2>Film already in Favorites</h2>
            <button id="close-button" > <FontAwesomeIcon icon={faCircleCheck} /></button>
        </div>
      </div>
      <div id="pop-up-overlay2" className="pop-up-overlay2">
        <div id="pop-up-div2" className="pop-up2">
            <h2>Film added Favorites</h2>
            <button id="close-button2" > <FontAwesomeIcon icon={faCircleCheck} /></button>
        </div>
      </div>
                {content &&
                    content.map((item) => (
                        <SingleContent
                            key={item.id}
                            id={item.id}
                            poster={item.poster_path}
                            date={item.first_air_date || item.release_date}
                            media_type="movie"
                            vote_average={item.vote_average}
                            title={item.title || item.name}
                            setLocalStorage={setLocalStorage}
                            removeLocalrstorage={removeLocalrstorage}
                        />
                    ))}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage}/>
            )}
        </>
    );
};

export default Movies;
