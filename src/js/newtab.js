function tload(){
	twttr.events.bind('rendered',function(e){
		var $iframe = $("#twitter-widget-0");
		function setHeight(){
			var height = 0;
			$iframe.contents().find('.stream').children().each(function(){ //calculate the height of .stream by adding the height of its childen since its own height doesn't change for some reason
				height += $(this).outerHeight();
			});
			height = height? height+0 : 5000; //default to a huge height so that the contents don't overflow
			$iframe.attr('height', height);
		}
		setHeight();
		$iframe.attr('scrolling', 'no');
		$iframe.attr('style', 
			'border: none;' +
			'max-width: 100%;' +
			'min-width: 180px;' +
			'width: 700px'
			);
		//apply opacity in its own style tag so that it gets set before the transition:opacity in the main style tag
		$iframe.contents().find('head').append('<style>body{position:relative;left-10px;}.stream{-webkit-filter:grayscale(0.6);-webkit-transform: translateZ(0);}*::-webkit-scrollbar { width: 0 !important }.tweet .footer,.tweet .p-author .p-nickname,.tweet .permalink,.tweet .tweet-actions{opacity:0;visibility:visible}.avatar{opacity: 0.8;}.tweet img,.tweet .media{opacity: 0.8;}.tweet{opacity:0.0;}.tweet .link{ color: #2E98B3;}</style>');
		//main style tag
		$css_min = '<link href="css/twitter.css" rel="stylesheet">';
		$iframe.contents().find('head').append($css_min);
		setTimeout(function(){ $("#timeline-inner").addClass('rendered'); }, 0);

		var timeout;
		$iframe.contents().find('.h-feed').bind('DOMSubtreeModified', function(e) {
			if (e.target.innerHTML.length > 0) {
				if(timeout){
		        	clearTimeout(timeout);
		        	timeout = null;
			    }
		    	timeout = setTimeout(function(){
					setHeight(); 
					setTimeout(function(){ setHeight();}, 500);
				}, 10);
			}
		});
		var $stream = $iframe.contents().find('.stream');
		function unfade(){
			if($(window).scrollTop() > 0){
				$stream.addClass("active");
				$(window).unbind('scroll');
			}
		}
		unfade();
		$(window).scroll(unfade);
		$iframe.hover(function(){ $stream.addClass("active"); $iframe.unbind('hover'); });
		$("#timeline").css("min-height", "0");
	});
}

(function(d,s,id){
	var js,fjs=d.getElementsByTagName(s)[0];
	if(!d.getElementById(id)){
		js=d.createElement(s);
		js.id=id;
		js.async=true;
		js.src="https://platform.twitter.com/widgets.js";
		js.onload = tload;
		fjs.parentNode.insertBefore(js,fjs);
	}
}(document,"script","twitter-wjs"));

$(function(){
	if(navigator.appVersion.indexOf("Win")!=-1){
		$('#scrollbar-cover').css('right','0px');
	}
});