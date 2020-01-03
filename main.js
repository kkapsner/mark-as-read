

browser.messageDisplay.onMessageDisplayed.addListener(async function(tabId, messageHeader){
	if (!messageHeader.read){
		try {
			const timeout = (await browser.storage.local.get({timeout: 2000})).timeout;
			setTimeout(async function(){
				const currentMessageHeader = await browser.messageDisplay.getDisplayedMessage(tabId);
				console.log("timeout done", currentMessageHeader);
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