//GLOBALS AND CONSTANTS

var canvas = document.getElementById("canvas1"); //our drawing canvas
var events = new Array();
var deltaX, deltaY; //location where mouse is pressed
var eventBeingMoved;

const EXTRAWIDTH = 100;//extra width for time on the left of the canvas
const EVENTSWIDTH = ((canvas.width) - EXTRAWIDTH) / 7;
const DAYLINESWIDTH = 2;
const EVENTSBOXWIDTH = EVENTSWIDTH - DAYLINESWIDTH * 1.5;

const TEXTOFFSET = 3;//border offset for text within events
const LINEHEIGHT = 8; //height of event description lines

const EVENTITLEFONT = 'bold ' + (LINEHEIGHT + 1).toString() +'px helvetica'
const EVENTFONT = (LINEHEIGHT).toString() +'px Arial'
const HOUR_FONT = '8pt helvetica';
const DAY_FONT = '10pt Helvetica';

var FIVEMINUTEHEIGHT;
var MINHOUR = 8;
var MAXHOUR = 24;

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

//GLOBALS AND CONSTANTS
