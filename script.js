document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("header a");
  const currentPath = window.location.pathname;

  function getFileName(path) {
    return path.substring(path.lastIndexOf("/") + 1);
  }

  links.forEach((link) => {
    const linkPath = link.getAttribute("href");

    if (linkPath) {
      const currentFileName = getFileName(currentPath);
      const linkFileName = getFileName(linkPath);

      // Compare the filenames only
      if (currentFileName === linkFileName) {
        link.style.backgroundColor = "black";
        link.style.color = "white";
        link.style.borderRadius = "3px";
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const enquiryForm = document.getElementById("enquiryForm");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var thankYouModal = new bootstrap.Modal(
        document.getElementById("thankYouModal")
      );
      thankYouModal.show();
    });
  }
});



// Conatct Us
document.addEventListener("DOMContentLoaded", function () {
  function manageCheckboxGroup(groupName) {
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          checkboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== this) {
              otherCheckbox.checked = false; // Uncheck others
            }
          });
        }
      });
    });
  }

  // Apply the function to both checkbox groups
  manageCheckboxGroup("personalization");
  manageCheckboxGroup("timing");

  // Form submission logic (unchanged from your original code)
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Capture the checkbox label for personalization
      const checkboxes = document.querySelectorAll(
        'input[name="personalization"]'
      );
      let personalization = "";
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          const label = document.querySelector(`label[for="${checkbox.id}"]`);
          if (label) {
            personalization += label.textContent.trim() + " ";
          }
        }
      });
      personalization = personalization.trim();

      // Capture the checkbox label for timing
      let timing = "";
      const timingCheckboxes = document.querySelectorAll(
        'input[name="timing"]'
      );
      timingCheckboxes.forEach((checkbox) => {
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
        message:
          "I will provide the logo soon and need the product by the specific date if provided.",
      };

      // Send the POST request with the form data
      fetch("http://44.196.192.232:5002/api/ContactUs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData1),
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
          // console.error("Error:", error);
        });
    });
  }
});



// Enquiry Form - Need Change
document.addEventListener("DOMContentLoaded", function () {
  // Function to ensure only one checkbox is selected per group
  function manageCheckboxGroup(groupName) {
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          checkboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== this) {
              otherCheckbox.checked = false; // Uncheck others
            }
          });
        }
      });
    });
  }

  // Apply the function to both checkbox groups
  manageCheckboxGroup("personalization");
  manageCheckboxGroup("timing");

  // Form submission logic
  const enquiryForm = document.getElementById("enquiryForm");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Capture the checkbox label for personalization
      const checkboxes = document.querySelectorAll(
        'input[name="personalization"]'
      );
      let personalization = "";
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          const label = document.querySelector(`label[for="${checkbox.id}"]`);
          if (label) {
            personalization += label.textContent.trim() + " ";
          }
        }
      });
      personalization = personalization.trim();

      // Capture the checkbox label for timing
      let timing = "";
      const timingCheckboxes = document.querySelectorAll(
        'input[name="timing"]'
      );
      timingCheckboxes.forEach((checkbox) => {
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
        message:
          "I will provide the logo soon and need the product by the specific date if provided.",
      };

      // Send the POST request with the form data
      fetch("http://44.196.192.232:5002/api/enquiry/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData1),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data._id) {
            // Reset form fields including checkboxes after successful submission
            document.getElementById("enquiryForm").reset(); // Reset the form
            checkboxes.forEach((checkbox) => (checkbox.checked = false)); // Uncheck all checkboxes
            timingCheckboxes.forEach((checkbox) => (checkbox.checked = false));
          } else {
            throw new Error("Submission failed");
          }
        })
        .catch((error) => {
          document.getElementById("enquiryForm").reset(); // Reset the form
          checkboxes.forEach((checkbox) => (checkbox.checked = false)); // Uncheck all checkboxes
          timingCheckboxes.forEach((checkbox) => (checkbox.checked = false)); // Uncheck all timing checkboxes
        });
    });
  }
});



// Product-Query Form
document.addEventListener("DOMContentLoaded", function () {
  function manageCheckboxGroup(groupName) {
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          checkboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== this) {
              otherCheckbox.checked = false;
            }
          });
        }
      });
    });
  }

  manageCheckboxGroup("personalization");
  manageCheckboxGroup("timing");

  const rfqForm = document.getElementById("rfqForm");

  if (rfqForm) {
    rfqForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Capture the checkbox label for personalization
      const personalizationCheckboxes = document.querySelectorAll(
        'input[name="personalization"]'
      );
      let personalization = "";
      personalizationCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          const label = document.querySelector(`label[for="${checkbox.id}"]`);
          if (label) {
            personalization = label.textContent.trim();
          }
        }
      });

      // Capture the checkbox label for timing
      let timing = "";
      const timingCheckboxes = document.querySelectorAll(
        'input[name="timing"]'
      );
      timingCheckboxes.forEach((checkbox) => {
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
      const formData = {
        description: document.getElementById("messages").value,
        personalization: personalization || null,
        engravedText: document.getElementById("engravedText").value,
        timing: timing || null,
        specificDate: specificDate || null,
        fullName: document.getElementById("name").value,
        email: document.getElementById("emails").value,
        mobileNo: document.getElementById("phoneno").value,
        postalCode: document.getElementById("postal-code").value,
        message:
          "I will provide the logo soon and need the product by the specific date if provided.",
      };

      // Send the POST request with the form data
      fetch("http://44.196.192.232:5002/api/productenquiry/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data._id) {
            document.getElementById("rfqForm").reset();
          } else {
            throw new Error("Submission failed");
          }
        })
        .catch((error) => {
          // console.error("Error:", error);
        });
    });
  }
});



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
        testimonialImage.src = `${testimonial.image}`;
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
      // console.error("Error fetching testimonials:", error);
    });
});



//FAQ Section
document.addEventListener("DOMContentLoaded", function () {
  const apiEndpoint = "http://44.196.192.232:5002/api/faq/";
  const faqContainer = document.querySelector(".faq-container");

  fetch(apiEndpoint)
    .then((resp) => resp.json())
    .then((data) => {
      data.sort((a, b) => Number(a.sequence) - Number(b.sequence));

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
      // console.log(error);
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
        galleryElement.style.backgroundImage = `url(${gallery.image})`;
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
    .catch((error) => {
      // console.error("Error fetching data:", error);
    });
});



//Category-section
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://44.196.192.232:5002/api/category/")
    .then((response) => response.json())
    .then((data) => {
      data.sort((a, b) => a.sequence - b.sequence);
      const categoryGrid = document.querySelector(".category-carousel");
      categoryGrid.innerHTML = "";
      sessionStorage.setItem("fetchedCategory", JSON.stringify(data));

      data.forEach((category) => {
        const categoryElement = document.createElement("div");
        categoryElement.classList.add("item", "addBack");

        const truncatedDescription =
          category.description.length > 150
            ? category.description.substring(0, 150) + "..."
            : category.description;

        const truncatedName =
          category.name.length > 35
            ? category.name.substring(0, 35) + "..."
            : category.name;

        const formattedDescription = truncatedDescription
          .split(" ")
          .map((word) => {
            if (word.length > 25) {
              return word.match(/.{1,25}/g).join(" ");
            }
            return word;
          })
          .join(" ");

        const formattedName = truncatedName
          .split(" ")
          .map((word) => {
            if (word.length > 20) {
              return word.match(/.{1,18}/g).join(" ");
            }
            return word;
          })
          .join(" ");

        const encodedCategory = encodeURIComponent(JSON.stringify(category));

        categoryElement.innerHTML = `
          <div class="img1">
            <img src="${category.image}" alt="${category.name}" onerror="this.onerror=null;this.src='./assets/images/ImageNotFound.png';">
          </div>
          <div class="inner-content">
            <h3 class="addh3">${formattedName}</h3>
            <p class="thin-text1 addp">${formattedDescription}</p>
            <a href="" class="details-button" data-category='${encodedCategory}'>
              <button class="pt-2">Details
                <svg class="ps-2" width="26" height="8" viewBox="0 0 26 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.921997 6.98045H23.1524L16.6282 1.42285" stroke="black" stroke-width="1.58789"/>
                </svg>
              </button>
            </a>
          </div>
        `;
        categoryGrid.appendChild(categoryElement);
      });

      $(".category-carousel").owlCarousel({
        loop: false,
        margin: 20,
        nav: true,
        navText: ["←", "→"],
        responsive: {
          0: {
            items: 1,
            nav: false,
            stagePadding: 10,
          },
          576: {
            items: 2,
          },
          768: {
            items: 2,
            margin: 15,
          },
          992: {
            items: 3,
            margin: 20,
          },
          1200: {
            items: 3,
          },
        },
        onInitialized: function (event) {
          adjustActiveItems();
        },
        onChanged: function (event) {
          adjustActiveItems();
        },
      });

      function adjustActiveItems() {
        $(".owl-item").css({
          width: "calc(100% / 3 - 20px)",
          margin: "0 0 20px 0",
        });
      }

      function adjustActiveItems() {
        $(".owl-item").css({
          width: "360px",
          margin: "0 0 20px 0",
        });
      }

      document.querySelectorAll(".details-button").forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const categoryData = JSON.parse(
            decodeURIComponent(e.currentTarget.getAttribute("data-category"))
          );
          sessionStorage.setItem(
            "selectedCategory",
            JSON.stringify(categoryData)
          );
          fetchProductsByCategory(categoryData._id);
        });
      });
    })
    .catch((error) => {
      // console.error("Error fetching categories:", error);
    });
});

function fetchProductsByCategory(categoryId) {
  fetch(`http://44.196.192.232:5002/api/category/${categoryId}`)
    .then((response) => response.json())
    .then((products) => {
      sessionStorage.setItem(
        "fetchedProducts&Categories",
        JSON.stringify(products)
      );
      const currentPage = window.location.pathname;
      let redirectPath;
      if (currentPage.includes("pages/")) {
        redirectPath = "../products-pages/Cigar-Product.html";
      } else {
        redirectPath = "./products-pages/Cigar-Product.html";
      }

      window.location.href = redirectPath;
    })
    .catch((error) => {
      // console.error("Error fetching products:", error);
    });
}



//Product-section
// document.addEventListener("DOMContentLoaded", () => {
//   const productSection = document.querySelector(".products-section .row");
//   const productHead = document.querySelector(".products-section");
//   const products = JSON.parse(
//     sessionStorage.getItem("fetchedProducts&Categories")
//   );
//   const selectedCategory = JSON.parse(
//     sessionStorage.getItem("selectedCategory")
//   );
//   const products1 = products.products;

//   if (productHead) {
//     productHead.querySelector("h2").textContent =
//       "Take A Look At Our " + selectedCategory.name;
//   }

//   if (products1 && products1.length > 0) {
//     const renderProducts = (productSection, cols, swiper = false) => {
//       if (!productSection) {
//         return;
//       }

//       productSection.innerHTML = "";

//       products1.forEach((product) => {
//         const productElement = document.createElement("div");
//         productElement.classList.add(...cols, "mb-4");

//         // Adjusted to use `productname` instead of `subCategoryname`
//         const truncatedName =
//           product.productname.length > 25
//             ? product.productname.substring(0, 25) + "..."
//             : product.productname;

//           const truncatedDesc =
//             product.description.length > 25
//               ? product.description.substring(0, 25) + "..."
//               : product.description;

//         productElement.innerHTML = `
//           <a href="../products/products-1.html">
//             <div class="card">
//               <img src="http://44.196.192.232:5002/uploads/${product.image}" class="card-img-top" alt="${product.productname}" onerror="this.onerror=null;this.src='../assets/images/ImageNotFound.png';"/>
//               <div class="card-body">
//                 <h5 class="card-title">${truncatedName}</h5>
//                 <p class="card-text">${truncatedDesc}</p>
//               </div>
//             </div>
//           </a>
//         `;

//         // Add click event to store the selected product data
//         productElement.querySelector("a").addEventListener("click", (e) => {
//           e.preventDefault();
//           sessionStorage.setItem("selectedProduct", JSON.stringify(product));
//           window.location.href = "../products/products-1.html";
//         });

//         productSection.appendChild(productElement);
//       });
//     };

//     // Render the products in a 3/4 column grid layout
//     renderProducts(productSection, ["col-lg-3", "col-md-4", "col-sm-6"]);
//   } else {
//     productSection.innerHTML = `
//       <div class="no-products-found" style="text-align: center; width: 100%; border: 1px solid #ccc; border-radius: 5px; padding: 20px 0 10px 0px;">
//         <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//           <circle cx="12" cy="12" r="10"></circle>
//           <line x1="12" y1="8" x2="12" y2="12"></line>
//           <line x1="12" y1="16" x2="12.01" y2="16"></line>
//         </svg>
//        <p style="font-size: 35px; color: #777;">No products are currently listed under this subcategory</p>
//     </div>

//     `;
//   }
// });



//Subcategory-section
// let subProduct;
// document.addEventListener("DOMContentLoaded", () => {
//   const productSection = document.querySelector(".subcategory-section .row");
//   const productHead = document.querySelector(".subcategory-section");
//   const productSection2 = document.querySelector(".products-section-2 .swiper-wrapper");
//   const products = JSON.parse(sessionStorage.getItem("fetchedProducts&Categories"));
//   const heroSection = document.querySelector(".hero-section .d-grid");
//   const selectedCategory = JSON.parse(sessionStorage.getItem("selectedCategory"));
//   const products1 = products.subCategories;

//   if (selectedCategory) {
//     if (heroSection && productHead) {
//       productHead.querySelector("h2").textContent = "Take A Look At Our " + selectedCategory.name;
//       heroSection.querySelector("h1").textContent = selectedCategory.name;
//       heroSection.querySelector("p").textContent = selectedCategory.description;
//     }
//   } else {
//     // console.error("No category found in sessionStorage");
//   }

//   if (products1 && products1.length > 0) {
//     const renderProducts = (productSection, cols, swiper = false) => {
//       if (!productSection) {
//         return;
//       }

//       productSection.innerHTML = "";

//       products1.forEach((product, index) => {
//         const productElement = document.createElement("div");
//         productElement.classList.add(...cols, "mb-4");

//         const truncatedName =
//           product.subCategoryname.length > 25
//             ? product.subCategoryname.substring(0, 25) + "..."
//             : product.subCategoryname;

//         const truncatedDesc =
//           product.description.length > 25
//               ? product.description.substring(0, 25) + "..."
//               : product.description;

//         productElement.innerHTML = `
//           <a href="../SubProduct/SubProduct.html">
//             <div class="card">
//               <img src="http://44.196.192.232:5002/uploads/${product.image}" class="card-img-top" alt="${product.subCategoryname}" onerror="this.onerror=null;this.src='../assets/images/ImageNotFound.png';"/>
//               <div class="card-body">
//                 <h5 class="card-title">${truncatedName}</h5>
//                 <p class="card-text">${truncatedDesc}</p>
//               </div>
//             </div>
//           </a>`;

//         productElement.querySelector("a").addEventListener("click", (e) => {
//           e.preventDefault();
//           sessionStorage.setItem("selectedProduct", JSON.stringify(product));
//           subProduct = product._id;
//           console.log(window.location.href);
//           sessionStorage.setItem("subProduct", product._id);
//           window.location.href = "../SubProduct/SubProduct.html";
//         });

//         if (swiper) {
//           const swiperSlide = document.createElement("div");
//           swiperSlide.classList.add("swiper-slide");
//           swiperSlide.appendChild(productElement);
//           productSection.appendChild(swiperSlide);
//         } else {
//           productSection.appendChild(productElement);
//         }
//       });
//     };

//     renderProducts(productSection, ["col-lg-3", "col-md-4", "col-sm-6"]);
//     renderProducts(productSection2, ["col-sm-4"], true);
//   } else {
//     productSection.innerHTML = `
//     <div class="no-products-found" style="text-align: center; width: 100%; border: 1px solid #ccc; border-radius: 5px; padding: 20px 0 10px 0px;">
//       <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//         <circle cx="12" cy="12" r="10"></circle>
//         <line x1="12" y1="8" x2="12" y2="12"></line>
//         <line x1="12" y1="16" x2="12.01" y2="16"></line>
//       </svg>
//      <p style="font-size: 35px; color: #777;">No sub-category are currently listed under this category</p>
//   </div>
//   `;
//   }
// });



function fetchBoth() {
  const productSection = document.querySelector(".products-section .row");
  const productHead = document.querySelector(".products-section");
  const products = JSON.parse(sessionStorage.getItem("fetchedProducts&Categories"));
  const selectedCategory = JSON.parse(sessionStorage.getItem("selectedCategory"));
  const heroSection = document.querySelector(".hero-section .d-grid");
  const products1 = products?.products || [];
  const subCategories1 = products?.subCategories || [];

  if (productHead) {
    productHead.querySelector("h2").textContent = "Take A Look At Our " + selectedCategory.name;
    heroSection.querySelector("h1").textContent = selectedCategory.name;
    heroSection.querySelector("p").textContent = selectedCategory.description;
  }

  if (productSection) {
    productSection.innerHTML = ""; 

    const renderProducts = (items, cols, isSubcategory) => {
      items.forEach((item) => {
        const productElement = document.createElement("div");
        productElement.classList.add(...cols, "mb-4");

        const name = isSubcategory ? item.subCategoryname : item.productname;
        const description = item.description;

        const truncatedName = name.length > 25 ? name.substring(0, 25) + "..." : name;
        const truncatedDesc = description.length > 25 ? description.substring(0, 25) + "..." : description;

        const hrefLink = isSubcategory ? "../SubProduct/SubProduct.html" : "../products/products-1.html";

        productElement.innerHTML = `
          <a href="${hrefLink}">
            <div class="card">
              <img src="http://44.196.192.232:5002/uploads/${item.image}" class="card-img-top" alt="${name}" onerror="this.onerror=null;this.src='../assets/images/ImageNotFound.png';"/>
              <div class="card-body">
                <h5 class="card-title">${truncatedName}</h5>
                <p class="card-text">${truncatedDesc}</p>
              </div>
            </div>
          </a>
        `;

        productElement.querySelector("a").addEventListener("click", (e) => {
          e.preventDefault();
          sessionStorage.setItem(isSubcategory ? "selectedSubProduct" : "selectedProduct", JSON.stringify(item));
          window.location.href = hrefLink;
        });

        productSection.appendChild(productElement);
      });
    };

    if (products1.length > 0) {
      renderProducts(products1, ["col-lg-3", "col-md-4", "col-sm-6"], false);
    }

    if (subCategories1.length > 0) {
      renderProducts(subCategories1, ["col-lg-3", "col-md-4", "col-sm-6"], true);
    }

    if (products1.length === 0 && subCategories1.length === 0) {
      productSection.innerHTML = `
        <div class="no-products-found" style="text-align: center; width: 100%; border: 1px solid #ccc; border-radius: 5px; padding: 20px 0 10px 0px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
         <p style="font-size: 35px; color: #777;">No products or sub-categories are currently listed under this category</p>
        </div>
      `;
    }
  }
}

document.addEventListener("DOMContentLoaded", fetchBoth);



//SubProduct-section
document.addEventListener("DOMContentLoaded", () => {
  const productSection = document.querySelector(".subproduct-section .row");
  const productHead = document.querySelector(".subproduct-section");
  const heroSection = document.querySelector(".hero-section .d-grid");
  const selectedProduct = JSON.parse(sessionStorage.getItem("selectedSubProduct"));
  const subProduct = sessionStorage.getItem("subProduct");

  if (!selectedProduct || !selectedProduct._id) {
    return;
  }

  const subCategoryId = selectedProduct._id;
  console.log(subCategoryId);
  const apiUrl = `http://44.196.192.232:5002/api/subcategory/${subCategoryId}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const products1 = data.products;

      if (selectedProduct.subCategoryname) {
        productHead.querySelector("h2").textContent = "Take A Look At Our " + selectedProduct.subCategoryname;
        heroSection.querySelector("h1").textContent = selectedProduct.subCategoryname;
        heroSection.querySelector("p").textContent = selectedProduct.description;
      }

      if (products1 && products1.length > 0) {
        renderProducts(products1);
      } else {
        noProductFound();
      }
    })
    .catch((error) => {
      // console.error("Error fetching products by subcategory:", error);
    });

  const renderProducts = (products1) => {
    if (!productSection) {
      return;
    }

    productSection.innerHTML = ""; 

    products1.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4");

      const truncatedName =
        product.productname.length > 25
          ? product.productname.substring(0, 25) + "..."
          : product.productname;

      const truncatedDesc =
        product.description.length > 25
            ? product.description.substring(0, 25) + "..."
            : product.description;

      productElement.innerHTML = `
        <a href="../products/products-1.html">
          <div class="card">
            <img src="http://44.196.192.232:5002/uploads/${product.image}" class="card-img-top" alt="${product.productname}" onerror="this.onerror=null;this.src='../assets/images/ImageNotFound.png';"/>
            <div class="card-body">
              <h5 class="card-title">${truncatedName}</h5>
              <p class="card-text">${truncatedDesc}</p>
            </div>
          </div>
        </a>
      `;

      productElement.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();
        sessionStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "../products/products-1.html";
      });

      productSection.appendChild(productElement);
    });
  };

  const noProductFound = () => {
    productSection.innerHTML = `
    <div class="no-products-found" style="text-align: center; width: 100%; border: 1px solid #ccc; border-radius: 5px; padding: 20px 0 10px 0px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p style="font-size: 35px; color: #777;">Sorry, No products are currently listed under this Subcategory.</p>
    </div>
  `;
  };
});

const style = document.createElement("style");
style.innerHTML = `
  .card-body{
    // padding: 20px 0;
  }
  .card-title, .card-text {
    text-decoration: underline #fff;
    font-weight: bold;
  }
  .card-text{
    color: #667479;
  }
`;
document.head.appendChild(style);



//Product-Desc
document.addEventListener("DOMContentLoaded", () => {
  const product = JSON.parse(sessionStorage.getItem("selectedProduct"));

  if (product) {
    const truncatedDescription =
      product.description.length > 150
        ? product.description.substring(0, 1000) + "..."
        : product.description;

    const productImgH2 = document.querySelector(".product-img h2");
    const productImgImg = document.querySelector(".product-img img");
    const productInfoH1 = document.querySelector(".product-info h1");
    const productInfoPrice = document.querySelector(".product-info h5.price");
    const productInfoP = document.querySelector(".product-info p");
    const rfqLink = document.querySelector(".product-info a");

    // Check if the elements exist before trying to update them
    if (productImgH2) productImgH2.textContent = product.subCategoryname;
    if (productImgImg) {
      productImgImg.src = `http://44.196.192.232:5002/uploads/${product.image}`;
      productImgImg.alt = product.productname;

      productImgImg.onerror = function () {
        this.onerror = null;
        this.src = "../assets/images/ImageNotFound.png";
      };
    }
    if (productInfoH1) productInfoH1.textContent = product.description;
    if (productInfoPrice)
      productInfoPrice.textContent = product.subCategoryname;
    if (productInfoP) productInfoP.textContent = product.description;

    if (rfqLink) {
      rfqLink.addEventListener("click", (e) => {
        e.preventDefault();
        sessionStorage.setItem(
          "selectedProductForRFQ",
          JSON.stringify(product)
        );
        window.location.href = rfqLink.href;
      });
    }
  } else {
    // console.error("No product data found in sessionStorage");
  }
});



//Product-RFQ
document.addEventListener("DOMContentLoaded", () => {
  const product = JSON.parse(sessionStorage.getItem("selectedProduct"));
  if (product) {
    const truncatedDescription =
      product.description.length > 150
        ? product.description.substring(0, 1000) + "..."
        : product.description;

    const productInfo1 = document.querySelector(".product-info h1");
    const productPrice = document.querySelector(".product-info .price");
    const productDesc = document.querySelector(".product-info .description");
    const productId = document.querySelector(".product-info .id");
    const productDetailImg = document.querySelector(".product-details img");
    const productImg = document.querySelector(".product-img img");

    if (productInfo1) productInfo1.textContent = product.productname;
    if (productPrice) productPrice.textContent = product.category;
    if (productDesc) productDesc.textContent = truncatedDescription;
    if (productId) productId.textContent = "Product Id: " + product.productID;
    if (productDetailImg) {
      productDetailImg.src = `http://44.196.192.232:5002/uploads/${product.image}`;
      // productImg.alt = product.productname;

      productDetailImg.onerror = function () {
        this.onerror = null;
        this.src = "../assets/images/ImageNotFound.png";
      };
    }

    // Add a click event to the RFQ link
    const rfqLink = document.querySelector(".product-info a");
    if (rfqLink) {
      rfqLink.addEventListener("click", (e) => {
        e.preventDefault();
        sessionStorage.setItem(
          "selectedProductForRFQ",
          JSON.stringify(product)
        );
        window.location.href = rfqLink.href;
      });
    }
  } else {
    // console.error("No product data found in sessionStorage");
  }
});



//About-Us
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://44.196.192.232:5002/api/aboutUs/")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      document.getElementById("startContent").textContent =
        data[0].startContent || "No startContent found";
      document.getElementById("missionImage").src =
        data[0].image || "https://via.placeholder.com/150";
      document.getElementById("missionContent").textContent =
        data[0].missionContent || "No missionContent found";
    })
    .catch((error) => {
      // console.error("Error fetching data:", error);
    });
});



// document.addEventListener("DOMContentLoaded", () => {
//   const carousel = document.getElementById("carousel");
//   const scrollRightButton = document.getElementById("scrollRight");

//   const scrollAmount = 600; // Amount to scroll each time

//   scrollRightButton.addEventListener("click", () => {
//     carousel.scrollBy({
//       left: scrollAmount,
//       behavior: "smooth",
//     });
//   });
// });

//RFQ-Form
// document.addEventListener("DOMContentLoaded", function () {
//   function manageCheckboxGroup(groupName) {
//     const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);

//     checkboxes.forEach(checkbox => {
//       checkbox.addEventListener('change', function () {
//         if (this.checked) {
//           checkboxes.forEach(otherCheckbox => {
//             if (otherCheckbox !== this) {
//               otherCheckbox.checked = false; // Uncheck others
//             }
//           });
//         }
//       });
//     });
//   }

//   // Apply the function to both checkbox groups
//   manageCheckboxGroup('personalization');
//   manageCheckboxGroup('timing');
//   document.getElementById("rfqForm").addEventListener("submit", function (event) {
//     event.preventDefault();

//     // Capture the checkbox label for personalization
//     const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//     let personalization = '';
//     checkboxes.forEach(checkbox => {
//       if (checkbox.checked && checkbox.name === "check1") {
//         const label = document.querySelector(`label[for="${checkbox.id}"]`);
//         if (label) {
//           personalization += label.textContent.trim() + " ";
//         }
//       }
//     });
//     personalization = personalization.trim();

//     // Capture the checkbox label for timing
//     let timing = '';
//     const timingCheckboxes = document.querySelectorAll('input[name^="timingCheck"]');
//     timingCheckboxes.forEach(checkbox => {
//       if (checkbox.checked) {
//         const label = document.querySelector(`label[for="${checkbox.id}"]`);
//         if (label) {
//           timing = label.textContent.trim();
//         }
//       }
//     });

//     // Capture the specific date if selected
//     const specificDate = document.querySelector('input[type="date"]').value;

//     // Prepare the form data for submission
//     const formData1 = {
//       description: document.getElementById("messages").value,
//       personalization: personalization || null,
//       engravedText: document.getElementById("engravedText").value,
//       timing: timing || null,
//       specificDate: specificDate || null,
//       fullName: document.getElementById("name").value,
//       email: document.getElementById("emails").value,
//       mobileNo: document.getElementById("phoneno").value,
//       postalCode: document.getElementById("postal-code").value,
//       message: "I will provide the logo soon and need the product by the specific date if provided."
//     };

//     // Send the POST request with the form data
//     fetch("http://44.196.192.232:5002/api/productenquiry/add", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData1),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data._id) {
//           document.getElementById("rfqForm").reset();
//         } else {
//           throw new Error("Submission failed");
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   });
// });

//Category-change
// document.addEventListener("DOMContentLoaded", () => {
//   fetch("http://44.196.192.232:5002/api/category/")
//     .then((response) => response.json())
//     .then((data) => {
//       const categoryGrid = document.querySelector('.third-box .category-grid');
//       categoryGrid.innerHTML = "";
//       sessionStorage.setItem("fetchedCategory", JSON.stringify(data));

//       data.forEach((category) => {
//         const truncatedDescription = category.description.length > 20
//           ? category.description.substring(0, 20) + "..."
//           : category.description;

//         const categoryElement = document.createElement("div");
//         categoryElement.classList.add("category");
//         categoryElement.innerHTML = `
//             <div class="card" style="background-color: black; color: white;">
//               <div class="img">
//                <img src="${category.image}" alt="${category.name}">
//               </div>
//               <h4 style="text-align: center;">${category.name}</h4>
//               <div class="price">
//                 <div style="text-align: center;">
//                   <p>${category.description}</p> <!-- Display truncated description -->
//                 </div>
//               </div>
//                <button class="details-btn" data-category='${JSON.stringify(category)}'>Details</button>
//             </div>
//             `;
//         categoryGrid.appendChild(categoryElement);
//       });

//       document.querySelectorAll(".details-button").forEach((button) => {
//         button.addEventListener("click", (e) => {
//           e.preventDefault();
//           const categoryData = JSON.parse(e.currentTarget.getAttribute("data-category"));
//           sessionStorage.setItem("selectedCategory", JSON.stringify(categoryData));
//           fetchProductsByCategory(categoryData.name);
//         });
//       });
//     })
//     .catch((error) => console.error("Error fetching categories:", error));
// });

//Product

// document.addEventListener("DOMContentLoaded", () => {
//   const product = JSON.parse(sessionStorage.getItem("selectedProduct"));

//   if (product) {
//     const truncatedDescription =
//       product.description.length > 150
//         ? product.description.substring(0, 1000) + "..."
//         : product.description;

//     const productImgH2 = document.querySelector(".product-img h2");

//     document.querySelector(".product-img h2").textContent = product.productname;
//     document.querySelector(".product-img img").src = `http://44.196.192.232:5002/uploads/${product.image}`;
//     document.querySelector(".product-img img").alt = product.productname;

//     document.querySelector(".product-info h1").textContent = product.productname;
//     document.querySelector(".product-info h5.price").textContent = product.category;
//     document.querySelector(".product-info p").textContent = truncatedDescription;

//     const rfqLink = document.querySelector(".product-info a");
//     rfqLink.addEventListener("click", (e) => {
//       e.preventDefault();
//       sessionStorage.setItem("selectedProductForRFQ", JSON.stringify(product));
//       window.location.href = rfqLink.href;
//     });
//   } else {
//     console.error("No product data found in sessionStorage");
//   }
// });

//Category Section
// document.addEventListener("DOMContentLoaded", () => {
//   fetch("http://44.196.192.232:5002/api/category/")
//     .then((response) => response.json())
//     .then((data) => {
//       const categoryGrid = document.querySelector(".category-grid");
//       categoryGrid.innerHTML = "";
//       sessionStorage.setItem("fetchedCategory", JSON.stringify(data));

//       data.forEach((category) => {
//         const categoryElement = document.createElement("div");
//         categoryElement.classList.add("category");

//         const truncatedDescription =
//           category.description.length > 150
//             ? category.description.substring(0, 150) + "..."
//             : category.description;

//         const truncatedName =
//           category.name.length > 40
//             ? category.name.substring(0, 40) + "..."
//             : category.name;

//         const formattedDescription = truncatedDescription
//           .split(" ")
//           .map((word) => {
//             if (word.length > 25) {
//               return word.match(/.{1,25}/g).join(" ");
//             }
//             return word;
//           })
//           .join(" ");

//         const formattedName = truncatedName
//           .split(" ")
//           .map((word) => {
//             if (word.length > 20) {
//               return word.match(/.{1,18}/g).join(" ");
//             }
//             return word;
//           })
//           .join(" ");

//         const encodedCategory = encodeURIComponent(JSON.stringify(category));

//         categoryElement.innerHTML = `
//           <div class="addBack">
//             <div class="img1">
//               <img src="${category.image}" alt="${category.name}">
//             </div>
//             <div class="inner-content">
//               <h3 class="addh3">${formattedName}</h3>
//               <p class="thin-text1 addp">${formattedDescription}</p>
//               <a href="" class="details-button" data-category='${encodedCategory}'>
//               <button class="pt-2">Details
//                 <svg class="ps-2" width="26" height="8" viewBox="0 0 26 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M0.921997 6.98045H23.1524L16.6282 1.42285" stroke="black" stroke-width="1.58789"/>
//                 </svg>
//               </button>
//               </a>
//             </div>
//           </div>
//         `;

//         categoryGrid.appendChild(categoryElement);
//       });

//       document.querySelectorAll(".details-button").forEach((button) => {
//         button.addEventListener("click", (e) => {
//           e.preventDefault();

//           // Decode and parse the category data
//           const categoryData = JSON.parse(
//             decodeURIComponent(e.currentTarget.getAttribute("data-category"))
//           );
//           sessionStorage.setItem(
//             "selectedCategory",
//             JSON.stringify(categoryData)
//           );
//           fetchProductsByCategory(categoryData.name);
//         });
//       });
//     })
//     .catch((error) => {
//       // console.error("Error fetching categories:", error);
//     });
// });

// Function to render products
// if (products1) {
//   const renderProducts = (productSection, cols, swiper = false) => {
//     if (!productSection) {
//       return;
//     }

//     productSection.innerHTML = "";
//     products1.forEach((product) => {
//       const productElement = document.createElement("div");
//       productElement.classList.add(...cols, "mb-4");

//       const truncatedName =
//         product.productname.length > 30
//           ? product.productname.substring(0, 30) + "..."
//           : product.productname;

//       productElement.innerHTML = `
//         <a href="../products/products-1.html">
//           <div class="card">
//             <img src="http://44.196.192.232:5002/uploads/${product.image}" class="card-img-top" alt="${product.productname}" />
//             <div class="card-body">
//               <h5 class="card-title">${truncatedName}</h5>
//               <p class="card-text">${product.category}</p>
//             </div>
//           </div>
//         </a>
//       `;

//       productElement.querySelector("a").addEventListener("click", (e) => {
//         e.preventDefault();
//         sessionStorage.setItem("selectedProduct", JSON.stringify(product));
//         window.location.href = "../products/products-1.html";
//       });

//       if (swiper) {
//         const swiperSlide = document.createElement("div");
//         swiperSlide.classList.add("swiper-slide");
//         swiperSlide.appendChild(productElement);
//         productSection.appendChild(swiperSlide);
//       } else {
//         productSection.appendChild(productElement);
//       }
//     });
//   };

//   renderProducts(productSection, ["col-lg-3", "col-md-4", "col-sm-6"]);
//   renderProducts(productSection2, ["col-sm-4"], true);
// } else {
//   console.error("No products found in sessionStorage");
// }
