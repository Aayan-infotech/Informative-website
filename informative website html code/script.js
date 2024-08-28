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
//   const apiEndpoint = "http://3.111.163.2:5002/api/testimonial/";
//   const testimonialsContainer = document.querySelector(
//     ".testimonials-section"
//   );

//   fetch(apiEndpoint)
//     .then((response) => response.json())
//     .then((data) => {
//       let toggle = true;

//       data.forEach((testimonial, index) => {
//         const testimonialContainer = document.createElement("div");
//         testimonialContainer.className = `testimonial-container ${
//           toggle ? "left" : "right"
//         }`;
//         toggle = !toggle;

//         const testimonialDiv = document.createElement("div");
//         testimonialDiv.className = "testimonial";

//         const testimonialContent = document.createElement("div");
//         testimonialContent.className = "testimonial-content d-flex";

//         const testimonialText = document.createElement("p");
//         testimonialText.textContent = `"${testimonial.testimonial}"`;

//         const testimonialImage = document.createElement("img");
//         testimonialImage.src = testimonial.image; 
//         testimonialImage.alt = "Customer";
//         testimonialImage.className = "testi-img";

//         // Append elements
//         testimonialContent.appendChild(testimonialText);
//         testimonialContent.appendChild(testimonialImage);
//         testimonialDiv.appendChild(testimonialContent);
//         testimonialContainer.appendChild(testimonialDiv);
//         testimonialsContainer.appendChild(testimonialContainer);
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching testimonials:", error);
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
  const testimonialsContainer = document.querySelector(
    ".testimonials-section"
  );

  // Dummy array for testing
  const data = [
    {
      testimonial: "This is a great product! Highly recommend it to everyone.",
      image: "../assets/testimonials/unsplash_-QJvYDTCwAg-1.png",
    },
    {
      testimonial: "Amazing service and support. Will definitely use it again.",
      image: "../assets/testimonials/unsplash_-QJvYDTCwAg-2.png",
    },
    {
      testimonial: "Exceeded all my expectations! Fantastic experience.",
      image: "../assets/testimonials/unsplash_-QJvYDTCwAg-3.png",
    },
    {
      testimonial: "High-quality product and great customer service.",
      image: "../assets/testimonials/unsplash_-QJvYDTCwAg-4.png",
    },
  ];

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
    testimonialImage.src = testimonial.image;
    testimonialImage.alt = "Customer";
    testimonialImage.className = "testi-img";

    testimonialContent.appendChild(testimonialText);
    testimonialContent.appendChild(testimonialImage);
    testimonialDiv.appendChild(testimonialContent);
    testimonialContainer.appendChild(testimonialDiv);
    testimonialsContainer.appendChild(testimonialContainer);
  });
});

//FAQ section
document.addEventListener("DOMContentLoaded", function(){
  const apiEndpoint = "http://3.111.163.2:5007/api/faq/";
  const faqContainer = document.querySelector(".faq-container");

  fetch(apiEndpoint).then((resp) => resp.json()).then((data) => {
    data.forEach((item) => {
      const faqItem = document.createElement("div");
      faqItem.className = "faq-item";
      faqItem.setAttribute("onClick", "toggleAnswer(this)");

      const quesDiv = document.createElement("div");
      quesDiv.className = "question";
      quesDiv.textContent = "item.ques";

      const arrowSpan = document.createElement("span");
      arrowSpan.className = "arrow";
      arrowSpan.textContent = "▼";

      quesDiv.appendChild(arrowSpan);


      const answerDiv = document.createElement("div");
      answerDiv.className = "answer";

      const answerP = document.createElement("p");
      answerP.className="thin-text";
      answerP.textContent = item.ans;

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
