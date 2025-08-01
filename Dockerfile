FROM node:latest

RUN mkdir -p /usr/src/pawfectBot
WORKDIR /usr/src/pawfectBot

COPY package.json /usr/src/pawfectBot
RUN npm install

COPY . /usr/src/pawfectBot

# Start the bot.
RUN node ./src/deploy.js
CMD ["node", "./src/discordBot.js"]
