const electron = require('electron');
const {app, BrowserWindow, Tray} = require('electron');
const ipc = require('electron').ipcMain

function createWindow () {
    let {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
    let screenWidth = width;
    let screenHeight = height;

    let tray = new Tray("img/fanyi.png");

    // 创建浏览器窗口
    var windowWidth = 680;
    var windowHeight = 30;
    var win = new BrowserWindow (
        {
            x: 0,
            y: (screenHeight - windowHeight),
            width: windowWidth,
            height: windowHeight,
            webPreferences: {
                nodeIntegration: true,   // 打开这个选项，否则在页面级的js无法使用require()函数。
                webviewTag:true
            },
            frame: false,
            useContentSize:true
        }
    );

    // 隐藏菜单
    win.setMenu(null);

    // 然后加载应用的 index.html
    win.loadFile('index.html');

    // 总在最前
    win.setAlwaysOnTop(true);

    // ipc 监听
    ipc.on('changeWindow', (sys, msg) => {
        // console.log(msg)  //接收窗口传来的消息
        win.setPosition(0, screenHeight - windowHeight)
        win.setSize(windowWidth, windowHeight);
    })

    tray.setToolTip('翻译程序');

    // win.on("closed", function(){
    //     win = null;
    // });

    win.on('close', (event) => {
        win.hide();
        win.setSkipTaskbar(true);
        event.preventDefault();
    });

    tray.on('click', ()=>{ //我们这里模拟桌面程序点击通知区图标实现打开关闭应用的功能
        win.isVisible() ? win.hide() : win.show()
        win.isVisible() ? win.setSkipTaskbar(false):win.setSkipTaskbar(true);
    });
}

app.on('ready', createWindow);

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})