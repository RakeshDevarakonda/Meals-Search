let imageData = JSON.parse(localStorage.getItem("favoritedata")) || [];

const divElement = document.querySelector("#results-container");
const modalElement = document.querySelector(".modal-body");
var urlname = JSON.parse(localStorage.getItem("search-value")) || "";

function renderFavourte(imageData) {
  modalElement.innerHTML = "";
  imageData.forEach((e) => {
    const addmodalelement = `  <div class="modalelement mb-3 ">
<div class="d-flex justify-content-end m-0  align-items-center"><i
        class="fa-solid fa-heart heartss2"></i>
</div>
<div class="d-flex justify-content-center align-items-center"><img
        src="${e.clickedimage}" alt=""></div>
<div>
    <h5 class="mt-3 text-center">${e.name}</h5>
</div>
</div>`;

    modalElement.insertAdjacentHTML("beforeend", addmodalelement);
  });

  const hearts2 = document.querySelectorAll(".heartss2");

  hearts2.forEach((heart) => {
    heart.addEventListener("click", (e) => {
      heart2(heart, e);
    });
  });

  const children2 = document.querySelector(".modal-body").childElementCount;

  if (children2 == 0) {
    modalElement.innerHTML = `<p class="text-white">No Items Availble</p>`;
  }
}

renderFavourte(imageData);

async function fetchData(url) {
  try {
    urlname = url;

    console.log(url);
    const response = await fetch(url);

    const data = await response.json();

    console.log(data);

    Mealsdata(data.meals);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

if (urlname.length > 0) {
  document.querySelector("#search-input").value = urlname;
  fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${urlname}`);
}
document.querySelector("#search-input").addEventListener("input", (e) => {
  if (e.target.value != "") {
    localStorage.setItem("search-value", JSON.stringify(e.target.value));
    console.log(e.target.value);
    fetchData(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value}`
    );
  } else {
    console.log("object");
    divElement.innerHTML = " ";
  }
});

function Mealsdata(apidata) {
  divElement.innerHTML = "";
  let imageData = JSON.parse(localStorage.getItem("favoritedata")) || [];
  apidata.forEach((element) => {
    const existingIndex = imageData.findIndex(
      (item) => item.clickedimage == element.strMealThumb
    );

    if (existingIndex == -1) {
      const appendElement = ` <div  class="m-5 everyelement modalelement">
      <div class="d-flex justify-content-end">
      <i class="fa-regular fa-heart heartss"></i>
      </div>
      <div>
          <img loading="lazy" src="${element.strMealThumb}" alt="">
      </div>
      <div class="w-100">
          <h5 class=" text-center text-wrap m-2" >${element.strMeal}</h5>
    <a  class="openmealpage" id=${element.idMeal} ><button class="w-100 text-white rounded-5">Veiw Details</button></a>

      </div>
  
  </div>`;

      divElement.insertAdjacentHTML("beforeend", appendElement);
    } else {
      const appendElement = ` <div  class="m-5 everyelement modalelement">
    <div class="d-flex justify-content-end">
    <i class="fa-solid fa-heart heartss"></i>
    </div>
    <div>
        <img src="${element.strMealThumb}" alt="">
    </div>
    <div class="w-100">
        <h5 class=" text-center text-wrap m-2" >${element.strMeal}</h5>
        <a class="openmealpage" id=${element.idMeal} href=""><button class="w-100 text-white rounded-5">Veiw Details</button></a>


    </div>

</div>`;

      divElement.insertAdjacentHTML("beforeend", appendElement);
    }
  });

  document.querySelectorAll(".openmealpage").forEach((e) => {
    e.addEventListener("click", (event) => {
      event.preventDefault();

      const alreadyadded = event.target.parentElement
        .closest(".modalelement")
        .querySelector("i")
        .classList.contains("fa-solid");

      const id = event.target.closest("a").id;
      const finddetails = apidata.find((e) => e.idMeal == id);

      const senddata = {
        name: finddetails.strMeal,
        instructions: finddetails.strInstructions,
        ingredients: [
          finddetails.strIngredient1,
          finddetails.strIngredient2,
          finddetails.strIngredient3,
          finddetails.strIngredient4,
          finddetails.strIngredient5,
          finddetails.strIngredient6,
          finddetails.strIngredient7,
          finddetails.strIngredient8,
          finddetails.strIngredient9,
          finddetails.strIngredient10,
          finddetails.strIngredient11,
          finddetails.strIngredient12,
          finddetails.strIngredient13,
          finddetails.strIngredient14,
          finddetails.strIngredient15,
          finddetails.strIngredient16,
          finddetails.strIngredient17,
          finddetails.strIngredient18,
          finddetails.strIngredient19,
          finddetails.strIngredient20,
        ],
        image: finddetails.strMealThumb,
        category: finddetails.strCategory,
        added: alreadyadded,
      };

      localStorage.setItem("mealdata", JSON.stringify(senddata));

      window.location.href = "meal-detail.html";
    });
  });

  const hearts = document.querySelectorAll(".heartss");

  hearts.forEach((heart) => {
    heart.addEventListener("click", (e) => {
      heart2(heart, e);
    });
  });
}

function addtofavorites(element) {
  let imageData = JSON.parse(localStorage.getItem("favoritedata")) || [];

  const existingIndex = imageData.findIndex(
    (item) => item.clickedimage == element.querySelector("img").src
  );

  if (existingIndex == -1) {
    imageData.push({
      clickedimage: element.querySelector("img").src,
      name: element.querySelector("h5").textContent,
    });
  } else {
    imageData.splice(existingIndex, 1);
  }

  localStorage.setItem("favoritedata", JSON.stringify(imageData));
}

// const hearts2 = document.querySelectorAll(".heartss2");

// hearts2.forEach((heart) => {
//   heart.addEventListener("click", (e) => {
//     heart2(heart, e);
//   });
// });

function heart2(heart, e) {
  const closestElement = e.target.closest(".modalelement");

  if (heart.classList.contains("fa-regular")) {
    heart.classList.replace("fa-regular", "fa-solid");

    addtofavorites(closestElement);

    let imageData = JSON.parse(localStorage.getItem("favoritedata")) || [];

    renderFavourte(imageData);
  } else {
    heart.classList.replace("fa-solid", "fa-regular");

    addtofavorites(closestElement);

    let imageData = JSON.parse(localStorage.getItem("favoritedata")) || [];

    renderFavourte(imageData);
  }
}

window.addEventListener("pageshow", function (event) {
  if (
    event.persisted ||
    (window.performance && window.performance.navigation.type === 2)
  ) {
    window.location.reload();
  } else {
  }
});
