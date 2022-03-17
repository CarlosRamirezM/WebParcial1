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
  }).then((categories) => {

    let selectedCat = categories[0][0]["products"];
    let counterCart = 0;
    let cart = {};
    let cartElement = [];
    let totalOrder = 0;

    function addElementToCart(element) {        
        console.log("Anadiendo ", element);

        register = cart[element["name"]];
        
        if(register) {
            register["quantity"]++; 
        }
        else {
            cart[element["name"]] = { "product" : element , "quantity" : 1};
            cartElement.push(element);
        }
        
        counterCart++;
        totalOrder += element["price"];

        register = cart[element["name"]];
        console.log("Añadido ",register);
        let labelCount = document.getElementById("carrito");

        labelCount.innerHTML = `${counterCart} Items`
    }

    function printSelectedCat(catArray, sC) {
      
      let row = document.getElementById("productsArea");
      

      if(screen.width < 415) {
        let brand = document.getElementById("brandN");
        brand.innerHTML = sC;
      }
      else 
      {
        let title = document.getElementById("selectedCategoryTitle");
        title.innerHTML = `${sC}`;
      }

      catArray.forEach((element) => {
        let col = document.createElement("div");
        col.setAttribute("class", "col-md-3 col-xs-6 d-flex align-item-md-stretch pb-3");

        let card = document.createElement("div");
        card.setAttribute("class", "card");

        let img = document.createElement("img");
        img.setAttribute("class", "cardImg");
        img.setAttribute("src", `${element["image"]}`);
        card.appendChild(img);

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        cardBody.innerHTML = `<h5 class="card-title">${element["name"]}</h5>
        <p class="card-text">${element["description"]}</p>
        <p class="cardUnitPrice">${element["price"]}$</p>`;

        let button = document.createElement("a");        
        button.setAttribute("class", "btn btn-card")
        button.addEventListener("click", event => {addElementToCart(element)});
        button.innerHTML = "Add to cart";
        cardBody.appendChild(button);

        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
        });
    }

    function printCartResume() {  
        let title = document.getElementById("selectedCategoryTitle");
        title.innerHTML = `Order Resume`;
      
        let arow = document.getElementById("productsArea");
        let row = document.createElement('div');
        row.setAttribute("class", "divTable");

        let table = document.createElement("table");
        table.setAttribute("class", "table table-striped");
        
        table.innerHTML = `<thead>
                                <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Qty.</th>
                                <th scope="col">Description</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Modify</th>
                                </tr>
                            </thead>`;
        
        let tableBody = document.createElement("tbody");
        let counter = 1;

        if(screen.width < 415) {
          table.innerHTML = `<thead>
                            <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Qty.</th>
                            <th scope="col">Description</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Modify</th>
                            </tr>
                            </thead>`;

        }

        cartElement.forEach((element) => {
            let tr = document.createElement("tr");
            tr.setAttribute("id", `count${element["name"]}`);

            let thItem = document.createElement("th");
            thItem.setAttribute("scope","row");
            thItem.innerHTML = `${counter}`
            tr.appendChild(thItem);

            let tdQty = document.createElement("td");
            let qty = parseInt(cart[element["name"]]["quantity"]);
            tdQty.setAttribute("id",`tdQty${counter}`);
            tdQty.innerHTML = `${qty}`;
            tr.appendChild(tdQty);

            let tdDescription = document.createElement("td");
            tdDescription.setAttribute("id",`tdDescription${element["name"]}`);
            tdDescription.innerHTML = `${element["description"]}`;
            tr.appendChild(tdDescription);
            
            let tdUnitPrice = document.createElement("td");
            let price = parseFloat(element["price"]);                    
            tdUnitPrice.setAttribute("id",`tdUnitPrice${element["name"]}`);
            tdUnitPrice.innerHTML = `${price}`;
            tr.appendChild(tdUnitPrice);
            
            let tdAmount = document.createElement("td");
            let amount = qty*price;                
            tdAmount.setAttribute("id",`tdAmount${element["name"]}`);
            tdAmount.innerHTML = `${amount}`;
            tr.appendChild(tdAmount);
            
            let tdModify = document.createElement("td");
            tdModify.setAttribute("id",`tdModify${element["name"]}`);

            let buttonDiv = document.createElement("div");
            buttonDiv.setAttribute("class","row");

            let buttonCol1 = document.createElement("div");
            buttonCol1.setAttribute("class","col-6");
            let btnIncModify = document.createElement("button");
            btnIncModify.innerHTML = "+";
            btnIncModify.setAttribute("class", "btn btn-modifyQty");
            btnIncModify.addEventListener("click", event => {increaseCartElement(tdQty, price,element["name"])});
            buttonCol1.appendChild(btnIncModify);
            buttonDiv.appendChild(buttonCol1);

            let buttonCol2 = document.createElement("div");
            buttonCol2.setAttribute("class","col-6");
            let btnDecModify = document.createElement("button");
            btnDecModify.innerHTML="-";
            btnDecModify.setAttribute("class", "btn btn-modifyQty");
            btnDecModify.addEventListener("click", event => {decreaseCartElement(tdQty, price,element["name"])});
            buttonDiv.appendChild(btnDecModify);
            buttonCol2.appendChild(btnDecModify);
            buttonDiv.appendChild(buttonCol2);

            tdModify.appendChild(buttonDiv);

            tr.appendChild(tdModify);
            tableBody.appendChild(tr);

            if(counter === cartElement.length) {
                let totalDiv = document.createElement("div");
                totalDiv.setAttribute("class", "row");

                let totalCol = document.createElement("div");
                totalCol.setAttribute("class", "col-10");
                let lblTotal = document.createElement("h6");
                lblTotal.setAttribute("id","lblTotal");
                lblTotal.innerHTML = `Total: ${totalOrder}$`;
                totalCol.appendChild(lblTotal);
                totalDiv.appendChild(totalCol);

                let cancelCol = document.createElement("div");
                cancelCol.setAttribute("class", "col-1");
                let btnCancel = document.createElement("button");
                btnCancel.innerHTML="Cancel";
                btnCancel.setAttribute("class", "btn btn-cancel");
                btnCancel.addEventListener("click", event => {cancelOrder()});
                cancelCol.appendChild(btnCancel);
                totalDiv.appendChild(cancelCol);

                let confirmCol = document.createElement("div");
                confirmCol.setAttribute("class", "col-1");
                let btnConfirm = document.createElement("button");
                btnConfirm.innerHTML="Confirm order";
                btnConfirm.setAttribute("class", "btn btn-confirm");
                btnConfirm.addEventListener("click", event => {confirmOrder()});
                confirmCol.appendChild(btnConfirm);
                totalDiv.appendChild(confirmCol);

                clearCategories();
                table.appendChild(tableBody);
                row.appendChild(table);
                row.appendChild(totalDiv);

                arow.appendChild(row);
            }
            counter++;
        });       
    }

    function increaseCartElement(tdQtyA, price, name) {

        cart[name]["quantity"]++;

        let tdQty = tdQtyA.parentNode.childNodes[1];
        let tdAmount = tdQtyA.parentNode.childNodes[4];

        counterCart++;

        let labelCount = document.getElementById("carrito");
        labelCount.innerHTML = `${counterCart} Items`;

        tdQty.innerHTML = cart[name]["quantity"];
        tdAmount.innerHTML = cart[name]["quantity"]*price;

        let lblTotal = document.getElementById("lblTotal");
        totalOrder += price;
        lblTotal.innerHTML = `Total ${totalOrder}$`;
    }

    function decreaseCartElement(tdQtyA, price, name) {
      
      counterCart--;
      cart[name]["quantity"]--;

      let tdQty = tdQtyA.parentNode.childNodes[1];
      let tdAmount = tdQtyA.parentNode.childNodes[4];

      let labelCount = document.getElementById("carrito");
      labelCount.innerHTML = `${counterCart} Items`;

      if (cart[name]["quantity"] === 0) {        
        tdQty.parentNode.parentNode.removeChild(tdQty.parentNode);   
        delete cart[name];     
      }      
      else {        
        tdQty.innerHTML = cart[name]["quantity"];
        tdAmount.innerHTML = cart[name]["quantity"]*price;       
      }
      
      let lblTotal = document.getElementById("lblTotal");
      totalOrder -= price;

      if(totalOrder < 0) {
        totalOrder = 0;     
      }

      lblTotal.innerHTML = `Total ${totalOrder}$`;
  }

  function cancelOrder() {
    let body = document.getElementById("body");
    let popup = document.createElement("div");
    popup.setAttribute("class","popup");
    popup.setAttribute("id", "cancelPopup");

    let span = document.createElement("span")
    span.setAttribute("class","popuptext");
    span.setAttribute("id", "cancelPopupSpan");

    span.innerHTML = `<p class="popup-title"> Cancel the order </p>
                      <hr>
                      <p class="popup-question"> Are you sure about canceling the order? </p>
                      <hr>`;
    
    let buttonYes = document.createElement("button");
    buttonYes.innerHTML="Yes, I want to cancel the order";
    buttonYes.setAttribute("class", "btn btn-success");
    buttonYes.addEventListener("click", event => {clearCart(); deleteElement(popup);});
    span.appendChild(buttonYes); 

    let buttonNo = document.createElement("button");
    buttonNo.innerHTML="No,I want to continue adding products";
    buttonNo.setAttribute("class", "btn btn-danger");
    buttonNo.addEventListener("click", event => {deleteElement(popup)});
    span.appendChild(buttonNo);

    popup.appendChild(span);
    body.appendChild(popup);
  }

  function clearCart() {
    counterCart = 0;

    let labelCount = document.getElementById("carrito");
    labelCount.innerHTML = `${counterCart} Items`;

    cart = {};
    cartElement = [];

    clearCategories();
    printSelectedCat(selectedCat, "Burguers");
  }

  function confirmOrder() {
    console.log(cart);
  }

  function deleteElement(element) {
    element.parentNode.removeChild(element);
  }
   
  function clearCategories() {
      let row = document.getElementById("productsArea");
      row.innerHTML = "";
   }    

    printSelectedCat(selectedCat, "Burguers");

    if(screen.width < 415) {
      console.log("Mobile");

      let nav = document.getElementById("nav1");
      nav.setAttribute("class", "navbar navbarMobile" )

      let brand = document.getElementById("brandN");
      brand.innerHTML = "Burguers";
    }

    //Configurar los botones

    let btnCarrito = document.getElementById("btnCarrito");
    btnCarrito.addEventListener("click", event => {printCartResume()})

    let btnB = document.getElementById("btnB");
    btnB.addEventListener("click", (event) => {
      selectedCat = categories[0][0]["products"];
      clearCategories();
      printSelectedCat(selectedCat , "Burguers");
    });

    let btnT = document.getElementById("btnT");
    btnT.addEventListener("click", (event) => {
      selectedCat = categories[1][0]["products"];
      clearCategories();
      printSelectedCat(selectedCat, "Tacos");
    });

    let btnS = document.getElementById("btnS");
    btnS.addEventListener("click", (event) => {
      selectedCat = categories[2][0]["products"];
      clearCategories();
      printSelectedCat(selectedCat, "Salads");
    });

    let btnD = document.getElementById("btnD");
    btnD.addEventListener("click", (event) => {
      selectedCat = categories[3][0]["products"];
      clearCategories();
      printSelectedCat(selectedCat, "Desserts");
    });

    let btnDS = document.getElementById("btnDS");
    btnDS.addEventListener("click", (event) => {
      selectedCat = categories[4][0]["products"];
      clearCategories();
      printSelectedCat(selectedCat, "Drinks & Sides");
    });
  });
