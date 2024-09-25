document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("header a");
  const currentPath = window.location.pathname;

  links.forEach((link) => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath) {
      link.style.backgroundColor = "black";
      link.style.color = "white";
      link.style.borderRadius = "8px";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("enquiryForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var thankYouModal = new bootstrap.Modal(
        document.getElementById("thankYouModal")
      );
      thankYouModal.show();
    });
});

// Conatct Us
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("Hello");

      const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        mobileNo: document.getElementById("mobileNumber").value,
        message: document.getElementById("message").value,
      };

      fetch("http://44.196.192.232:5002/api/ContactUs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data._id) {
            Toastify({
              text: "Thank you! Your form submission has been received.",
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              backgroundColor: "#4CAF50",
            }).showToast();

            document.getElementById("contactForm").reset();
          } else {
            throw new Error("Submission failed");
          }
        })
        .catch((error) => {
          Toastify({
            text: "Something went wrong.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#FF0000",
          }).showToast();
        });
    });
});

// Enquiry Form - Need Change
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("enquiryForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Capture the checkbox label for personalization
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let personalization = '';
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
          personalization += label.textContent.trim() + " ";
        }
      }
    });
    personalization = personalization.trim();

    // Capture the checkbox label for timing
    let timing = '';
    const timingCheckboxes = document.querySelectorAll('input[name^="timingCheck"]');
    timingCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
          timing = label.textContent.trim();
        }
      }
    });

    // Capture the specific date if selected
    const specificDate = document.querySelector('input[type="date"]').value;

    // Prepare the form data for submission
    const formData1 = {
      description: document.getElementById("messages").value,
      personalization: personalization || null,
      engravedText: document.getElementById("engravedText").value,
      timing: timing || null,
      specificDate: specificDate || null,
      fullName: document.getElementById("name").value,
      email: document.getElementById("emails").value,
      mobileNo: document.getElementById("phoneno").value,
      postalCode: document.getElementById("postal-code").value,
      message: "I will provide the logo soon and need the product by the specific date if provided."
    };

    // Send the POST request with the form data
    fetch("http://44.196.192.232:5002/api/enquiry/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData1),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data._id) {
          document.getElementById("enquiryForm").reset(); // Reset the form
          console.log("Submission successful:", data);
        } else {
          throw new Error("Submission failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});


// Product-Query Form - Need Change-RFQ
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("rfqForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Capture the checkbox label for personalization
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let personalization = '';
    checkboxes.forEach(checkbox => {
      if (checkbox.checked && checkbox.name === "check1") {
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
          personalization += label.textContent.trim() + " ";
        }
      }
    });
    personalization = personalization.trim();

    // Capture the checkbox label for timing
    let timing = '';
    const timingCheckboxes = document.querySelectorAll('input[name^="timingCheck"]');
    timingCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
          timing = label.textContent.trim();
        }
      }
    });

    // Capture the specific date if selected
    const specificDate = document.querySelector('input[type="date"]').value;

    // Prepare the form data for submission
    const formData1 = {
      description: document.getElementById("messages").value,
      personalization: personalization || null,
      engravedText: document.getElementById("engravedText").value,
      timing: timing || null,
      specificDate: specificDate || null,
      fullName: document.getElementById("name").value,
      email: document.getElementById("emails").value,
      mobileNo: document.getElementById("phoneno").value,
      postalCode: document.getElementById("postal-code").value,
      message: "I will provide the logo soon and need the product by the specific date if provided."
    };

    // Send the POST request with the form data
    fetch("http://44.196.192.232:5002/api/productenquiry/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData1),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data._id) {
          document.getElementById("enquiryForm").reset(); // Reset the form
          console.log("Submission successful:", data);
        } else {
          throw new Error("Submission failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
// Product-Query Form - Need Change-RFQ
// document.addEventListener("DOMContentLoaded", function () {
//   document
//     .getElementById("rfqForm")
//     .addEventListener("submit", function (event) {
//       event.preventDefault();
//       const formData2 = {
//         fullName: document.getElementById("fullName").value,
//         email: document.getElementById("email").value,
//         mobileNo: document.getElementById("number").value,
//         productname: document.getElementById("productName").value,
//         productID: document.getElementById("productId").value,
//         message: document.getElementById("message").value,
//       };

//       fetch("http://44.196.192.232:5002/api/productenquiry/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData2),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data._id) {
//             document.getElementById("rfqForm").reset();
//           } else {
//             throw new Error("Submission failed");
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     });
// });

// Testimonial Section
document.addEventListener("DOMContentLoaded", function () {
  const apiEndpoint = "http://44.196.192.232:5002/api/testimonial/";
  const testimonialsContainer = document.querySelector(".testimonials-section");

  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      let toggle = true;

      data.forEach((testimonial, index) => {
        const testimonialContainer = document.createElement("div");
        testimonialContainer.className = `testimonial-container ${
          toggle ? "left" : "right"
        }`;
        toggle = !toggle;

        const testimonialDiv = document.createElement("div");
        testimonialDiv.className = "testimonial";

        const testimonialContent = document.createElement("div");
        testimonialContent.className = "testimonial-content d-flex";

        const testimonialText = document.createElement("p");
        testimonialText.textContent = `"${testimonial.testimonial}"`;

        const testimonialImage = document.createElement("img");
        testimonialImage.src = `http://3.111.163.2:5002/uploads/${testimonial.image}`;
        testimonialImage.alt = "Customer";
        testimonialImage.className = "testi-img";

        // Append elements
        testimonialContent.appendChild(testimonialText);
        testimonialContent.appendChild(testimonialImage);
        testimonialDiv.appendChild(testimonialContent);
        testimonialContainer.appendChild(testimonialDiv);
        testimonialsContainer.appendChild(testimonialContainer);
      });
    })
    .catch((error) => {
      console.error("Error fetching testimonials:", error);
    });
});

//FAQ Section
document.addEventListener("DOMContentLoaded", function () {
  const apiEndpoint = "http://44.196.192.232:5002/api/faq/";
  const faqContainer = document.querySelector(".faq-container");

  fetch(apiEndpoint)
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((item) => {
        const faqItem = document.createElement("div");
        faqItem.className = "faq-item";
        faqItem.setAttribute("onClick", "toggleAnswer(this)");

        const quesDiv = document.createElement("div");
        quesDiv.className = "question";
        quesDiv.textContent = item.question;

        const arrowSpan = document.createElement("span");
        arrowSpan.className = "arrow";
        arrowSpan.textContent = "▼";

        quesDiv.appendChild(arrowSpan);

        const answerDiv = document.createElement("div");
        answerDiv.className = "answer";

        const answerP = document.createElement("p");
        answerP.className = "thin-text";
        answerP.textContent = item.answer;

        answerDiv.appendChild(answerP);

        faqItem.appendChild(quesDiv);
        faqItem.appendChild(answerDiv);
        faqContainer.appendChild(faqItem);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

function toggleAnswer(element) {
  const ansDiv = element.querySelector(".answer");
  if (ansDiv.style.display === "Block") {
    ansDiv.style.display = "none";
  } else {
    ansDiv.style.display = "block";
  }
}

//Gallery Section
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://44.196.192.232:5002/api/gallery/")
    .then((response) => response.json())
    .then((data) => {
      const galleryGrid = document.querySelector(".gallery-grid");
      galleryGrid.innerHTML = "";

      data.forEach((gallery, index) => {
        const galleryElement = document.createElement("div");
        galleryElement.classList.add("gallery");
        galleryElement.style.backgroundImage = `url(http://44.196.192.232:5002/uploads/${gallery.image})`;
        galleryElement.style.backgroundSize = "cover";
        galleryElement.style.backgroundPosition = "center";
        galleryElement.style.backgroundRepeat = "no-repeat";
        galleryElement.style.width = "90%";
        galleryElement.style.height = "330px";

        galleryElement.innerHTML = `
          <h3>${gallery.title}</h3>
          <p class="thin-text">${gallery.text}</p>
        `;

        galleryGrid.appendChild(galleryElement);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});


//Category Section
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://44.196.192.232:5002/api/category/")
    .then((response) => response.json())
    .then((data) => {
      const categoryGrid = document.querySelector(".category-grid");
      categoryGrid.innerHTML = "";
      sessionStorage.setItem("fetchedCategory", JSON.stringify(data));

      data.forEach((category) => {
        const categoryElement = document.createElement("div");
        categoryElement.classList.add("category");
        categoryElement.style.backgroundImage = `url(http://44.196.192.232:5002/uploads/${category.image})`;
        categoryElement.style.backgroundSize = "cover";
        categoryElement.style.backgroundRepeat = "no-repeat";

        categoryElement.innerHTML = `
          <h3>${category.name}</h3>
          <p class="thin-text">${category.description}</p>
          <a href="" class="details-button" data-category='${JSON.stringify(category)}'>
            <button class="pt-2">Details
              <svg class="ps-2" width="26" height="8" viewBox="0 0 26 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.921997 6.98045H23.1524L16.6282 1.42285" stroke="white" stroke-width="1.58789"/>
              </svg>
            </button>
          </a>
        `;

        categoryGrid.appendChild(categoryElement);
      });

      document.querySelectorAll(".details-button").forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const categoryData = JSON.parse(e.currentTarget.getAttribute("data-category"));
          sessionStorage.setItem("selectedCategory", JSON.stringify(categoryData));
          fetchProductsByCategory(categoryData.name);
        });
      });
    })
    .catch((error) => console.error("Error fetching categories:", error));
});

function fetchProductsByCategory(categoryName) {
  fetch(`http://44.196.192.232:5002/api/product/getproduct/${categoryName}`)
    .then((response) => response.json())
    .then((products) => {
      sessionStorage.setItem("fetchedProducts", JSON.stringify(products));
      const currentPage = window.location.pathname;
      let redirectPath;
      if(currentPage.includes("pages/")){
        redirectPath = "../products-pages/Cigar-Product.html";
      }else{
        redirectPath = "./products-pages/Cigar-Product.html";
      }

      window.location.href = redirectPath;
    })
    .catch((error) => console.error("Error fetching products:", error));
}

//Product-section
document.addEventListener("DOMContentLoaded", () => {
  const productSection = document.querySelector(".products-section .row");
  const productSection2 = document.querySelector(".products-section-2 .swiper-wrapper");
  const products = JSON.parse(sessionStorage.getItem("fetchedProducts"));
  const heroSection = document.querySelector(".hero-section .d-grid");
  const selectedCategory = JSON.parse(sessionStorage.getItem("selectedCategory"));

  // Update hero section
  if (selectedCategory) {
    heroSection.querySelector("h1").textContent = selectedCategory.name;
    heroSection.querySelector("p").textContent = selectedCategory.description;
  } else {
    console.error("No category found in sessionStorage");
  }

  // Function to render products
  if (products) {
    const renderProducts = (productSection, cols, swiper = false) => {
      productSection.innerHTML = "";
      products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add(...cols, "mb-4");
  
        productElement.innerHTML = `
          <a href="../products/products-1.html">
            <div class="card">
              <img src="http://44.196.192.232:5002/uploads/${product.image}" class="card-img-top" alt="${product.productname}" />
              <div class="card-body">
                <h5 class="card-title">${product.productname}</h5>
                <p class="card-text">$${product.price}</p>
              </div>
            </div>
          </a>
        `;
  
        productElement.querySelector("a").addEventListener("click", (e) => {
          e.preventDefault();
          sessionStorage.setItem("selectedProduct", JSON.stringify(product));
          window.location.href = "../products/products-1.html";
        });
  
        if (swiper) {
          const swiperSlide = document.createElement("div");
          swiperSlide.classList.add("swiper-slide");
          swiperSlide.appendChild(productElement);
          productSection.appendChild(swiperSlide);
        } else {
          productSection.appendChild(productElement);
        }
      });
    };

    renderProducts(productSection, ["col-lg-3", "col-md-4", "col-sm-6"]);

    renderProducts(productSection2, ["col-sm-4"], true);
    
  } else {
    console.error("No products found in sessionStorage");
  }
});


const style = document.createElement('style');
style.innerHTML = `
  .card-title, .card-text {
    text-decoration: underline #fff;
    font-weight: bold;
  }
  .card-text{
    color: #667479;
  }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
  const product = JSON.parse(sessionStorage.getItem("selectedProduct"));

  if (product) {
    document.querySelector(".product-img h2").textContent = product.productname;
    document.querySelector(".product-img img").src = `http://44.196.192.232:5002/uploads/${product.image}`;
    document.querySelector(".product-img img").alt = product.productname;

    document.querySelector(".product-info h1").textContent = product.productname;
    document.querySelector(".product-info h5.price").textContent ="$"+product.price;
    document.querySelector(".product-info p").textContent = product.description;

    const rfqLink = document.querySelector(".product-info a");
    rfqLink.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.setItem("selectedProductForRFQ", JSON.stringify(product));
      window.location.href = rfqLink.href;
    });
  } else {
    console.error("No product data found in sessionStorage");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const product = JSON.parse(sessionStorage.getItem("selectedProduct"));
  if (product) {
    document.querySelector(".product-info h1").textContent =
      product.productname;
    document.querySelector(".product-info .price").textContent = "$"+product.price;
    document.querySelector(".product-info .description").textContent =
      product.description;
    document.querySelector(".product-info .id").textContent = "Product Id: "+product.productID;
    document.querySelector(
      ".product-details img"
    ).src = `http://44.196.192.232:5002/uploads/${product.image}`;
    document.querySelector(".product-img img").alt = product.productname;

    // Add a click event to the RFQ link
    const rfqLink = document.querySelector(".product-info a");
    rfqLink.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.setItem("selectedProductForRFQ", JSON.stringify(product));
      window.location.href = rfqLink.href;
    });
  } else {
    console.error("No product data found in sessionStorage");
  }
});