
//main drawing loop, call after every event
var drawCanvas = function(){

    var context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width,canvas.height); //erase canvas


    drawGrid(context, MINHOUR, MAXHOUR)//draws the schedule grid

    //draws the events
    for(let event of events){

			context.fillStyle = event.color;//choose color
			context.fillRect(event.x, event.y, EVENTSBOXWIDTH, event.height); //fill event box
			context.fillStyle = event.textcolor;
      context.font = EVENTITLEFONT;

      let startTime;
      let timeStringWidth;
      let firstLineHeight = event.y + TEXTOFFSET + LINEHEIGHT
      if(event.getGridFromXY() < 2017){//if within calendar print hour
        startTime = event.getTimeString()
        endTime = event.getEndTimeString()
        timeString = startTime + " " + endTime
        timeStringWidth = Math.max(context.measureText(startTime).width, context.measureText(endTime).width)
        wrapText(context,
          timeString,
          event.x + EVENTSBOXWIDTH - timeStringWidth - TEXTOFFSET,//closest to right border
          firstLineHeight,
          timeStringWidth,//max width, other time will go on next line
          LINEHEIGHT*2,//maxheigth
          LINEHEIGHT);//line height offset
      } else {//not within calendar
        timeStringWidth = 0
      }


      //print event title
			wrapText(context,
        event.name,//title
        event.x + TEXTOFFSET,
        firstLineHeight,
        EVENTSBOXWIDTH - timeStringWidth - TEXTOFFSET * 2,//maxwidth
        LINEHEIGHT*2,//maxheigth
        LINEHEIGHT);


      context.font = EVENTFONT;
      //print description
			wrapText(context,
         event.description,//text
         event.x + TEXTOFFSET,//x
         event.y + TEXTOFFSET + LINEHEIGHT*3, //y, offset + first line + empty line + line its on
         EVENTSBOXWIDTH - 2 * TEXTOFFSET, //maxWidth
         event.height - (TEXTOFFSET * 2 + LINEHEIGHT*3),//maxHeight
         LINEHEIGHT);
	}
}



//wraps text within the inside of a box and prints it
function wrapText(context, text, x, y, maxWidth, maxHeight, lineHeight) {

	var words = text.split(' ');
	var line = '';
  var lastline = false;
  var curY = y;
  var testWidth;
  var lastWord = false;
  if (curY > y + maxHeight) return;

  if (curY + lineHeight > y + maxHeight){lastline = true;}//check if upcoming line is lastline that will fit (

	for(var n = 0; n < words.length; n++) {
  	var testLine = line + words[n] + ' ';//add next word
    lastWord = n == words.length - 1;
    if(lastline && !lastWord){testWidth = context.measureText(testLine + '...').width}//add '...' if last line that fits
    else {testWidth = context.measureText(testLine).width};//get the width of the line
		if (testWidth > maxWidth && n > 0) {//check if word fits on the line
      if(lastline && !lastWord){context.fillText(line + '...', x, curY);
                   return;//end if last line that fits
      }
			else{context.fillText(line, x, curY)}//print the line
			line = words[n] + ' ';//start new line with the word that doesnt fit
			curY += lineHeight;//increment Y
      if (curY + lineHeight > y + maxHeight){lastline = true}//check if upcoming line is lastline that will fit

		}
		else {
			line = testLine;//add the word to the line
		}
	}

context.fillText(line, x, curY);//print the last line if it fits
}



//draws a schedule grid onto the canvas
function drawGrid(context, start24Hour, end24Hour){
  var heightInhours = end24Hour - start24Hour + 5;//6 extra hours are for unplaced events and day names
  FIVEMINUTEHEIGHT = canvas.height / (heightInhours * 12);//12 times five minutes in an hour

  //print hours
  var lineY= 12 * FIVEMINUTEHEIGHT;//start one hour down
  drawLine(context, 0, lineY, canvas.width, lineY)//hour mark line
  for(let hour = start24Hour; hour < end24Hour; hour++){
    for(let i = 0; i < 3; i++){
      lineY += 3 * FIVEMINUTEHEIGHT;//line for each 15 minutes
      drawLine(context, EXTRAWIDTH, lineY, canvas.width, lineY, 0.3, '#999999')
    }

    //hour text
    context.font = HOUR_FONT;
    context.fillStyle = '#000000';
    context.fillText(convert24to12(hour), EXTRAWIDTH/3, lineY)

    lineY += 3 * FIVEMINUTEHEIGHT;
    drawLine(context, 0, lineY, canvas.width, lineY)//hour mark line
  }

  //print days
  for(let i = 0; i < 8; i++){
    drawLine(context, EXTRAWIDTH + EVENTSWIDTH * i, 0, EXTRAWIDTH + EVENTSWIDTH * i, lineY, DAYLINESWIDTH)
    if (i < 7){
      context.font = DAY_FONT;
      context.fillStyle = '#000000';
      context.fillText(weekdays[i], EXTRAWIDTH + EVENTSWIDTH * (i + 0.5)- 0.5 * context.measureText(weekdays[i]).width, 9 * FIVEMINUTEHEIGHT)//centered text for days
    }
  }
}



//draws a line on the canvas
function drawLine(context, x, y, toX, toY, width = 1, color = '#000000'){
  context.lineWidth = width;
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(toX, toY);
  context.strokeStyle = color;
  context.stroke();
}

//generates an HTML panel for editing an event
function editPane(event){
  console.log(JSON.stringify(event))
  return "<hr> <h3>Edit event:</h3>" +
    "<form id='editForm' action=''>" +
    "<label>Name:</label>" +
    "<input id='newname' type='text' name='name' value='" + event.name +"' />" +
    "<label>Description:</label>" +
    "<textarea id ='newdescription', name='description', rows=3>" + event.description +"</textarea>" +
    "<input id='newcolor' type='color' name='color' value='" + event.color + "' />" +
    "<input type='number' id='newduration' name='duration'  min='5' max='12000' step='5' value='" + event.duration * 5 + "' />" +
    "<input type='button' value='Save Changes' onclick='editSelectedEvent()'/>" +
    "<input type='button' value='Duplicate' onclick='duplicateSelectedEvent()'/>" +
    "<input type='button' value='Delete' onclick='deleteSelectedEvent()'/>" +
  "</form>";
}
