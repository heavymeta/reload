var clicks = 0;
var running = false;
var timer = 0;
var selected = 0;
var runTimer;

$("#canvas_b").addClass( "hiddenCanvas" );
$("#comment_b").addClass( "hiddenCanvas" );

$( ".canvas" ).keypress(function( event ) {
  if ( event.which == 13 ) {


    if (running != true)
    {
      runTimer = setInterval(time, 100);
      running = true;
    }

    if (clicks == 1 && timer >= 1 && timer < 3)
    {
      console.log("found quick return" + clicks + " " + timer);
      fadeOut();
    } else {
      console.log("condition not met " + clicks + " " + timer);
    }

    clicks++;
  } else {
    clear();
  }


  function time()
  {
    timer++;
    if (timer > 15)
    {
      clear();
    }
  }
});


function clear() {
  console.log("clear");
  clearInterval(runTimer);
  timer = 0;
  running = false;
  clicks = 0;
}

function fadeOut() {

  if (selected ==0) {
    var selector = "#canvas_a";
    var unselect = "#canvas_b";

    selected = 1;
  } else {
    var selector = "#canvas_b";
    var unselect = "#canvas_a";

    selected = 0;
  }



  $(selector).animate({
      top: '+=20'
  }, {
      duration: 300,
      queue: false,
      complete: function() { /* Animation complete */ }
  });

  $(selector).animate({
      opacity: 0
  }, {
      duration: 200,
      complete: function() {
        $(selector).addClass( "hiddenCanvas" );
        $(unselect).removeClass( "hiddenCanvas" );

        $("#comment_a").addClass( "hiddenCanvas" );
        $("#comment_b").removeClass( "hiddenCanvas" );
       }
  });

  $(unselect).animate({
      top: '0',
      opacity: 1
  }, {
      duration: 100,
      queue: false,
      complete: function() { /* Animation complete */ }
  });

  $(unselect).get(0).focus()
  $(unselect).empty();
};

$(document).ready(function() {
  var handleDrag = function(e) {
      //kill any default behavior
      e.stopPropagation();
      e.preventDefault();
  };
  var handleDrop = function(e) {
      //kill any default behavior
      e.stopPropagation();
      e.preventDefault();
      //console.log(e);
      //get x and y coordinates of the dropped item
      x = e.clientX;
      y = e.clientY;
      //drops are treated as multiple files. Only dealing with single files right now, so assume its the first object you're interested in
      var file = e.dataTransfer.files[0];
      //don't try to mess with non-image files
      if (file.type.match('image.*')) {
          //then we have an image,

          //we have a file handle, need to read it with file reader!
          var reader = new FileReader();

          // Closure to capture the file information.
          reader.onload = (function(theFile) {
              //get the data uri
              var dataURI = theFile.target.result;
              //make a new image element with the dataURI as the source
              var img = document.createElement("img");
              img.src = dataURI;

              //Insert the image at the carat

              // Try the standards-based way first. This works in FF
              if (document.caretPositionFromPoint) {
                  var pos = document.caretPositionFromPoint(x, y);
                  range = document.createRange();
                  range.setStart(pos.offsetNode, pos.offset);
                  range.collapse();
                  range.insertNode(img);
              }
              // Next, the WebKit way. This works in Chrome.
              else if (document.caretRangeFromPoint) {
                  range = document.caretRangeFromPoint(x, y);
                  range.insertNode(img);
              }
              else
              {
                  //not supporting IE right now.
                  console.log('could not find carat');
              }


          });
          //this reads in the file, and the onload event triggers, which adds the image to the div at the carat
          reader.readAsDataURL(file);
      }
  };

  var dropZone = document.getElementById('canvas_a');
  dropZone.addEventListener('dragover', handleDrag, false);
  dropZone.addEventListener('drop', handleDrop, false);

  var dropZone = document.getElementById('canvas_b');
  dropZone.addEventListener('dragover', handleDrag, false);
  dropZone.addEventListener('drop', handleDrop, false);
});
