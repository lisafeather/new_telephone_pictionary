$(function() {

  var $canvas = $("#drawing"),
      $form = $("#new_picture"),
      $hidden = $("#picture_image");

  console.log("in pictures, canvas: " + $canvas)
  if($canvas.length == 0) {
    return;
  }
  var $clear = $("#clear");
  var context = $canvas[0].getContext('2d');

  function clearCanvas() {
    context.clearRect(0,0,$canvas.width(),$canvas.height()); 
  }

 $('#clear').click(function() {
    clearCanvas();
    location.reload();
  });

      $.each(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'], function() {
        $('#color_drawing .tools').append("<a href='#drawing' data-color='" + this + "' style='width: 10px; background: " + this + ";'>☆</a> ");
      });
      $.each([3, 5, 10], function() {
        $('#color_drawing .tools').append("<a href='#drawing' data-size='" + this + "' style='background: #ccc'>" + this + "</a> ");
      });
      $('#drawing').sketch();
    

  // old drawing functionality, doesn't work in mobile & no colors
  // var $clear = $("#clear"),
  //     $form = $("#new_picture"),
  //     $hidden = $("#picture_image"),
  //     button_is_down = false,
  //     context = $canvas[0].getContext('2d');

  // $(document).mouseup(function(e) {
  //   if(button_is_down) {
  //     var x = e.pageX - this.offsetLeft,
  //         y = e.pageY - this.offsetTop;
  //     context.lineTo(x,y);
  //     context.stroke();
  //   }
  //   button_is_down = false;
  //   $('body').removeClass('noselect');
  // });

  // $canvas.mousedown(function(e) {
  //   var x = e.pageX - this.offsetLeft,
  //       y = e.pageY - this.offsetTop;
  //   context.beginPath();
  //   context.moveTo(x,y);
  //   $('body').addClass('noselect');
  //   button_is_down = true;
  // });

  // $canvas.mousemove(function(e) {
  //   if(button_is_down) {
  //     var x = e.pageX - $canvas[0].offsetLeft,
  //         y = e.pageY - $canvas[0].offsetTop;
  //     context.lineTo(x,y);
  //     context.stroke();
  //   }
  // });
  console.log("in pictures");
  console.log("here's picture form: " + $form.length)

  $form.on("submit", function(event) {
    event.preventDefault();
    console.log("in submit");
    var url = $canvas[0].toDataURL('image/png'),
        img = document.createElement('img'),
        drawings_target = $('#drawings_target');
    drawings_target.append(img); 
    img.src = url;
    $hidden.val(url);
    console.log("here's url: " + url);
    console.log("here's img " + img);

    $.ajax({
       url: "/pictures",
       type: "POST",
       data: {
         image: url
       },
       error: function(data) {
          console.log("something went wrong");
       },
       success: function( data ) {
         console.log("successfully created picture!");
         $form.hide();
         $canvas.hide();
         $("#new_drawings").append("<h4><small>Your picture is below! Please log out now.</small></h4><br /><img src='"+url +"' />");
       }
     });      
   });

});
