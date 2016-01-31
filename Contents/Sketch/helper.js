function writeAttributes(obj) {
    var result = "";
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            // do stuff
            //log( typeof storyboard[property] );

            if(typeof obj[property] != 'function'){
                
                if( Object.prototype.toString.call( obj[property] ) != '[object Array]'
                  && Object.prototype.toString.call( obj[property] ) != '[object Object]') {
                    if (property == "ID") {
                        result += " " + "id" + "=\"" + obj[property] + "\"";    
                    }
                    else {
                        result += " " + property + "=\"" + obj[property] + "\"";        
                    }
                    
                }
                else {
                    //log(property + "is array");
                }
                
            }
        }
    }
    
    return result;
}

function writeXmlObject(obj, name, tablevel) {
    var result = tablevel + "<" + name;
    result += writeAttributes(obj);
    var hasChildren = false;
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if(typeof obj[property] != 'function'){
                
                if( Object.prototype.toString.call( obj[property] ) === '[object Array]' ) {
                    
                    if (!hasChildren) {
                        result += ">\n";
                        hasChildren = true;
                    }
                    result += tablevel + _tab + "<" + property + ">\n";
                    var array = obj[property];
                    for(var i=0; i<array.length; i++) {
                        result += array[i].writeXml(tablevel + _tab + _tab);
                    }
                    result += tablevel + _tab + "</" + property + ">\n";
                }
                else if (Object.prototype.toString.call( obj[property] ) === '[object Object]' ) {
                    if (!hasChildren) {
                        result += ">\n";
                        hasChildren = true;
                    }
                    result += obj[property].writeXml(tablevel + _tab);
                }
                
            }
        }
    }
    if (hasChildren) {
        result += tablevel + "</" + name + ">\n";
    }
    else {
        result += "/>\n";
    }

    return result;
}

// just a temp placeholder:
var counter = 100;
function generateID() {
    counter++;
    return "flr-Ab-" + counter;
}