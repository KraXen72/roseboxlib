// @ts-nocheck
const fs = require('fs');
const slash = process.platform === 'win32' ? "\\" : "/"
const { shortenFilename, fixQuotes, getExtOrFn, zeropad, summonMenu } = require("./esm/lib")

/**
 * save the config file
 * @param {String} filename path to config file (can be relative)
 * @param {Object} config the object/json you want to write in config
 * @param {Boolean=} minified wether to minify the json or nah
 */
function saveConfig(filename, config, minified) { //save config.json
    if (minified === undefined){minified == false}
    data = ''
    if (minified === true) {
        data = JSON.stringify(config)
    } else {
        data = JSON.stringify(config, null, 2)
    }
    fs.writeFileSync(filename, data)
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
 * @param {Object=} schema the skeleton to use for config object if creating
 * @returns {any} config file
 */
 function initOrLoadConfig(filename, schema) { //initialize config.json
    let config = {}
    if (schema === undefined) {
        schema = {
            "maindir": "",
            "exts": ["mp3"], 
            "ignore": [],
            "comPlaylists": {}
        }
    }
    if (fs.existsSync(filename)) {
        config = JSON.parse(fs.readFileSync(filename))
    } else {
        config = schema
        //make neccesary directories
        fs.writeFileSync(filename, JSON.stringify(config, null, 2))
    }
    return config
}

module.exports = { initOrLoadConfig, saveConfig, clearFolder, summonMenu, 
    shortenFilename, fixQuotes, getExtOrFn, zeropad, summonMenu }