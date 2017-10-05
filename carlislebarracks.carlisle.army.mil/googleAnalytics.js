// JavaScript for google analytics

checkHost = window.document.location.hostname;
	if(checkHost == 'carlislebarracks.carlisle.army.mil' || checkHost == '144.99.215.151' ){
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  			})(window,document,'script','analytics.js'/*tpa=http://www.google-analytics.com/analytics.js*/,'ga');

  			ga('create', 'UA-58262155-2', 'auto');
  			ga('send', 'pageview');	
	 }

jQuery(document).ready(function($) {
    $("a[href$='pdf']").each(function(index) {
      pdfLabel = $(this).attr('href');
      //pdfOnClick = "alert('here');";
	  pdfOnClick = "ga('send', 'event', 'USAG', 'pdf-download', '" + pdfLabel + "');";
      $(this).attr("onClick", pdfOnClick);
	  
    });
});