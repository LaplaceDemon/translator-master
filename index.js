const electron = require('electron');
const ipc = require('electron').ipcRenderer;

let {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
let screenWidth = width;
let screenHeight = height;

var windowTop = window.screenTop;
var windowLeft = window.screenLeft;
var windowHeight = window.outerHeight;
var windowWidth = window.outerWidth;

var baiduFanyiIFrame = document.getElementById("baiduFanyi");
var googleTranslateIFrame = document.getElementById("googleTranslate");
var translatorResult = document.getElementById("translatorResult");
var translatorInput = document.getElementById('translatorInput');

translatorResult.style.display = "none";

baiduFanyiIFrame.addEventListener('dom-ready', () => {
    console.log('webiew dom-ready');
    var baiduFanyiWebContents = baiduFanyiIFrame.getWebContents();
    baiduFanyiWebContents.enableDeviceEmulation({
        screenPosition: 'mobile'
    });
});


window.onload = function() {
    windowTop = window.screenTop;
    windowLeft = window.screenLeft;
    windowHeight = window.outerHeight;
    windowWidth = window.outerWidth;
}

var translator = new Vue({
    el: "#translator",
    data: {
        text:""
    },
    methods:{
        translateZHtoEN:function () {
            window.moveTo(0,0);
            window.resizeTo(740, 800);
            // translatorInput.focus();
            translatorResult.style.display = "block";
            {
                var url = "https://fanyi.baidu.com/#zh/en/" + encodeURI(this.text);
                // shell.openExternal(url);
                baiduFanyiIFrame.src=url;
            }
            {
                var url = "https://translate.google.cn/#view=home&op=translate&sl=zh-CN&tl=en&text=" + encodeURI(this.text);
                // shell.openExternal(url);
                googleTranslateIFrame.src=url;
            }
        },
        translateENtoZH:function () {
            window.moveTo(0,0);
            window.resizeTo(740, 800);
            // translatorInput.focus();
            translatorResult.style.display = "block";
            {
                var url = "https://fanyi.baidu.com/#en/zh/" + encodeURI(this.text);
                // shell.openExternal(url);
                baiduFanyiIFrame.src=url;
            }
            {
                var url = "https://translate.google.cn/#view=home&op=translate&sl=en&tl=zh-CN&text=" + encodeURI(this.text);
                // shell.openExternal(url);
                googleTranslateIFrame.src=url;
            }
        },
        clean:function() {
            this.text = "";
            translatorResult.style.display = "none";            
            ipc.send('changeWindow', "ipc-message");
        },
        close:function() {
            window.close();
        }
    }
});

