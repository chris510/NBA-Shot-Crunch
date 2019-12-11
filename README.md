# NBA-Shot-Crunch

Creating a shot-chart of individual top NBA-level players. Users are able to filter the data for each player by season, team, and whether the shot was made or missed.

[Live Link](https://nba-shot-crunch.herokuapp.com/)

## Technologies

* Javascript
* CSS and HTML5 Canvas
* D3

## DataSet

Data was parsed from the [NBA Stats API](https://stats.nba.com/) along with [toddwschneider](https://github.com/toddwschneider)'s [nba-shots-db](https://github.com/toddwschneider/nba-shots-db)

## Features

### Basketball Court 

D3.js was used to plot the basketball court chart reflecting the dimensions of an [NBA Court](https://en.wikipedia.org/wiki/Basketball_court).

### Shots

Hexagonal binning(d3-hexbin) was used to reflect the shots taken with missed shots and made shots representing blue. Shot coordinates on a basketball court often overlap each other so the hexgonal binning is a great way to display the density of a player's shots taken on the court; more saturated colors means more number of shots was taken at that area)

### Shot Filters

Among the players that are listed, filters were created to parse a player's shots according to the user's indicated shots of shot made/missed, season, or team against.

## Future Implementations

* Show a users Shot chart percentage at a given spot as well as a total percentage according to the filters.
