fetch(
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);

    burguers = response.filter((r) => r["name"] === "Burguers");
    tacos = response.filter((r) => r["name"] === "Tacos");
    salads = response.filter((r) => r["name"] === "Salads");
    desserts = response.filter((r) => r["name"] === "Desserts");
    drinksSides = response.filter((r) => r["name"] === "Drinks and Sides");

    return [burguers, tacos, salads, desserts, drinksSides];
  })
  .then((categories) => {

    selectedCat = categories[0][0]["products"];
    counterCart = 0;

    function addElementToCart() {
        
        console.log("Anadiendo")
        counterCart++;
        let labelCount = document.getElementById("carrito");

        labelCount.innerHTML = `${counterCart} Items`
    }

    function printSelectedCat(catArray) {
      console.log(catArray);

      let row = document.getElementById("productsArea");

      catArray.forEach((element) => {
        let col = document.createElement("div");
        col.setAttribute("class", "col-4 col-sm-1");

        let card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("style", "width: 18rem;");

        let img = document.createElement("img");
        img.setAttribute("src", `${element["image"]}`);
        card.appendChild(img);

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        cardBody.innerHTML = `<h5 class="card-title">${element["name"]}</h5>
        <p class="card-text">${element["description"]}</p>
        <div class="card-footer bg-transparent border-success">${element["price"]}$</div>`;

        let button = document.createElement("a");        
        button.setAttribute("class", "btn btn-primary")
        button.addEventListener("click", event => {addElementToCart()});
        button.innerHTML = "Agregar al carrito";
        cardBody.appendChild(button);

        card.appendChild(cardBody);
        col.appendChild(card);
            row.appendChild(col);
        });
    }

    function clearCategories() {
      let row = document.getElementById("productsArea");

      row.innerHTML = "";
    }    

    console.log(selectedCat);
    printSelectedCat(selectedCat);

    //Configurar los botones

    let btnB = document.getElementById("btnB");
    btnB.addEventListener("click", (event) => {
      selectedCat = categories[0][0]["products"];
      clearCategories();
      printSelectedCat(selectedCat);
    });

    let btnT = document.getElementById("btnT");
    btnT.addEventListener("click", (event) => {
      selectedCat = categories[1][0]["products"];
      clearCategories();
      printSelectedCat(selectedCat);
    });

    let btnS = document.getElementById("btnS");
    btnS.addEventListener("click", (event) => {
      selectedCat = categories[2][0]["products"];
      clearCategories();
      printSelectedCat(selectedCat);
    });

    let btnD = document.getElementById("btnB");
    btnD.addEventListener("click", (event) => {
      selectedCat = categories[3][0]["products"];
      clearCategories();
      printSelectedCat(selectedCat);
    });

    let btnDS = document.getElementById("btnDS");
    btnDS.addEventListener("click", (event) => {
      selectedCat = categories[4][0]["products"];
      clearCategories();
      printSelectedCat(selectedCat);
    });
  });
