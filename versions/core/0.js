//
//  DISSENSION
//  By UO
//  version: Dissension // Main & recommended
// 
const dissension = {
    data: {
        themes:{
            wildberry: `https://cdn.discordapp.com/attachments/817654026048372736/818192156526379038/wildberry.css`,
            rednblack: `https://cdn.discordapp.com/attachments/817654026048372736/818194048971046952/rednblack.css`,
            nox: `https://cdn.discordapp.com/attachments/817654026048372736/818195113930653756/nox.css`
            
        },
        settheme: function(themename){ 
            document.cookie = `theme=${themename};` 
            this.applytheme()
        },
        applytheme: function(){
            var themename = dissension.getCookie('theme')
            if(!themename){return}
            if(themename === 'default'){
                let s = document.head.getElementsByClassName('diss-cstyle')[0]
                if(s){s.remove()}
                return
            }else{
                var theme = eval('dissension.data.themes.'+themename) 
                let s = document.head.getElementsByClassName('diss-cstyle')[0]
                if(s){s.remove()}
                document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="${theme}" />`)
            }
        },
    },

    getCookie: function(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    },

    addhome: function(func, label){ // adds button under the Home button
    let home = document.getElementsByClassName('tutorialContainer-1v44GL')[0]
    home.insertAdjacentHTML('beforeend', 
        `<div class="listItem-2P_4kh">
            <div class="pill-2uzAFe wrapper-sa6paO" aria-hidden="true"></div>
            <div class="listItemWrapper-3X98Pc">
                <div class="wrapper-25eVIn">
                    <svg width="48" height="48" viewBox="0 0 48 48" class="svg-1X37T1" overflow="visible">
                        <defs>
                            <g id="39973183-21dd-4139-97cc-54f5b75bf627-blob_mask">
                                <path d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24Z"></path>
                            </g>
                            <g id="39973183-21dd-4139-97cc-54f5b75bf627-upper_badge_masks">
                                <rect x="28" y="-4" width="24" height="24" rx="12" ry="12" transform="translate(20 -20)"></rect>
                            </g>
                                <g id="39973183-21dd-4139-97cc-54f5b75bf627-lower_badge_masks">
                                    <rect x="28" y="28" width="24" height="24" rx="12" ry="12" transform="translate(20 20)"></rect>
                                </g>
                        </defs>
                        <mask id="39973183-21dd-4139-97cc-54f5b75bf627" fill="black" x="0" y="0" width="48" height="48">
                            <use href="#39973183-21dd-4139-97cc-54f5b75bf627-blob_mask" fill="white"></use>
                            <use href="#39973183-21dd-4139-97cc-54f5b75bf627-upper_badge_masks" fill="black"></use>
                            <use href="#39973183-21dd-4139-97cc-54f5b75bf627-lower_badge_masks" fill="black"></use>
                        </mask>
                        <mask id="39973183-21dd-4139-97cc-54f5b75bf627-stroke_mask">
                            <rect width="150%" height="150%" x="-25%" y="-25%" fill="white"></rect>
                            <use href="#39973183-21dd-4139-97cc-54f5b75bf627-upper_badge_masks" fill="black"></use>
                            <use href="#39973183-21dd-4139-97cc-54f5b75bf627-lower_badge_masks" fill="black"></use>
                        </mask>
                        <foreignObject mask="url(#39973183-21dd-4139-97cc-54f5b75bf627)" x="0" y="0" width="48" height="48">
                            <div class="wrapper-1BJsBx" role="listitem" data-list-item-id="guildsnav___home" tabindex="0" href="/channels/@me/699688824141512744" aria-label="Home">
                                <div class="childWrapper-anI2G9" style="text-align:center">
                                    <span style="color:white;">${label}</span>
                                </div>
                            </div>
                        </foreignObject>
                    </svg>
                </div>
            </div>
        </div>`)
    home.lastChild.addEventListener('click', function(){eval(func)});
    },

    // tab script
    openTab: function(a,d){var c,e,b;e=document.getElementsByClassName("tabcontent");for(c=0;c<e.length;c++){e[c].style.display="none"}b=document.getElementsByClassName("tablinks");for(c=0;c<b.length;c++){b[c].className=b[c].className.replace(" active","")}document.getElementById(d).style.display="block";a.currentTarget.className+=" active"},

    // navigator
    openNav: function(){ // open navigation
    document.getElementById("overlayNav").style.width = "100%";
    },
    closeNav: function(){ // close navigation
    document.getElementById("overlayNav").style.width = "0%";
    },

    // sleep
    sleep: (ms)=>{
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // fetcher: opens popup to bypass dicord Content Security Policy headers
    fetcher: function(url, valuename){
        if(!window.diss){ window.diss = {} } // set window.diss
        eval(`window.diss.${valuename} = 'diss-reval-null'`); // reset value

        let popup = window.open('', '', 'width=1,height=1')
        popup.document.write(`<script>window.opener.diss.${valuename} = fetch('${url}')</script>`)

        let wch = async ()=>{
            if(eval(`window.diss.${valuename}`) !== 'diss-reval-null'){
                popup.close()
                return;
            }
            await this.sleep(100);
            wch();
        };
        wch()
    },

    // getting user token for auth
    usertoken: function() {
        let popup;
        popup = window.open('', '', 'width=1,height=1');
        if (!popup) return alert('Popup blocked! Please allow popups and try again.');
        popup.document.write("Getting token...")
        window.dispatchEvent(new Event('beforeunload'));
        window.tkn = JSON.parse(popup.localStorage.token);
        popup.close()
        return window.tkn
    },
    
    // send message
    sendmsg: function(message, embed, channelId){
        if (!channelId) {
          channelId = document.location.pathname.split('/').pop();
        }
        if(!embed){
            embed = {}
        }
        var data = {
          "content": message,
          "tts": "false",
          "embed": embed
        }
        fetch('https://discordapp.com/api/v6/channels/' + channelId + '/messages', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Authorization': diss.usertoken(),
            'Content-Type': 'application/json'
          }
        })
        .catch(e => {console.error("[Dissension]: Error sending message:"+e)});
    }
};
const diss = dissension; // shorthand

(function(){ // init
    // 

    // apply style
    diss.data.applytheme()

    // home menu buttons
    diss.addhome('window.location.reload()', 'Close<br/>Mod')
    diss.addhome('dissension.openNav()', 'Menu')

    // navigation
    document.head.insertAdjacentHTML('beforeend', `<style>.overlay{height:100%;width:0;position:fixed;z-index:5000;top:0;left:0;background-color:#000;background-color:rgba(0,0,0,0.9);overflow-x:hidden;transition:.5s;color:white}.overlay-content{position:absolute;width:100%;text-align:left;}@media screen and (max-height:450px){.overlay .closebtn{font-size:40px;top:15px;right:35px}}.tab{overflow:hidden;background-color:#292929}.tab button{font-family: Whitney,Helvetica Neue,Helvetica,Arial,sans-serif;background-color:inherit;color:#b6b7b7;float:left;border:0;outline:0;cursor:pointer;padding:14px 16px;transition:.3s;font-size:120%}.tab button:hover{background-color:black}.tab button.active{background-color:black;color:#b6b7b7;}.tabcontent{display:none;padding:6px 12px; color:white; top:5%}
    .overlay-content h1 {font-size:3rem}
    .overlay-content h2 {font-size:2rem}
    .overlay-content h3 {font-size:1rem}
    .overlay-content .ahm{text-decoration:underline;color:lightgreen}
    .overlay-content .sa{text-decoration:underline;color:skyblue}
    </style>`);
    document.body.insertAdjacentHTML('afterbegin', 
        `<div id="overlayNav" class="overlay">
            <div class="overlay-content">
                <div class="tab">
                    <button class="tablinks">Token Login</button>
                    <button class="tablinks">Themes</button>
                    <button class="tablinks overlay-closebtn" style="float:right;">&times;</button>
                </div>

                <div class="tabcontent" id="diss-tl">login w/ tok</div>
                <div class="tabcontent" id="diss-style">
                    <h1>Themes!</h1>
                    <h2>Dissension comes prepackaged with 3 themes, 4 if you include the default discord style.</h2>
                    <h3>click the name of the style to appy it, or the ? to go see the source code.</h3><br/><br/>
                    <a class="sa diss-theme-0">Discord</a> - Defaults.<br/>
                    <a class="sa diss-theme-1">WildBerry</a> <a class="ahm diss-theme-l1">?</a> - Very violet.<br/>
                    <a class="sa diss-theme-2">Red'n'Black</a> <a class="ahm diss-theme-l2">?</a> - Red. And black.<br/>
                    <a class="sa diss-theme-3">Nox</a> <a class="ahm diss-theme-l3">?</a> - A sandy dark theme that fucks up the Dissension-added buttons' labels<br/>
                </div>
            </div>
        </div>`);
    document.getElementsByClassName('overlay-closebtn')[0].addEventListener('click', function(){dissension.closeNav()})
    document.getElementsByClassName('tablinks')[0].addEventListener('click', function(){dissension.openTab(event, 'diss-tl')})
    document.getElementsByClassName('tablinks')[1].addEventListener('click', function(){dissension.openTab(event, 'diss-style')})

      //styles butons
    document.getElementsByClassName('diss-theme-0')[0].addEventListener('click', function(){dissension.data.settheme('default')})

    document.getElementsByClassName('diss-theme-1')[0].addEventListener('click', function(){dissension.data.settheme('wildberry')})
    document.getElementsByClassName('diss-theme-l1')[0].addEventListener('click', function(){window.open('https://betterdiscordlibrary.com/themes/WIldBerry')})


    document.getElementsByClassName('diss-theme-2')[0].addEventListener('click', function(){dissension.data.settheme('rednblack')})
    document.getElementsByClassName('diss-theme-l2')[0].addEventListener('click', function(){window.open('https://betterdiscordlibrary.com/themes/RednBlack')})

    document.getElementsByClassName('diss-theme-3')[0].addEventListener('click', function(){dissension.data.settheme('nox')})
    document.getElementsByClassName('diss-theme-l3')[0].addEventListener('click', function(){window.open('https://betterdiscordlibrary.com/themes/Nox')})


})();
