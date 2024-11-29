FROM node:18

WORKDIR /app

COPY app/BACKEND/package.json ./
COPY app/BACKEND/package-lock.json ./
#COPY app/BACKEND/index.js ./


RUN npm install
RUN npm install -g nodemon

#RUN ls -lah

COPY app/BACKEND/ . 

#CMD ["npm", "run", "start"]
CMD ["nodemon", "index.js"]
