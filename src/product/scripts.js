// Função para exibir os produtos
function displayProducts(products) {
  const productsList = document.getElementById("productsList");
  productsList.innerHTML = "";

  products.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.classList.add("product-item");

    const productImage = document.createElement("img");
    productImage.src = product.imageUrl;
    productItem.appendChild(productImage);

    const productInfo = document.createElement("div");
    productInfo.innerHTML = `
       <strong>${product.name}</strong>
       <p>Preço: R$ ${product.price.toFixed(2)}</p>
       <p>${product.message}</p>
     `;
    productItem.appendChild(productInfo);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Deletar";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => deleteProduct(product.id));
    productItem.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.innerText = "Editar";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => editProduct(product.id));
    productItem.appendChild(editButton);

    productsList.appendChild(productItem);
  });
}

// Função para adicionar um novo produto
function addProduct(event) {
  event.preventDefault();

  const imageUrl = document.getElementById("imageUrl").value;
  const imageUrls = document
    .getElementById("imageUrls")
    .value.split(",")
    .map((url) => url.trim());
  const videoUrl = document.getElementById("videoUrl").value;
  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const message = document.getElementById("message").value;

  if (!imageUrl || !name || !price || !message) {
    document.getElementById("error-message").style.display = "block";
    return false;
  } else {
    document.getElementById("error-message").style.display = "none";
  }

  fetch("https://backhcimports.hyagocolares.repl.co/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imageUrl,
      imageUrls,
      videoUrl,
      name,
      price,
      message,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getProducts();
    })
    .catch((error) => {
      console.error("Erro ao adicionar o produto:", error);
    });
}

// Função para deletar um produto
function deleteProduct(productId) {
  fetch(`https://backhcimports.hyagocolares.repl.co/products/${productId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getProducts();
    })
    .catch((error) => {
      console.error("Erro ao deletar o produto:", error);
    });
}

// Função para buscar os produtos do servidor
function getProducts() {
  fetch("https://backhcimports.hyagocolares.repl.co/products")
    .then((response) => response.json())
    .then((products) => {
      displayProducts(products);
    })
    .catch((error) => {
      console.error("Erro ao buscar os produtos:", error);
    });
}

// Function to edit a product
function editProduct(productId) {
  // Fetch product details from the server
  fetch(`https://backhcimports.hyagocolares.repl.co/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      // Display a form for the user to edit the product details
      const editForm = document.createElement("form");
      editForm.innerHTML = `
        <input type="text" id="edit-imageUrl" value="${product.imageUrl}">
        <input type="text" id="edit-imageUrls" value="${product.imageUrls}">
        <input type="text" id="edit-videoUrl" value="${product.videoUrl}">
        <input type="text" id="edit-name" value="${product.name}">
        <input type="number" id="edit-price" value="${product.price}">
        <textarea id="edit-message">${product.message}</textarea>
        <button type="submit">Salvar Alterações</button>
      `;
      editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const imageUrl = document.getElementById("edit-imageUrl").value;
        const imageUrls = document.getElementById("edit-imageUrls").value;
        const videoUrl = document.getElementById("edit-videoUrl").value;
        const name = document.getElementById("edit-name").value;
        const price = parseFloat(document.getElementById("edit-price").value);
        const message = document.getElementById("edit-message").value;

        fetch(
          `https://hcimports.hyagocolares.repl.co/products/${productId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              imageUrl,
              imageUrls,
              videoUrl,
              name,
              price,
              message,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // After updating, remove the edit form and update the product list
            editForm.remove();
            getProducts();
          })
          .catch((error) => {
            console.error("Erro ao editar o produto:", error);
          });
      });

      // Append the form to the page
      document.body.appendChild(editForm);
    })
    .catch((error) => {
      console.error("Erro ao buscar os detalhes do produto:", error);
    });
}

// Event listener para adicionar produto
document
  .getElementById("addProductForm")
  .addEventListener("submit", addProduct);

// Inicialização: buscar os produtos do servidor
getProducts();
