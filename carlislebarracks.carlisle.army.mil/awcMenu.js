// JavaScript Document


//hide slider menu and load footer
$(function() {
	$("#awcMenuSlider").hide();
	$("#footerWrapper").load(location.protocol + '//' + location.hostname + '/assets/_footer.cfm');
});

//load menu -- onclick="LoadAwcMenu('--menu section div id--')"

function LoadAwcMenu(menu_list){
	var mlist = 'assets/_menu.cfm #' + menu_list + ' > *';
	
	$("#awcMenuSlider").show();
	$(awcMenuContent).fadeOut(100);
	$(awcMenuContent).promise().done(function(){
		$(awcMenuContent).empty().load(location.protocol + '//' + location.hostname + '/' + mlist).fadeIn(300);
	});	
	
	
}


// hide menu
function closeAwcMenu(){
	$("#awcMenuSlider").hide();
}
