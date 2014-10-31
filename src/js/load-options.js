var username = '';
var list = '';
var defaults = chrome.storage.sync.get(
	{username: 'soffes', list:'designers'},
	function(items){
		if(items.username && items.list){
			var tw = document.getElementById('tw-link');
			username = items.username;
			list = items.list;
			tw.setAttribute('href', "https://twitter.com/" + username + "/" + list);
			tw.setAttribute('data-list-owner-screen-name', username);
			tw.setAttribute('data-list-slug', list);
		}
		return items;
	});