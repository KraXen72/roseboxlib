// @ts-nocheck
const fs = require('fs');
const slash = process.platform === 'win32' ? "\\" : "/"
const { shortenFilename, fixQuotes, getExtOrFn, zeropad } = require("./esm/lib")

/**
 * save the config file
 * @param {String} filename path to config file (can be relative)
 * @param {Object} config the object/json you want to write in config 
 */
function saveConfig(filename, config) { //save config.json
    fs.writeFileSync(filename, JSON.stringify(config, null, 2))
    console.log("saved config")
}

/**
 * clear a Folder - delete all files (NOT FOLDERS) in a folder
 * @param {String} path path to folder to clear (can be relative)
 */
function clearFolder(path) { //delete all files in a folder
    let files = fs.readdirSync(path).filter(f => fs.lstatSync(path + slash + f).isFile() )
    files.forEach(f => {
        fs.unlinkSync(path + slash + f)
    })
}

/**
 * initialize / Load config file. rememer to modify this to init the way you want
 * @param {String} filename config.json recommended but filename of the config file.
 */
 function initOrLoadConfig(filename) { //initialize config.json
    let config = {}

    if (fs.existsSync(filename)) {
        config = JSON.parse(fs.readFileSync(filename))
    } else {
        config = {
            "maindir": "",
            "exts": ["mp3"], 
            "ignore": [],
            "comPlaylists": {}
        }
        fs.writeFileSync(filename, JSON.stringify(config, null, 2))
    }
    return config
}

//generate a material design esque more menu / dropdown thingy
/*
requires html setup defined in roseboxlib.css

usage:
elem.onclick = (event) => {
    let opt = {event, buttons: [
        {   text: "Details",
            run: () => {
                updatePreview(songobj, false, true, true)
            }},
        {   text: "Edit Tags", 
            run: () => {
                alert("placeholder for tag editor")
            }}
    ]}
    summonMenu(opt)
}

*/
function summonMenu(options) {
    document.onclick = ""
    let menu = document.getElementById("moremenu")
    menu.querySelector("ul").innerHTML = ""

    if (options.buttons.length > 0) {
        for (let i = 0; i < options.buttons.length; i++) {
            const btn = options.buttons[i];
            let btne = document.createElement("li")
            btne.classList.add("mm-li")
            btne.textContent = btn.text
            btne.onclick = btn.run
            btne.onmouseup = () => {document.getElementById("moremenu").classList.add("hidden")}
            menu.querySelector("ul").appendChild(btne)
        }
    } else {
        menu.querySelector("ul").innerHTML = `<li class="mm-li">Invalid menu, no buttons defined</li>`
    }
   
    menu.classList.remove("hidden")
    menu.style.left = `${options.event.clientX}px`
    //always fit the menu on screen: if the diff of posY and windowheight is less than menuheight, just put it to windowheight - menuheight
    menu.style.top = `${window.innerHeight - options.event.clientY < menu.clientHeight ? 
    window.innerHeight - menu.clientHeight : options.event.clientY}px`

    setTimeout(() => { //put it into an instant settimeout so this more button click doesen't trigger it
        document.onclick = (event) => { //hide the menu again if i click away
            if (!event.path.includes(menu)) {
                menu.classList.add("hidden")
                document.onclick = ""
            }
        }
    }, 0)
}

module.exports = { initOrLoadConfig, saveConfig, clearFolder, summonMenu, 
    shortenFilename, fixQuotes, getExtOrFn, zeropad }