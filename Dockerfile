FROM node:18

WORKDIR /app/BACKEND

COPY app/BACKEND/package.json ./
COPY app/BACKEND/package-lock.json ./
COPY app/BACKEND/index.js ./


RUN npm install
RUN npm install nodemon

RUN ls -lah

#CMD ["npm", "run", "start"]
CMD ["nodemon", "index.js"]