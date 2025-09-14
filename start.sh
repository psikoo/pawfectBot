#!/bin/bash
sudo git stash
sudo git pull
sudo chmod +x ./start.sh
sudo docker build -t pawfect-bot:1 .
sudo docker restart pawfect-bot