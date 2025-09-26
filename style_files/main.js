

// RGBA function returns hex
function rgbaToHex(red,green,blue,trans){
	let hex='#';
	red=Number(red).toString(16);
	if(red.length<2){ // if one digit need to append 0 infront 
		hex+='0'+red; 
	}
	else{
		hex+=red;
	}

	green=Number(green).toString(16);
	if(green.length<2){
		hex+='0'+green;
	}
	else{
		hex+=green;
	}

	blue=Number(blue).toString(16);
	if(blue.length<2){
		hex+='0'+blue;
	}
	else{
		hex+=blue;
	}

	trans=Number(trans*255).toString(16);
	trans=trans.replace(/\..*/,'');
	if(red.length<2){
		hex+='0'+trans;
	}
	else{
		hex+=trans;
	}
	return hex;
}

// Color helper class.
function Color(r=255,g=255,b=255,a=1.0) {
	this.r = r;
    this.g = g;
	this.b = b;
	this.a = a;
	this.toHEX = () => rgbaToHex(r,g,b,a)
}
