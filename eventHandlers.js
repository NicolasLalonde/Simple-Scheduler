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


//add mouse down listener to our canvas object on content load
document.addEventListener("DOMContentLoaded", function(event) {
  canvas.addEventListener("mousedown", handleMouseDown);
  drawCanvas();
});
