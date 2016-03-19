Content-Security-Policy: default-src 'self' m.uploadedit.com

var statenames = [];
var republicans = [];
var democrats = [];

var csvRead = function(a){
    var text;
    var csvf = new XMLHttpRequest();
    csvf.open("GET", a, true);
    csvf.onreadystatechange = function ()
    {
        text = csvf.responseText;
    }
    var data = text.split(',');
    return data;
}

var processDels = function(a){
    var data = csvRead(a);
    var tmp = [];
    for(i = 0; i < data.length()/2; i++){
        tmp[i] = {};
        tmp[i]["norm"] = data[1];
        tmp[i]["spec"] = data[1 + data.length()/2];
    }
    return tmp;
}

var makePartyData = function(a,b){
    var data = processDels(a);
    var states = csvRead(b);
    var tmp;
    for(i = 0; i < states.length() && i < data.length(); i++){
        tmp[i] = {};
        tmp[i]["name"] = states[i];
        tmp[i]["dels"] = data[i];
    }
    return tmp;
}

statenames = csvRead("http://m.uploadedit.com/ba3u/145838764444.txt");
republicans = makePartyData(processDels("http://m.uploadedit.com/ba3u/145838764444.txt"),statenames);
democrats = makePartyData(processDels("http://m.uploadedit.com/ba3u/145838767012.txt"),statenames);

