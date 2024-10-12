FROM nginx:latest

WORKDIR /usr/share/nginx/html

# Copy the contents of your local directory to the working directory in the container
COPY assets /usr/share/nginx/html/assets
COPY cssfiles /usr/share/nginx/html/cssfiles
COPY index.html /usr/share/nginx/html/index.html
COPY pages /usr/share/nginx/html/pages
COPY products /usr/share/nginx/html/products
COPY products-pages /usr/share/nginx/html/products-pages
COPY rfq /usr/share/nginx/html/rfq
COPY script.js /usr/share/nginx/html/script.js
COPY style.css /usr/share/nginx/html/style.css

# Expose port 80 inside the container
EXPOSE 80

# Command to run the Nginx server when the container starts
CMD ["nginx", "-g", "daemon off;"]
