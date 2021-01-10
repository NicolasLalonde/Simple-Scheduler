//GLOBALS AND CONSTANTS

/*
Copyright 2020 Nicolas Lalonde

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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
