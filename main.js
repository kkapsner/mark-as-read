

browser.messageDisplay.onMessageDisplayed.addListener(async function(tabId, messageHeader){
	"use strict";
	
	if (!messageHeader.read){
		try {
			const timeout = (await browser.storage.local.get({timeout: 2000})).timeout;
			setTimeout(async function(){
				const currentMessageHeader = await browser.messageDisplay.getDisplayedMessage(tabId);
				if (
					currentMessageHeader &&
					currentMessageHeader.id === messageHeader.id
				){
					browser.messages.update(messageHeader.id, {
						read: true
					});
				}
			}, timeout);
		}
		catch(e){
			console.error(e);
		}
	}
});