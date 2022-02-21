<script>
	alert("does this even work?")
</script>

# DISS Client V2 / DISSENSION V3
The new evolution of DISSENSION, compressed into a bookmarklet.

## Versions
To install Client/Core version combos, simply drag the version link to your bookmarks bar and rename it to something like DISS Client. To use it, open a new tab and double-click your bookmarklet or click it once on an already opened discord tab.

- <a>2.0.0:1.3</a> (Not there, not functional.)
- <a href="javascript:(async dissension=>{const rawurl='https://raw.githubusercontent.com/uncannyorange/DISSENSION/main/',setup=async function(){document.querySelector('title').innerText='DISS | Discord',window.CSPDodge=function(e,t='DISS23DEFAULTCOMMS'){return new Promise(n=>{const o=window.open('https://uncannyorange.github.io/cspdodge.html','_blank','width=1,height=1');o.blur(),window.addEventListener('message',function s(r){'ready'!=r.data.status?(console.log(r.data),r.currentTarget.removeEventListener(r.type,s),n(r.data.resource),o.close()):o.postMessage({name:t,url:e},'*')})})};const sv=await CSPDodge(rawurl+'versions/core_v3/stable.txt','DISS23-STABLEVER'),core=await CSPDodge(`${rawurl}versions/core_v3/${sv}.js`);eval(core)};location.href.startsWith('https://discord.com/channels/')?setup():location='https://discord.com/channels/@me'})();">2.0:3.X</a> (alpha, client works but core is not there yet.)