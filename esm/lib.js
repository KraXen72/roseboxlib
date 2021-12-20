// @ts-nocheck
/**
 * shorten a string to <start of string>...<end of string> format
 * @param {String} str String to shorten
 * @param {Number} len length of characters to shorten to
 */
export function shortenFilename(str, len) { //turn a long string to start of string...end of string
    if (str.length > len) {
        let halfsize = Math.floor(len/2)-1 //the final size for each half
        let firsthalf = str.slice(0, (str.length/2)+1)
        let secondhalf = str.slice((str.length/2), str.length)

        //trim first half
        if (firsthalf.length > halfsize) { firsthalf = firsthalf.slice(0, halfsize)}
        //trim second half
        if (secondhalf.length > halfsize) {secondhalf = secondhalf.slice(secondhalf.length-halfsize, secondhalf.length+1)}

        return firsthalf+"..."+secondhalf
    } else {return str}
}

/**
 * fix quotes so they can be put in title html attribute. replaces " with &quot;
 * @param {String} str the string you want to fix quotes in
 */
export function fixQuotes(str) { //escape quotes when put in title attribute for example
    return str.replaceAll('"', "&quot;")
}

/**
 * get either the extention or filename from a "filename.ext" format
 * @param {String} filename a string in "filename.ext" format
 * @returns {{fn: string, ext: string}} {filename, ext}
 */
export function getExtOrFn(filename) { //get the extension or filename from "filename.ext" format
    let splitarr = filename.split(".")
    let ext = splitarr[splitarr.length - 1]
    let fn = splitarr.slice(0, splitarr.length - 1).join(".")
    return {fn, ext}
}

export function zeropad(number, finalWidth, customCharacter) {
    customCharacter = customCharacter || '0';
    number = number + '';
    return number.length >= finalWidth ? number : new Array(finalWidth - number.length + 1).join(customCharacter) + number;
}

//destroy autocomplete
export function autocompleteDestroy(instance) {
    document.body.removeEventListener('click', instance.handleDocumentClick)
    instance.input.removeEventListener('input', instance.core.handleInput)
    instance.input.removeEventListener('keydown', instance.core.handleKeyDown)
    instance.input.removeEventListener('focus', instance.core.handleFocus)
    instance.input.removeEventListener('blur', instance.core.handleBlur)
    instance.resultList.removeEventListener(
        'mousedown',
        instance.core.handleResultMouseDown
    )
    instance.resultList.removeEventListener('click', instance.core.handleResultClick)

    instance.root = null
    instance.input = null
    instance.resultList = null
    instance.getResultValue = null
    instance.onUpdate = null
    instance.renderResult = null
    //autocompleteDestroy(instance.core)
    instance.core = null
}