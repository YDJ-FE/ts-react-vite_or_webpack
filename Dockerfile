# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:8.12 as build-stage
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build:qa --production

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15.4
COPY --from=build-stage /app/dist/qa/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /app/_nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/_nginx/nginx.conf /etc/nginx/nginx.conf