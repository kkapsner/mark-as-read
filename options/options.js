document.querySelectorAll("input.setting").forEach(async function(input){
	"use strict";
	
	const settingName = input.id;
	const currentValue = await browser.storage.local.get([settingName]);
	if (currentValue[settingName]){
		input.value = currentValue[settingName];
	}
	input.addEventListener("change", function(){
		browser.storage.local.set({
			[settingName]: (typeof currentValue) === "number"? parseFloat(input.value): input.value
		});
	});
});

document.querySelectorAll("*[data-translation]").forEach(function(node){
	"use strict";
	
	node.textContent = browser.i18n.getMessage(node.dataset.translation);
});