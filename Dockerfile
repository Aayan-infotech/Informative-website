FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY assets /usr/share/nginx/html/assets
COPY cssfiles /usr/share/nginx/html/cssfiles
COPY index.html /usr/share/nginx/html/index.html
COPY pages /usr/share/nginx/html/pages
COPY products /usr/share/nginx/html/products
COPY products-pages /usr/share/nginx/html/products-pages
COPY rfq /usr/share/nginx/html/rfq
COPY script.js /usr/share/nginx/html/script.js
COPY style.css /usr/share/nginx/html/style.css

# Copy your custom Nginx configuration file
COPY nginx.config /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
