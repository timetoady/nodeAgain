# Simple Roster API

## Endpoints

GET '/':                Gives basic welcome message.
GET '/roster':          Returns entire roster
GET '/player/:number':  Returns rostered player given player's jersey number
POST '/addplayer":      Given name, number, height, weight, and position in request body, adds player to the roster, automatically generating an ID.
PUT '/player/:id":      Given player ID, lets you edit name, number, height, weight, and/or position from request body.
DELETE '/player/:id':   Given player ID, removes player from roster. Will return an error if matching ID is not found.