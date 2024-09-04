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
  document.getElementById("enquiryForm").addEventListener("submit", function (event) {
      event.preventDefault();
      var thankYouModal = new bootstrap.Modal(
        document.getElementById("thankYouModal")
      );
      thankYouModal.show();
    });
});

// Conatct Us
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contactForm").addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("Hello");

      const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        mobileNo: document.getElementById("mobileNumber").value,
        message: document.getElementById("message").value,
      };

      fetch("http://3.111.163.2:5002/api/ContactUs/add", {
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

// Enquiry Form
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("enquiryForm").addEventListener("submit", function (event) {
      event.preventDefault();
      const formData1 = {
        fullName: document.getElementById("name").value,
        email: document.getElementById("emails").value,
        message: document.getElementById("messages").value,
      };

      fetch("http://3.111.163.2:5002/api/enquiry/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData1),
      }).then((response) => response.json())
        .then((data) => {
          
          if (data._id) {
            document.getElementById("enquiryForm").reset();
          } else {
            throw new Error("Submission failed");
          }
        })
        .catch((error) => {
          console.log("Hello");
        });
    });
});

// Product-Query Form
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("rfqForm").addEventListener("submit", function (event) {
      event.preventDefault();
      const formData2 = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        mobileNo: document.getElementById("number").value,
        productname: document.getElementById("productName").value,
        productID: document.getElementById("productId").value,
        message: document.getElementById("message").value,
      };

      fetch("http://3.111.163.2:5002/api/productenquiry/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData2),
      }).then((response) => response.json())
        .then((data) => {
          
          if (data._id) {
            document.getElementById("rfqForm").reset();
          } else {
            throw new Error("Submission failed");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
});

// Testimonial Section

// document.addEventListener("DOMContentLoaded", function () {
//   const testimonialsContainer = document.querySelector(
//     ".testimonials-section"
//   );

//   // Dummy array for testing
//   const data = [
//     {
//       testimonial: "This is a great product! Highly recommend it to everyone.",
//       image: "../assets/testimonials/unsplash_-QJvYDTCwAg-1.png",
//     },
//     {
//       testimonial: "Amazing service and support. Will definitely use it again.",
//       image: "../assets/testimonials/unsplash_-QJvYDTCwAg-2.png",
//     },
//     {
//       testimonial: "Exceeded all my expectations! Fantastic experience.",
//       image: "../assets/testimonials/unsplash_-QJvYDTCwAg-3.png",
//     },
//     {
//       testimonial: "High-quality product and great customer service.",
//       image: "../assets/testimonials/unsplash_-QJvYDTCwAg-4.png",
//     },
//   ];

//   let toggle = true;

//   data.forEach((testimonial, index) => {
//     const testimonialContainer = document.createElement("div");
//     testimonialContainer.className = `testimonial-container ${
//       toggle ? "left" : "right"
//     }`;
//     toggle = !toggle;

//     const testimonialDiv = document.createElement("div");
//     testimonialDiv.className = "testimonial";

//     const testimonialContent = document.createElement("div");
//     testimonialContent.className = "testimonial-content d-flex";

//     const testimonialText = document.createElement("p");
//     testimonialText.textContent = `"${testimonial.testimonial}"`;

//     const testimonialImage = document.createElement("img");
//     testimonialImage.src = testimonial.image;
//     testimonialImage.alt = "Customer";
//     testimonialImage.className = "testi-img";

//     testimonialContent.appendChild(testimonialText);
//     testimonialContent.appendChild(testimonialImage);
//     testimonialDiv.appendChild(testimonialContent);
//     testimonialContainer.appendChild(testimonialDiv);
//     testimonialsContainer.appendChild(testimonialContainer);
//   });
// });
document.addEventListener("DOMContentLoaded", function () {
  const apiEndpoint = "http://3.111.163.2:5002/api/testimonial/";
  const testimonialsContainer = document.querySelector(
    ".testimonials-section"
  );

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
document.addEventListener("DOMContentLoaded", function(){
  const apiEndpoint = "http://3.111.163.2:5002/api/faq/";
  const faqContainer = document.querySelector(".faq-container");

  fetch(apiEndpoint).then((resp) => resp.json()).then((data) => {
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
      answerP.className="thin-text";
      answerP.textContent = item.answer;

      answerDiv.appendChild(answerP);

      faqItem.appendChild(quesDiv);
      faqItem.appendChild(answerDiv);
      faqContainer.appendChild(faqItem);
    });
  }).catch((error) => {
    console.log(error);
  })
});

function toggleAnswer(element){
  const ansDiv = element.querySelector(".answer");
  if(ansDiv.style.display === "Block"){
    ansDiv.style.display = "none";
  }else{
    ansDiv.style.display="block";
  }
}

//Gallery Section
document.addEventListener("DOMContentLoaded", () => {
  fetch('http://3.111.163.2:5002/api/gallery/')
    .then(response => response.json())
    .then(data => {
      const galleryGrid = document.querySelector('.gallery-grid');
      galleryGrid.innerHTML = '';

      data.forEach((gallery, index) => {
        const galleryElement = document.createElement('div');
        galleryElement.classList.add('gallery');
        galleryElement.style.backgroundImage = `url(http://3.111.163.2:5002/uploads/${gallery.image})`;
        galleryElement.style.backgroundSize = 'cover'; 
        galleryElement.style.backgroundPosition = 'center'; 
        galleryElement.style.backgroundRepeat = 'no-repeat';
        galleryElement.style.width = '90%'; 
        galleryElement.style.height = '330px'; 

        galleryElement.innerHTML = `
          <h3>${gallery.title}</h3>
          <p class="thin-text">${gallery.text}</p>
        `;

        galleryGrid.appendChild(galleryElement);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});

//Category Section
// document.addEventListener("DOMContentLoaded", () => {
//   fetch('http://3.111.163.2:5002/api/category/')
//     .then(response => response.json())
//     .then(data => {
//       const categoryGrid = document.querySelector('.category-grid');
//       categoryGrid.innerHTML = '';

//       data.forEach((category, index) => {
//         const categoryElement = document.createElement('div');
//         categoryElement.classList.add('category');
//         categoryElement.style.backgroundImage = `url(http://3.111.163.2:5002/uploads/${category.image})`;
//         categoryElement.style.backgroundSize = 'cover';
//         categoryElement.style.backgroundRepeat = 'no-repeat';

//         categoryElement.innerHTML = `
//           <h3>${category.name}</h3>
//           <p class="thin-text">${category.description}</p>
//           <a href="./products-pages/${category.name.replace(/ /g, '-').toLowerCase()}.html">
//             <button class="pt-2">Details
//               <svg class="ps-2" width="26" height="8" viewBox="0 0 26 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M0.921997 6.98045H23.1524L16.6282 1.42285" stroke="white" stroke-width="1.58789"/>
//               </svg>
//             </button>
//           </a>
//         `;
//         categoryGrid.appendChild(categoryElement);
//       });
//     })
//     .catch(error => console.error('Error fetching data:', error));
// });

// document.addEventListener("DOMContentLoaded", () => {
//   fetch('http://3.111.163.2:5002/api/category/')
//     .then(response => response.json())
//     .then(data => {
//       const categoryGrid = document.querySelector('.category-grid');
//       categoryGrid.innerHTML = '';

//       data.forEach((category) => {
//         const categoryElement = document.createElement('div');
//         categoryElement.classList.add('category');
//         categoryElement.style.backgroundImage = `url(http://3.111.163.2:5002/uploads/${category.image})`;
//         categoryElement.style.backgroundSize = 'cover';
//         categoryElement.style.backgroundRepeat = 'no-repeat';

//         categoryElement.innerHTML = `
//           <h3>${category.name}</h3>
//           <p class="thin-text">${category.description}</p>
//           <a href="" class="details-button" data-category="${category.name}">
//             <button class="pt-2">Details
//               <svg class="ps-2" width="26" height="8" viewBox="0 0 26 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M0.921997 6.98045H23.1524L16.6282 1.42285" stroke="white" stroke-width="1.58789"/>
//               </svg>
//             </button>
//           </a>
//         `;

//         categoryGrid.appendChild(categoryElement);
//       });

//       // Add event listeners for the details buttons
//       document.querySelectorAll('.details-button').forEach(button => {
//         button.addEventListener('click', (e) => {
//           e.preventDefault();
//           const categoryName = e.currentTarget.getAttribute('data-category');
//           fetchProductsByCategory(categoryName);
//           setTimeout(() => {
//             window.location.href = `./products-pages/Cigar-Product.html`;
//           }, 500);
//         });
//       });
//     })
//     .catch(error => console.error('Error fetching categories:', error));
// });

// function fetchProductsByCategory(categoryName) {
//   let productSection = document.querySelector('.products-section');
  
//   if (!productSection) {
//     productSection = document.createElement('section');
//     productSection.classList.add('products-section', 'py-5');
//     document.body.appendChild(productSection);

//     const containerDiv = document.createElement('div');
//     containerDiv.classList.add('container');
//     productSection.appendChild(containerDiv);

//     const rowDiv = document.createElement('div');
//     rowDiv.classList.add('row');
//     containerDiv.appendChild(rowDiv);
//   }

//   const productRow = productSection.querySelector('.row');
//   productRow.innerHTML = ''; 

//   fetch(`http://3.111.163.2:5002/api/product/getproduct/${categoryName}`)
//     .then(response => response.json())
//     .then(products => {
//       products.forEach(product => {
//         const productElement = document.createElement('div');
//         productElement.classList.add('col', 'mb-4');
        
//         productElement.innerHTML = `
//           <a href="./products-pages/Cigar-Product.html">
//             <div class="card">
//               <img src="http://3.111.163.2:5002/uploads/${product.image}" class="card-img-top" alt="${product.productname}" />
//               <div class="card-body">
//                 <h5 class="card-title">${product.productname}</h5>
//                 <p class="card-text">$${product.price}</p>
//               </div>
//             </div>
//           </a>
//         `;
//         productRow.appendChild(productElement);
//       });
//     })
//     .catch(error => console.error('Error fetching products:', error));
// }


document.addEventListener("DOMContentLoaded", () => {
  fetch('http://3.111.163.2:5002/api/category/')
    .then(response => response.json())
    .then(data => {
      const categoryGrid = document.querySelector('.category-grid');
      categoryGrid.innerHTML = '';
      // const heroSection = document.querySelector('.d-grid');

      data.forEach((category) => {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');
        categoryElement.style.backgroundImage = `url(http://3.111.163.2:5002/uploads/${category.image})`;
        categoryElement.style.backgroundSize = 'cover';
        categoryElement.style.backgroundRepeat = 'no-repeat';

        categoryElement.innerHTML = `
          <h3>${category.name}</h3>
          <p class="thin-text">${category.description}</p>
          <a href="" class="details-button" data-category="${category.name}">
            <button class="pt-2">Details
              <svg class="ps-2" width="26" height="8" viewBox="0 0 26 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.921997 6.98045H23.1524L16.6282 1.42285" stroke="white" stroke-width="1.58789"/>
              </svg>
            </button>
          </a>
        `;

        categoryGrid.appendChild(categoryElement);
      });

      document.querySelectorAll('.details-button').forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const categoryName = e.currentTarget.getAttribute('data-category');
          fetchProductsByCategory(categoryName);
        });
      });
    })
    .catch(error => console.error('Error fetching categories:', error));
});

function fetchProductsByCategory(categoryName) {
  fetch(`http://3.111.163.2:5002/api/product/getproduct/${categoryName}`)
    .then(response => response.json())
    .then(products => {
      sessionStorage.setItem('fetchedProducts', JSON.stringify(products));
      const currentPage = window.location.pathname;
      console.log(currentPage);
      let redirectPath = './products-pages/Cigar-Product.html';

      if (currentPage.includes('products')) {
        redirectPath = '../products-pages/Cigar-Product.html';
      }

      window.location.href = redirectPath;
    })
    .catch(error => console.error('Error fetching products:', error));
}

document.addEventListener("DOMContentLoaded", () => {
  const productSection = document.querySelector('.products-section .row');
  const products = JSON.parse(sessionStorage.getItem('fetchedProducts'));

  if (products) {
    productSection.innerHTML = '';

    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4');

      productElement.innerHTML = `
        <a href="../products/products-1.html">
          <div class="card">
            <img src="http://3.111.163.2:5002/uploads/${product.image}" class="card-img-top" alt="${product.productname}" />
            <div class="card-body">
              <h5 class="card-title">${product.productname}</h5>
              <p class="card-text">${product.price}</p>
            </div>
          </div>
        </a>
      `;

      productElement.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        // Store the clicked product data in sessionStorage
        sessionStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = "../products/products-1.html";
      });

      productSection.appendChild(productElement);
    });
  } else {
    console.error('No products found in sessionStorage');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const product = JSON.parse(sessionStorage.getItem('selectedProduct'));

  if (product) {
    document.querySelector('.product-img h2').textContent = product.productname;
    document.querySelector('.product-img img').src = `http://3.111.163.2:5002/uploads/${product.image}`;
    document.querySelector('.product-img img').alt = product.productname;

    document.querySelector('.product-info h1').textContent = product.productname;
    document.querySelector('.product-info h5.price').textContent = product.price;
    document.querySelector('.product-info p').textContent = product.description;

    const rfqLink = document.querySelector('.product-info a');
    rfqLink.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.setItem('selectedProductForRFQ', JSON.stringify(product));
      window.location.href = rfqLink.href;
    });
  } else {
    console.error('No product data found in sessionStorage');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const product = JSON.parse(sessionStorage.getItem('selectedProduct'));
  if (product) {
    document.querySelector('.product-info h1').textContent = product.productname;
    document.querySelector('.product-info .price').textContent = product.price;
    document.querySelector('.product-info .description').textContent = product.description;
    document.querySelector('.product-info .id').textContent = product.productID;
    document.querySelector('.product-details img').src = `http://3.111.163.2:5002/uploads/${product.image}`;
    document.querySelector('.product-img img').alt = product.productname;

    // Add a click event to the RFQ link
    const rfqLink = document.querySelector('.product-info a');
    rfqLink.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.setItem('selectedProductForRFQ', JSON.stringify(product));
      window.location.href = rfqLink.href;
    });
  } else {
    console.error('No product data found in sessionStorage');
  }
});