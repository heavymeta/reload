
var exp = false;

$(".fs_image").click(function(e) {
  if(!exp){
    $(".fs_image").addClass("expand");
    $(".fs_image").removeClass("normal");
    exp = true;
  } else {
    $(".fs_image").removeClass("expand");
    $(".fs_image").addClass("normal");
    exp = false;
  }
});
