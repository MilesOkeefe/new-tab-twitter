$(function(){
	$username = $("#username");
	$list = $("#list");

	var defaults = chrome.storage.sync.get(
		{username: '', list:''},
		function(items){
			if(items.username) $username.val(items.username);
			if(items.list) $list.val(items.list);
			return items;
		});
	
	$("#save").click(function(){
		console.log('save clicked');
		chrome.storage.sync.set(
			{ username: $username.val(), list: $list.val() }, 
			function(){
				chrome.tabs.create({ url:"chrome://newtab/"} );
			});
	});
});