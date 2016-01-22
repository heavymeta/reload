var annotation_active = false;

$( "#annotation_box" ).draggable();

$( "#annotation_trigger" ).click(function() {
  $( "#annotation_trigger" ).addClass("annotation_active");
  console.log("clicked");
  annotation_active = true;
});


$("#canvas_a").click(function(e) {

if (annotation_active == true)
{
  var posX = $(this).position().left,
      posY = $(this).position().top;
  console.log((e.pageX - posX) + ' , ' + (e.pageY - posY));

  if (annotation_active = true) {
    $("#annotation_box").css({top: (e.pageY - posY) + 90, left: (e.pageX - posX), opacity: 1});
  }
}

});
