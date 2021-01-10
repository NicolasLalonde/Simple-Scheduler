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

function handleMouseDown(e){

  //get mouse location relative to canvas top left
  var rect = canvas.getBoundingClientRect();

  var canvasX = e.pageX - rect.left; //use jQuery event object pageX and pageY
  var canvasY = e.pageY - rect.top;
  //console.log("mouse down:" + canvasX + ", " + canvasY);

  eventSelected = getEventAtLocation(canvasX, canvasY);

  if(eventSelected != null ){
     deltaX = eventSelected.x - canvasX;
     deltaY = eventSelected.y - canvasY;
     document.getElementById('editPane').innerHTML = editPane(eventSelected);


    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup", handleMouseUp)


}else{document.getElementById('editPane').innerHTML = ''}

    // Stop propagation of the event and stop any default
    //  browser action

    e.stopPropagation();
    e.preventDefault();


  drawCanvas();

}

function handleMouseMove(e){

	//console.log("mouse move");

	//get mouse location relative to canvas top left
	var rect = canvas.getBoundingClientRect();
    var canvasX = e.pageX - rect.left;
    var canvasY = e.pageY - rect.top;

	eventSelected.x = canvasX + deltaX;
	eventSelected.y = canvasY + deltaY;

  //eventSelected.setTimeFromXY()

	e.stopPropagation();

	drawCanvas();
}


function handleMouseUp(e){
	//console.log("mouse up");

	e.stopPropagation();

	//remove mouse move and mouse up handlers but leave mouse down handler
  eventSelected.snapLocation()
	canvas.removeEventListener("mousemove", handleMouseMove) //remove mouse move handler
	canvas.removeEventListener("mouseup", handleMouseUp)//remove mouse up handler
	drawCanvas(); //redraw the canvas
}

function newEventCreator(){

  var name = document.getElementById('name').value
  var description = document.getElementById('description').value
  var color = document.getElementById('color').value

  if(description === null){
    description = ' ';
  }

  var newEvent = new Event(name, description, color);
  newEvent.setGraphics();
  events.push(newEvent);

  drawCanvas();

}

function editSelectedEvent(){
  var name = document.getElementById('newname').value;
  var description = document.getElementById('newdescription').value;
  var color = document.getElementById('newcolor').value;
  var duration = document.getElementById('newduration').value/5;
  eventSelected.edit(name, description, color, eventSelected.grid, duration);
  drawCanvas();
}

function duplicateSelectedEvent(){
  events.push(eventSelected.duplicate());
  drawCanvas();
}

function deleteSelectedEvent(){
  deleteObjectFromArray(eventSelected, events);
  eventSelected = null;
  document.getElementById('editPane').innerHTML = '';
  drawCanvas();
}

function localLoad() {
  const selectedFile = document.getElementById('file-input').files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    loadEvents(JSON.parse(event.target.result));//add events to event list
  };
  reader.readAsText(selectedFile);
}

//download a file with all events
function localSave(){
	var text = JSON.stringify(serializeEvents(events))
  var element = document.getElementById('file-download');//dummy download link
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.click();//activate link
}



//add mouse down listener to our canvas object on content load
document.addEventListener("DOMContentLoaded", function(event) {
  canvas.addEventListener("mousedown", handleMouseDown);
  document.getElementById("file-input").addEventListener("change", localLoad, false);
  drawCanvas();
});
