var statenames = ["Iowa","New Hampshire","Nevada","South Carolina","Alabama","Alaska","Arkansas",'Colorado','Georgia','Massachusetts','Minnesota','Oklahoma','Tennessee','Texas','Vermont','Virginia','American Samoa','Kansas','Kentucky','Louisiana','Maine','Nebraska','Puerto Rico','Hawaii','Idaho','Michigan','Mississippi','DC','Wyoming','Florida','Illinois','Missouri','North Carolina','Ohio','Arizona','Utah','Washington','Wisconsin','New York','Connecticut','Delaware','Maryland','Pennsylvania','Rhode Island','Indiana','West Virginia','Oregon','California','Montana','New Jersey','New Mexico','North Dakota','South Dakota'];
var republicans = [23,20,28,50,50,28,39,0,72,42,38,40,58,155,16,46,0,0,40,46,41,23,23,19,32,59,37,19,11,99,65,0,71,66,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,0,0,0,0,0,0,0,0,0,0,0,0,0,30,0,0,58,40,44,42,95,28,16,38,71,19,57,34,44,28,172,27,51,24,28,29];
var democrats = [44,24,35,53,53,0,32,66,102,91,77,38,67,222,16,95,6,0,33,0,51,25,25,0,0,0,127,34,0,0,198,135,0,104,141,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,67,0,34,0,0,0,45,34,27,0,0,18,18,0,0,64,0,0,85,37,118,96,291,70,31,118,210,33,92,37,61,74,546,27,142,43,23,25];

//to organize data

var processDels = function(data){
    var tmp = [];
    for(i = 0; i < data.length/2; i++){
        tmp[i] = {};
        tmp[i]["norm"] = data[i];
        tmp[i]["spec"] = data[i + data.length/2];
    }
    return tmp;
}

var makePartyData = function(data,b){
    var states = b;
    var tmp = [];
    for(var i = 0; i < states.length && i < data.length; i++){
        tmp[i] = {};
        tmp[i]["name"] = states[i];
        tmp[i]["dels"] = data[i];
    }
    return tmp;
}

//stores delegates for each state
republicans = makePartyData(processDels(republicans),statenames);
democrats = makePartyData(processDels(democrats),statenames);

//Makes bars

table = d3.select("tbody")
table.selectAll("tr").data(republicans).enter().append('tr').each(
    function() { //in each tr add one td for rep and one td for dem

	//republicans
	d3.select(this)
	    .append('td')
	    .append("div")
	    .attr("class", "bar rep")
	    .style({width: function(d){
		//these should be diffrentiated
		dels = d.dels["norm"] + d.dels["spec"]
		//should figure out better scale, maybe use % instead of px?
		return dels * 4 + "px" 
	    }}).html(function(d) {
		var txt = "<span class='left'>" +(d.dels["norm"] + d.dels["spec"]) + 
		    "</span>" + "<span class='right'>" + d.name +
		    "</span>"; //the lazy way
		    return txt;
	    });

	//democrats
	d3.select(this).append('td')
	    .append("div")
	    .attr("class", "bar dem")
	    .style({width: function(d){
		dels = d.dels["norm"] + d.dels["spec"] //these should be diffrentiated
		return dels * 4 + "px" //should figure out better scale
	    }, background-color: function(d){
	    	if (d.dels["norm"] < d.dels["spec"]){
	    		return "gray";
	    	} else {
	    		return "#3A63E8";
	    	}
	    }}).html(function(d) {
	    	if (d.dels["norm"] > d.dels["spec"]){
		var txt = "<span class='right'>" +(d.dels["norm"] + d.dels["spec"]) + 
		    "</span>" + "<span class='left'>" + d.name +
		    "</span>"; //the lazy way
	    	} else {
	    		var txt = "<span class='right'>" +(d.dels["norm"] + d.dels["spec"]) + 
		    "</span>" + "<span class='left'>" + d.name + "(Unspent)" +
		    "</span>";
	    	}
		    return txt;
	    });	
});




