//b0dca3002ba686625ef74aebad2dce6b

const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      ${
        movie.poster_path
          ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />`
          : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>
  `;
    document.querySelector("#popular-movies").appendChild(div);
  });
  console.log(results);
}

async function fetchAPIData(endpoint) {
  const API_KEY = "b0dca3002ba686625ef74aebad2dce6b";
  const API_URL = "https://api.themoviedb.org/3/";

  try {
    const response = await fetch(
      `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );
    if (!response.ok) {
      throw new Error("Data couldn't be retrieved. Please try again. ");
    }

    const data = await response.json();
    return data;
    //console.log(data);
  } catch (e) {
    console.log("OUCH:::", e);
  }
}

function hightlightActiveLink() {
  const navlink = document.querySelectorAll("a.nav-link");
  navlink.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
    console.log(link.getAttribute("href"));
  });
}

const init = () => {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    // case "/index.html":
    //   console.log("Home");
    //   break;
    case "/shows.html":
      console.log("Shows Directory");
      break;
    case "/search.html":
      console.log("Search");
      break;
    case "/movie-details.html":
      console.log("Details");
      break;
    case "/tv-details.html":
      console.log("TV Details");
      break;
    default:
      console.log("ERROR 404 NOT FOUND");
  }
  hightlightActiveLink();
};

document.addEventListener("DOMContentLoaded", init);
