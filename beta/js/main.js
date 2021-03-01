(function () {
      //Includes
      $('#navBar').load("include/header.html");
      $('#certifications').load("include/certifications.html");
      $('#ourClients').load("include/ourClients.html");
      $('#footer').load("include/footer.html");
      $('#rightColumn').load("include/rightColumn.html");
    // set time out function in order to get content first before to apply slick slider
      setTimeout(sliderFunction, 300);
      function sliderFunction(){
                var slickHeroImage = {
                  speed: 800,
                dots: true,
                fade: true,
                autoplay: true,
                autoplaySpeed: 2500,
                prevArrow: '<button type="button" data-role="none" class="carousel-control left slick-prev">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="carousel-control right slick-next">Next</button>',
                 };
                 var slickCertifications = {
                   dots: true,
                   slidesToShow: 4,
                   slidesToScroll: 4,
                   infinite: true,
                   autoplay:true,
                   autoplaySpeed:3000,
                   arrows:false,
                   responsive: [
                      {
                        breakpoint: 559,
                        settings: {
                          slidesToShow: 1,
                          slidesToScroll: 1
                        }
                      }
                     ]
                 };
                 $('.heroImage').slick(slickHeroImage);
                 $('.certifications').slick(slickCertifications);
                 $('.clients').slick(slickCertifications);
                 
      }         
       /* Scroll to section with id specified*/
                  $.fn.scrollView = function() {
                      return this.each(function() {
                        var targetOffset = $(this).offset().top;
                          $('html, body').animate({
                            
                              scrollTop: targetOffset
                          }, 1000);
                      });
                  };
                  /* Scroll to the Accesibility section and keeping the Drawer open*/
                  var goal = window.location.hash;
                  if (goal == "#ourGoal") {
                      $('.ourGoal').scrollView();
                  }
                  var team = window.location.hash;
                  if (team == "#ourTeam") {
                      $('.ourTeam').scrollView();
                  }
                  var flexible = window.location.hash;
                  if (flexible == "#flexibility") {
                      $('.flexibility').scrollView();
                  }

})();

var interval=2000;
var stepsize=78;
var scrollspeed="normal";
var objInterval=null;

$(document).ready( 
  function(){
  $("#bottom").html($("#top").html());

  $("#content").bind("mouseover",function(){StopScroll();});
  $("#content").bind("mouseout",function(){StartScroll();});
   
  StartScroll();  
});

  function StartScroll(){
   objInterval=setInterval("verticalloop()",interval);
  }
   
  function StopScroll(){
   window.clearInterval(objInterval);
  } 

function verticalloop(){

  if($("#content").scrollTop()>=$("#top").outerHeight()){
        $("#content").scrollTop($("#content").scrollTop()-$("#top").outerHeight());
  }

  $("#content").animate({
         "scrollTop" : $("#content").scrollTop()+stepsize +"px"},
          scrollspeed
  );
}


