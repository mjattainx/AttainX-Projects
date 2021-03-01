<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="css/font-awesome.min.css">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto|Roboto+Condensed" rel="stylesheet">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
    </head>
    <body>
      <!--[if lt IE 8]>
          <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
      <![endif]-->
      <div id="navBar"></div>
                  <!-- HERO UNIT -->
		<div class="page-header">
			<div class="container">
				<h1 class="page-title pull-left">Get in touch with us</h1>
				<ol class="breadcrumb">
					<li><a href="index.html">Home</a></li>
					<li class="active">Contact Us</li>
				</ol>
			</div>
		</div>
		<!-- END BREADCRUMBS -->
		<!-- PAGE CONTENT -->
		<div class="page-content">
			<div class="container">
				<div class="row">
					<div class="col-md-9">
						<p>Competently extend highly efficient initiatives whereas collaborative alignments. Collaboratively seize impactful opportunities and focused bandwidth. Continually expedite adaptive manufactured products and customer directed intellectual capital. Completely restore intermandated mindshare after multimedia based ideas. Credibly initiate distinctive metrics.</p>
						<p>Authoritatively embrace performance based information before highly efficient solutions. Globally disintermediate ubiquitous "outside the box" thinking without client-based schemas. Credibly parallel task dynamic technologies and cross-platform total linkage. Authoritatively unleash emerging growth strategies whereas future-proof resources. Distinctively transition 24/7 partnerships without effective testing procedures. Distinctively underwhelm proactive intellectual capital rather than best-of-breed total linkage. Uniquely whiteboard distinctive methods of empowerment after.</p>
						<br>
						<!-- CONCTACT FORM -->
						<div class="contact-form-wrapper">
              <?php
    if (!empty($_POST['form_one'])) {


    $name = $_POST['name']; // required
    $email = $_POST['email']; // required
    $phone = $_POST['phone']; // not required
    $query = $_POST['query']; // required
    $email_from = $_POST['email']; // required



      // EDIT THE BELOW TWO LINES AS REQUIRED
      $email_to = "operations@attainx.com";
      $email_subject = 'Client Enquiry from ' .$name;

      $headers = "From: info@attainx.com \r\n".

      'Reply-To: '.$email."\r\n" .

      'X-Mailer: PHP/' . phpversion();


        $email_message = "Form details below.\n\n";



          function clean_string($string) {

            $bad = array("content-type","bcc:","to:","cc:","href");

            return str_replace($bad,"",$string);

          }




      $email_message .= "Name: ".clean_string($name)."\n\n";
      $email_message .= "Email: ".clean_string($email)."\n\n";
      $email_message .= "Phone: ".clean_string($phone)."\n\n";
      $email_message .= "Query: ".clean_string($query)."\n\n";

      // create email headers



      $headers1 = "From: info@attainx.com \r\n".

      'Reply-To: info@attainx.com'."\r\n" .

      'X-Mailer: PHP/' . phpversion();

      /* Prepare autoresponder subject */

      $respond_subject1 = "Thank you for contacting us!";

      /* Prepare autoresponder message */

      $respond_message1 = "Dear " .$name.", ".

      "

      Thank you for your enquiry

      One of our team member will respond to you as soon as possible.

      For more info about AttainX, please visit http://www.attainx.com


      Kind Regards,
      Support Team
      AttainX


      ";
      /* Send the response message using mail() function */


      mail($email_from, $respond_subject1, $respond_message1, $headers1);

      /* Send the message using mail() function */

      @mail($email_to, $email_subject, $email_message, $headers);

       //Email response
       echo "Thank you for contacting us! ";

       echo "<br/> <a href='contactUs.php' class='back-button'> Go Back </a>";

       }

      //redirect to the 'thank you' page

       else  {
      ?>


      <form method="post" id="form-1" enctype="application/x-www-form-urlencoded" action="">


      <input type="text" id="Name" name="name" placeholder="Name *" maxlength="40" value="" autocomplete="off" onkeypress="return ValidateAlpha(event);" required="required" class="form-control" style="float:left;">
       <div class="clear">&nbsp; </div>
      <input type="email" id="EmailAddress" placeholder="Email Address *" name="email" maxlength="40" value="" autocomplete="off" required="required" class="form-control" style="float:left;" autocomplete='off' required='required' >
       <div class="clear">&nbsp; </div>
      <input pattern="[0-9]{10,}" placeholder="Phone *" maxlength="15" title="Minmimum 10 numbers." id="Phone" name="phone" value="" autocomplete="off" required="required" class="form-control"  >
      <div class="clear">&nbsp; </div>
      <textarea  placeholder="Message *" name="query" maxlength="400" cols="25" rows="6" required="required"></textarea><br/>

      <br>
       <input type="submit" name="form_one" value="Submit" class="btn btn-primary"/></center>
      <br>

      </form>

      <?php
       }
      ?>
						</div>
						<!-- END CONCTACT FORM -->
					</div>
					<div class="col-md-3">
					<!-- RIGHT SIDEBAR CONTENT -->
					  <div id="rightColumn"></div>
					  <div class="widget">
					    <h3 class="widget-title">GETTING THERE</h3>
					    <div class="google-map sidebar-map">
					        <div id="map-canvas"></div>
					    </div>
					  </div>
					  <!-- END RIGHT SIDEBAR CONTENT -->
					</div>
				</div>
			</div>
		</div>
		<div id="footer"></div>
    <script async defer src="//maps.googleapis.com/maps/api/js?key=AIzaSyCuduETpogRjq2c2P-hTTGjiCSE6Qy3k3Q&callback=initMap" type="text/javascript"></script>

 <script>
 	function initMap() {
    var latLng = new google.maps.LatLng(37.415116,-79.144288),
        myOptions = {
            zoom: 8,
            center: latLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        map = new google.maps.Map(document.getElementById('map-canvas'), myOptions),
        markerA = new google.maps.Marker({
            position: latLng,
            title: "Attainx Office",
            map: map
        });
}

initMap();
 </script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
        <script src="js/vendor/bootstrap.min.js"></script>
        <script src="js/vendor/slick.min.js"></script>
        <script src="js/vendor/jquery.stellar.min.js"></script>
        <script src="js/main.js"></script>

    </body>
</html>
