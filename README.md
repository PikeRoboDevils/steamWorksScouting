# SteamWorksScouting
Scouting app for the steamworks frc game. Our application is built using the Ionic framework version 1.

# Requirement 
* Node/npm
* Ionic
* Cordova

# Commands
## Initial Setup
> npm install -g ionic cordova

## Run
* cd steamWorksScouting
* ionic serve

## Starting App on Raspberry Pi
* cd steamWorksScoutingDB
* mongod-dbpath=/home/pi/data/-port=9000
* sudo node index.js

## Exporting Data from the pi
* cd steamWorksScoutingDB
* sh export.sh
* eject the flash-drive from the pi
* android file transfer
* flashdrive plugged into computer 
* open data.csv
* copy the data.csv
* open downloads folder on device and data.csv

## Putting app on Android
* Enable USB debugging on device
* settings, general, about device, tap "Build Number" 7 times
* Plug device into laptop and trust computer on device
* ON TERMINAL:
* cd steamWorksScouting
* ionic build android
* ionic run android