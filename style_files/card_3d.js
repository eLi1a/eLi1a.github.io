// Define settings
let mousePosOnCard;
let mousePos;
let mouseIn = false;
let vw;
let vh;	
let card;

// Start up function.
function htmlDocLoaded() {		
	startedTime = new Date().getTime()	
	vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);	
	card = document.getElementsByClassName("card")[0];	
	mouseElem = document.getElementsByClassName('card')[0];	
	document.addEventListener('mousemove', function(evt) {
		mousePosOnCard = getMousePos(mouseElem, evt);
		mouseIn = true;
		mousePos = getMousePos(document.body, evt);
	}, false);
	document.addEventListener('mouseover', function(evt) {
		mouseIn = true;
	}, false);
	document.addEventListener('mouseout', function(evt) {
		mouseIn = false;
	}, false);
	electricFX();	
	window.requestAnimationFrame(anim);
};

function electricFX() {
	let elems = document.getElementsByClassName('electric');	
	for (let i=0;i<elems.length;i++) {
		let e = elems[i];
		e.style.animationDelay = (Math.random()*6.0+i*0.35).toFixed(2)+"s";
	}
}
	
// A way to load everything even we cannot have control to other elements or libraries or so.
if(window.attachEvent) {
    window.attachEvent('onload', htmlDocLoaded);
} else {
    if(window.onload) {
        let curronload = window.onload;
        let newonload = function(evt) {
            curronload(evt);
            htmlDocLoaded(evt);
        };
        window.onload = newonload;
    } else {
        window.onload = htmlDocLoaded;
    }
}


function updateTransformStyle(x, y) {
	let style = "rotateX(" + y + "deg) rotateY(" + x + "deg)";	
    card.style.transform = style;
    card.style.webkitTransform = style;
    card.style.mozTranform = style;
    card.style.msTransform = style;
    card.style.oTransform = style;	
};

// Returns mouse x,y: 0 - 1.0 format strecthing over the area.
function getMousePos(mouseElem, evt) {
	let rect = mouseElem.getBoundingClientRect();	
	return {
	  x: (evt.clientX - rect.left)/parseFloat(mouseElem.clientWidth),
	  y: (evt.clientY - rect.top)/parseFloat(mouseElem.clientHeight)
	};
}

let tick = 0, animsRemoved=false;
function anim(){    
	let now = new Date().getTime();	
	tick++;
	if (!animsRemoved && now - startedTime > 1.1 * 1000) {		
		animsRemoved = true;
		card.classList.add('no-anim'); // This initial anim would mess up this anim a bit.
	}
	if (tick % 5 == 0 && animsRemoved) {
		let tx = 0;
		let ty = 0;
		if (mousePos != null && mouseIn) {		
			tx = (mousePos.x - 0.5)*2;
			ty = (mousePos.y - 0.5)*2;		
		} else {			
			tx = Math.cos(now*0.0005)*0.8;
			ty = Math.sin(now*0.0005)*0.8;
		}
		updateTransformStyle(tx*10,-ty*10);
	}	
  window.requestAnimationFrame(anim);
  
}
