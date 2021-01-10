function getEventAtLocation(aCanvasX, aCanvasY){
    //console.log('finding event...')
	  //locate the event near aCanvasX,aCanvasY

	  for(let event of events){

		  if(aCanvasX > event.x && aCanvasX < event.x + EVENTSWIDTH &&
		  aCanvasY < event.y + event.height && aCanvasY > event.y){return event};
	  }
	  return null;
}


function hexToRGB(hex) {
	  hex = hex.substring(1);//remove heading hashtag
		var bigint = parseInt(hex, 16);
		var color = {};
		color.r = (bigint >> 16) & 255;
		color.g = (bigint >> 8) & 255;
		color.b = bigint & 255;
		return color;
}

function convert24to12(hour, minuteText = ''){

	var hourtext;
	var indicator = 'am';
  if (hour == 0){hourtext = '12'}
	else if(hour < 13){hourtext = hour.toString()}
	else{
		hourtext = (hour-12).toString();
	  indicator = "pm";
	}
	if (hour == 12){indicator = "pm"}
	return hourtext + minuteText + indicator;
}



function deleteObjectFromArray(obj, arr){
	for(let i = 0; i < arr.length; i++){
		if(obj === arr[i]) arr.splice(i, 1);
	}
}

function getTimeFromGrid(grid){
	var totalMinutes = (grid % 288) * 5;
  var minuteText = (totalMinutes % 60).toString();
  if(minuteText.length < 2){minuteText = "0" + minuteText}
  var hour = Math.floor(totalMinutes/60);
  return convert24to12(hour, ':' + minuteText);
}

//get event info needed for saving
function serializeEvents(eventArray){
	let serializedEvents = []
	for(let event of eventArray){
		let serialized = {};
		serialized.name = event.name;
	  serialized.description = event.description;
	  serialized.color = event.color;
	  serialized.grid = event.grid;
	  serialized.duration = event.duration;
		serializedEvents.push(serialized);
	}
	return serializedEvents;
}


//load an event array to the current event array
function loadEvents(eventArray){
	for(let event of eventArray){
		let newEvent = new Event(event.name, event.description, event.color, event.grid, event.duration);
	  newEvent.setGraphics();
	  events.push(newEvent);
	}
	drawCanvas();
}
