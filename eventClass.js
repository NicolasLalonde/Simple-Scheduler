// EVENT OBJECT "CLASS"

/*
***Native properties***

name
description
grid(start time and day in 5 minute slices, 288 grids is a day)
duration(in grids)


***Graphic Properties***

color (of box)
textcolor
x
y
height (of box)

*/

//constructor
function Event(name, description, color, grid = 2017, duration = 12){
  this.name = name;
  this.description = description;
  this.color = color;
  this.grid = grid;
  this.duration = duration;//1 hour
  this.x = 0;
  this.y = 0;

}

//sets text black if the background is light and white if the background is dark
Event.prototype.setTextColor = function(){
  var rgb = hexToRGB(this.color);
  var brightness = rgb.r + rgb.g + rgb.b;

  if (brightness > 254){this.textcolor = '#000000'}//black text if background light
  else{this.textcolor = '#FFFFFF'}//white text if background dark

  return this;
}

/*
takes the current grid value of an event and sets its xy coordinates to what they should be
used for snapping the event to an appropriate place instead of floating all over the calendar, and for generating a location from scratch
*/
Event.prototype.setXYFromGrid = function(){
  if(this.grid < 2017){
    this.x = EXTRAWIDTH + Math.floor(this.grid / 288) * EVENTSWIDTH + DAYLINESWIDTH * 0.75;//get the day from the grid to determine x coordinate
    this.y = (FIVEMINUTEHEIGHT * 12) + ((this.grid % 288) * FIVEMINUTEHEIGHT - MINHOUR * 12 * FIVEMINUTEHEIGHT);//get the hour from the grid to determine y coordinate
  } else{//just make sure its below the calendar if its not part of it
    this.y = Math.max(this.y, FIVEMINUTEHEIGHT *12 * (1.2 + MAXHOUR - MINHOUR));
    //make sure the event is completely within the canvas in x coordinates
    this.x = Math.max(0.25 * EXTRAWIDTH, this.x);
    this.x = Math.min(canvas.width - EVENTSWIDTH, this.x)
  }

  return this;//for chaining
}


Event.prototype.setGridFromXY = function(){
  this.grid = this.getGridFromXY();
  return this;
}

/*
get grid coordinate according to the current xy coordinates
used when dragging an event to change its grid accordingly and to print its time
*/
Event.prototype.getGridFromXY = function(){
  var gridcount = 0;
  if(this.y > FIVEMINUTEHEIGHT * 12 * (1 + MAXHOUR - MINHOUR)){
    gridcount = 2017;
  } else {
    gridcount += Math.max((((this.y - FIVEMINUTEHEIGHT * 12) / FIVEMINUTEHEIGHT) + MINHOUR * 12), MINHOUR * 12);//gridding the y coord
    gridcount += 288 * Math.floor((this.x + 0.5 * EVENTSBOXWIDTH - EXTRAWIDTH) / EVENTSWIDTH)
  }
  if(gridcount < 0) gridcount = 2017;
  return Math.floor(gridcount);
}


Event.prototype.setHeigthFromDuration = function(){
  this.height = this.duration * FIVEMINUTEHEIGHT;
  return this;
}

Event.prototype.setGraphics = function(){
  return this.setXYFromGrid().setHeigthFromDuration().setTextColor();;
}

Event.prototype.snapLocation = function(){
  return this.setGridFromXY().setXYFromGrid();
}


/*
generates a formatted time string (eg 8:15am) from the grid coordinates
*/
Event.prototype.getTimeString = function(){
  return getTimeFromGrid(this.getGridFromXY())
}

Event.prototype.getEndTimeString = function(){
  return getTimeFromGrid(this.getGridFromXY() + this.duration)
}

//object editor
Event.prototype.edit = function(name, description, color, grid, duration){
  this.name = name;
  this.description = description;
  this.color = color;
  this.grid = grid;
  this.duration = duration;
  this.setGraphics();
  return this;
}

//return a new event with the same properties except for time
Event.prototype.duplicate = function(){
  var newEvent = new Event(this.name, this.description, this.color, 2017, this.duration);
  return newEvent.setGraphics();
}
//EVENT OBJECT "CLASS"
