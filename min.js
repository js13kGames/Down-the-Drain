$.Util={};$.Util.fillCircle=function(a,b,c,d,f,g){d/=2;a.beginPath();a.arc(b+d,c+d,d,0,f*Math.PI);a.closePath();a.fill();g&&a.stroke()};$.Util.create2dContext=function(a,b){var c=document.createElement("canvas");c.width=a;c.height=b||a;return c.getContext("2d")};
$.Util.renderPerson=function(a,b,c,d,f,g,h,m){var e=$.Util.create2dContext(a,b+a/10),k=a/5;e.lineWidth=4;e.lineJoin="round";h&&(e.fillStyle=h,$.Util.fillCircle(e,a/2-k/2,0,k,2,!0));var l=a-a/5,k=k-k/5;e.fillStyle=h;$.Util.fillCircle(e,0+(a-l)/2,k,l,2,!0);e.fillStyle=f;$.Util.fillCircle(e,0+(a-l)/2,k,l,h?1:2,!0);var k=k+l,p=k+a/10,n=a/2.75;m&&(e.fillStyle=m,e.beginPath(),0!=c&&e.rect(a/2,p,-n,l),1!=c&&e.rect(a/2,p,n,l),e.closePath(),e.fill(),e.stroke());f=k+a+a/1.5;h=a/6;e.fillStyle=g;e.beginPath();
e.moveTo(a/2,k);e.lineTo(a/2-h,k);1!=c&&e.lineTo(3,f);e.lineTo(a/2-h,f);e.lineTo(a/2+h,f);0!=c&&e.lineTo(a-3,f);e.lineTo(a/2+h,k);e.lineTo(a/2,k);e.closePath();e.fill();e.stroke();m&&2==c&&(e.fillStyle="red",e.beginPath(),e.rect(a/2-n,p,2*n,l),e.closePath(),e.fill(),e.stroke());b-=f;g=[1,1,.5];c=g[d];d=g[(d+1)%3];e.beginPath();e.moveTo(a/2-h,f);e.lineTo(a/2-h,f+b*c);e.moveTo(a/2+h,f);e.lineTo(a/2+h,f+b*d);e.closePath();e.stroke();return e.canvas};$.Logic={};
$.Logic.process=function(a,b,c,d){var f=b;switch(a){case "Walk to":switch(c){case "door":$.ego.stop();$.ego.moveTo(d.target.offsetLeft+d.target.offsetWidth/2,$.ego.z);$.ego.moveTo(d.target.offsetLeft+d.target.offsetWidth/2,d.target.offsetTop);break;case "open drain":$.Game.hasItem("phone")?$.ego.moveTo(d.target.offsetLeft+d.target.offsetWidth/2,$.ego.z,function(){$.ego.moveTo($.ego.x,540,function(){$.Game.addToScore(20);$.ego.say("Congratulations!! You've WON the game!",220,function(){$.Game.gameOver=!0;
$.Game.fadeOut($.controls)})})}):$.ego.say("I need to find my phone before I leave.",220);break;default:$.ego.stop(!0),530<2*(d.pageY-$.wrap.offsetTop-27)?$.ego.moveTo(d.pageX-$.wrap.offsetLeft,2*(d.pageY-$.wrap.offsetTop-27)):$.ego.moveTo(d.pageX-$.wrap.offsetLeft,600)}break;case "Look at":switch(c){case "open drain":$.ego.say("That's where I made my entry and where I hope to exit.",300,function(){$.ego.say("Seems a bit high now.",250)});break;case "water":switch($.Game.region[0]){case "Sewers":$.ego.say("Looks like raw sewerage.",
270);break;case "Underworld":$.ego.say("Looks like lava to me.",270);break;default:$.ego.say("Must be storm water.",250)}break;case "drain":$.ego.say("Sunlight shines down through the drain.",200,function(){$.ego.say("I wouldn't be able to see down here without it.",200)});break;case "phone":$.Game.hasItem("phone")?$.ego.say("My trusty phone, none the worst for wear.",220,function(){$.ego.say("Hey! Looks like the Reaper made some long distance calls!",300)}):$.ego.say("Seems that in his haste, the Grim Reaper dropped my phone.",
300);break;case "chocolate coins":$.ego.say("What? I get hungry.",250);break;case "me":$.ego.say("I'm going for the gender neutral look.",200);break;case "reaper":$.ego.say("It's the Grim Reaper.",270);break;case "man":$.ego.say("He looks a bit sick. He must be living down here.",300);break;case "doll":$.ego.say("This thing looks genuinely scary.",200);break;case "book":$.Game.hasItem("book")?$.ego.say("It's a book on sewer survival.",250,function(){$.ego.say("Who am I kidding? I'm never going to read this.",
300)}):$.ego.say("Someone must have dropped their book down the drain.",300);break;default:$.ego.say("No phone there.",190)}break;case "Eat":switch(c){case "chocolate coins":$.ego.say("Yummy! Plenty more where that came from.",200);break;default:$.ego.say("Uh...  No.",130)}break;case "Talk to":switch(c){case "reaper":$.ego.say("Hey mate! Did you see a phone fall through that drain?",300,function(){$.reaper.say("Finders reapers.",200)});break;case "man":$.Game.hasItem("book")?$.ego.say("Hey, can I have that doll?",
240,function(){$.man.say("No, it's mine.",200,function(){$.ego.say("Would you like to trade?",240,function(){$.man.say("Depends what you've got.",240)})})}):$.Game.hasItem("doll")?$.man.say("Thanks again for the book. It's an interesting read.",240):$.ego.say("Hey, can I have that doll?",240,function(){$.man.say("Yeah, sure.",180)});break;case "me":$.ego.say("Isn't that what I'm doing?",150);break;default:$.ego.say("There was no reply.",220)}break;case "Open":switch(c){case "drain":$.ego.say("They won't budge.",
230);break;case "door":$.ego.say("It's already open.",230);break;default:$.ego.say("It doesn't open.",230)}break;case "Close":switch(c){case "door":$.ego.say("It's just a hole, not a proper door.",220);break;default:$.ego.say("It doesn't close.",220)}break;case "Use":b==a?f="Use "+c+" with ":($.ego.say("Nothing happened.",220),f=a);break;case "Give":if(b==a)f="Give "+c+" to ";else{switch(b+c){case "Give book to man":$.Game.userInput=!1;$.ego.moveTo($.ego.cx,600,function(){$.ego.moveTo($.man.x,600,
function(){$.man.say("Thanks! That will be very useful down here.",300);$.Game.dropItem("book");$.Game.addToScore(76)})});break;case "Give chocolate coins to man":$.man.say("No thanks. I hate chocolate.",200);break;case "Give book to reaper":$.reaper.say("I'm immortal. I don't need a survival book.",300);break;case "Give chocolate coins to reaper":$.reaper.say("Do not tempt Death!",300);break;case "Give doll to reaper":$.Game.userInput=!1;$.ego.moveTo($.ego.cx,600,function(){$.ego.moveTo($.reaper.x,
600,function(){$.reaper.moveTo($.reaper.x+200,600,function(){$.reaper.setDirection($.Sprite.LEFT);$.reaper.say("Get that thing away from me!!",300,function(){$.Game.fadeOut($.reaper.elem);$.reaper.moveTo(850,600,function(){$.Game.props[0][0]=0;$.Game.props[4][0]=4;$.Game.addPropToRoom($.Game.props[4]);$.Game.addObjEventListeners($.Game.props[4][7].elem);$.reaper.remove();$.ego.say("Whoa! He didn't like that.",300);$.Game.addToScore(84)})})})})});break;default:"me"==c?$.ego.say("You lost me at 'Give'",
260):$.ego.say("I think it said no.",230)}f=a}break;case "Pick up":if($.Game.hasItem(c))$.ego.say("I already have that.",140);else switch(c){case "doll":$.Game.userInput=!1;$.ego.moveTo($.ego.cx,600,function(){$.ego.moveTo($.doll.x,600,function(){$.Game.hasItem("book")?$.man.say("Hey! That's mine!",200):$.man.say("All yours mate.",200,function(){$.Game.getItem("doll");$.doll.remove();$.Game.props[3][0]=0;$.Game.userInput=!0;$.Game.addToScore(20)})})});break;case "blanket":$.man.say("Hey! That's mine!",
220,function(){$.man.say("I'll never part with my blanket.",200)});break;case "drain":$.ego.say("They won't budge.",230);break;case "book":$.ego.moveTo($.ego.cx,600,function(){$.ego.moveTo($.book.x,600,function(){$.Game.getItem("book");$.book.remove();$.Game.props[5][0]=0;$.Game.addToScore(15)})});break;case "phone":$.ego.moveTo($.ego.cx,600,function(){$.ego.moveTo($.phone.x,600,function(){$.Game.getItem("phone");$.phone.remove();$.Game.props[4][0]=0;$.Game.addToScore(15)})});break;case "water":$.ego.say("I need a container.",
230);break;default:$.ego.say("I can't get that.",220)}break;default:$.ego.say("Nothing happened.",220)}return f};$.Obj=function(a,b,c){this.y=this.z=this.x=0;this.elem=document.createElement("span");var d=this.elem.style;this.width=a;this.height=b;d.width=this.width+"px";d.height=this.height+"px";this.zIndex=c;this.room=$.Game.room};$.Obj.prototype.setPosition=function(a,b,c){this.x=a;this.z=c;this.y=b;this.elem.style.top=Math.floor(this.z/2)-this.height-Math.floor(this.y)+"px";this.elem.style.left=this.x+"px";this.elem.style.zIndex=this.zIndex?this.zIndex:Math.floor(this.z)};$.Obj.prototype.add=function(){$.screen.appendChild(this.elem)};
$.Obj.prototype.remove=function(){try{$.screen.removeChild(this.elem)}catch(a){}};$.Obj.prototype.hide=function(){this.elem.style.display="none";this.elem.style.opacity=1};$.Obj.prototype.show=function(){this.elem.style.display="block"};$.Obj.prototype.touching=function(a,b){return!1};$.Obj.prototype.update=function(){};$.Obj.prototype.hit=function(a){};$.Sprite=function(a,b,c,d,f){$.Obj.call(this,a,b,0);this.moved=!1;this.positions=[];this.radius=a/2;this.colour=c;this.texture=d;this.elem.classList.add("sprite");this.canvas=this.buildCanvas();this.elem.style.backgroundImage="url("+this.canvas.toDataURL("image/png")+")";this.cz=this.cy=this.cx=0;this.maxStep=f;this.step=this.stepInc=this.maxStep/10;this.direction=0;this.directionLast=1;this.heading=null;this.backgroundY=this.backgroundX=0;this.facing=1;this.destX=this.destZ=-1;this.destFn=null;this.dests=
[];this.cell=0};$.Sprite.prototype=Object.create($.Obj.prototype);$.Sprite.prototype.constructor=$.Obj;$.Sprite.prototype.buildCanvas=function(){};$.Sprite.prototype.touching=function(a,b){if(a){var c=this.cx-a.cx,d=this.cy-a.cy,f=Math.abs(this.z-a.z)+15,g=this.radius+a.radius+(b|0);return c*c+d*d+f*f<=g*g}return!1};$.Sprite.prototype.reset=function(){var a=this.positions.pop();a&&(this.setPosition(a.x,a.y,a.z),this.positions.pop());this.step=1;return a};
$.Sprite.prototype.setPosition=function(a,b,c){this.z&&(this.positions.push({x:this.x,y:this.y,z:this.z}),5<this.positions.length&&(this.positions=this.positions.slice(-5)));this.x=a;this.y=b;this.z=c;this.cx=a+this.radius;this.cy=b+this.radius;this.cz=c-this.radius;this.elem.style.top=Math.floor(this.z/2)-this.height-Math.floor(this.y)+"px";this.elem.style.left=this.x+"px";this.elem.style.zIndex=Math.floor(this.z)};$.Sprite.LEFT=1;$.Sprite.RIGHT=2;$.Sprite.IN=4;$.Sprite.OUT=8;
$.Sprite.prototype.setDirection=function(a){if(a&&a!=this.direction){this.directionLast=this.direction;this.direction=a;for(var b=0;4>=b&&!(a>>b++&1););this.facing=b}this.canvas&&this.canvas.width>this.width&&(this.backgroundX=-((this.facing-1)*this.width),this.elem.style.backgroundPosition=this.backgroundX+"px "+(this.backgroundY+~~(this.cell/10)*this.height)+"px")};
$.Sprite.prototype.move=function(){this.moved=!1;if(this.direction||null!=this.heading){var a=this.x,b=this.z,c=this.y,d=0;null!=this.heading&&(a+=Math.cos(this.heading)*Math.round(this.step*$.Game.stepFactor),b+=Math.sin(this.heading)*Math.round(this.step*$.Game.stepFactor),$.Game.userInput&&(0>a&&(d=1),960<a+this.width&&(d=4),667<b&&(d=5)),530>b&&($.Game.userInput=!1,this.elem.style.opacity=1-(530-b)/100),500>b&&(d=480>a?2:3),(this.step+=this.stepInc)>this.maxStep&&(this.step=this.maxStep));if(d)this.hitEdge(d);
else if(a!=this.x||b!=this.z)this.setPosition(a,c,b),this.moved=!0}else this.step=1};$.Sprite.prototype.update=function(){this.moved||this.move()};$.Sprite.prototype.hit=function(a){this.moved&&this.reset()};$.Sprite.prototype.hitEdge=function(a){a&&this.stop()};$.Actor=function(a,b,c,d,f,g,h,m){this.face=g;this.hat=h;this.pack=m;$.Sprite.call(this,a,b,c,d,f);this.elem.classList.add("actor")};$.Actor.prototype=Object.create($.Sprite.prototype);$.Actor.prototype.constructor=$.Actor;$.Actor.prototype.buildCanvas=function(){for(var a=$.Util.create2dContext(4*this.width,9*this.width),b=0;3>b;b++)for(var c=0;4>c;c++)a.drawImage($.Util.renderPerson(this.width,3*this.width,c,b,this.face,this.colour,this.hat,this.pack),c*this.width,b*this.width*3);return a.canvas};
$.Actor.prototype.stop=function(a){this.destX=this.destZ=-1;this.heading=null;this.cell=0;this.destFn&&(this.destFn(),this.destFn=null);a&&(this.dests=[])};$.Actor.prototype.moveTo=function(a,b,c){this.dests.push({z:b,x:a,fn:c})};
$.Actor.prototype.say=function(a,b,c){$.Game.userInput=!1;var d=document.createElement("span");d.className="bubble";d.innerHTML=a;var f;f=800<this.x?-b+40:100>this.x?-10:-(b/2);d.style.width=b+"px";d.style.left=f+"px";var g=this.elem;g.appendChild(d);g.classList.add("speech");setTimeout(function(){g.classList.remove("speech");g.removeChild(d);setTimeout(function(){c?c():$.Game.userInput=!0},500)},a.length/10*1500)};
$.Actor.prototype.update=function(){var a;if(-1!=this.destX&&-1!=this.destZ)this.touching({cx:this.destX,cy:this.cy,z:this.destZ,radius:-this.radius},20)?this.stop():(this.heading=Math.atan2(this.destZ-this.z,this.destX-this.cx),this.cell=(this.cell+1)%30);else if(0<this.dests.length){var b=this.dests.shift();this.destZ=b.z;this.destX=b.x;this.destFn=b.fn}null!==this.heading&&(a=2.356<Math.abs(this.heading)?a|$.Sprite.LEFT:.785>Math.abs(this.heading)?a|$.Sprite.RIGHT:0<this.heading?a|$.Sprite.OUT:
a|$.Sprite.IN);this.setDirection(a);null!==this.heading&&this.move()};$.Ego=function(){$.Actor.call(this,50,150,"grey",.95,5,"white","grey","red");this.elem.classList.add("ego");this.elem.id="me";this.setDirection($.Sprite.OUT)};$.Ego.prototype=Object.create($.Actor.prototype);$.Ego.prototype.constructor=$.Ego;$.Ego.prototype.hit=function(a){for(;this.reset()&&this.touching(a););};
$.Ego.prototype.hitEdge=function(a){if(a&&(this.destX=this.destZ=-1,this.heading=null,this.cell=0,5>a&&(a=$.Game.rooms[this.room-1][a]))){$.Game.userInput=!1;this.hide();this.room=a[0];switch(a[1]){case 1:this.setPosition(0-2*this.width,this.y,600);this.setDirection($.Sprite.RIGHT);this.moveTo(this.width+50,600,function(){$.Game.userInput=!0});break;case 2:this.setPosition(268,this.y,500);this.setDirection($.Sprite.OUT);this.moveTo(293,600,function(){$.Game.userInput=!0});break;case 3:this.setPosition(645,
this.y,500);this.setDirection($.Sprite.OUT);this.moveTo(670,600,function(){$.Game.userInput=!0});break;case 4:this.setPosition(960+this.width,this.y,600),this.setDirection($.Sprite.LEFT),this.moveTo(960-this.width-50,600,function(){$.Game.userInput=!0})}this.step=1}};$.Game={lastTime:0,delta:0,userInput:!0,regions:[["Sewers",1,"108,141,36","108,141,36"],["Caves",1,"0,0,0","68,136,187"],["Mines",0,"#000000",""],["Catacombs",1,"#000000",""],["Underworld",0,"255,0,0","207,16,32"]],rooms:[[0,,[2,4],,,""],[0,,,[3,1],[1,2],""],[0,[2,3],[5,4],[6,1],[4,1],""],[4,[3,4],,,,""],[0,[7,2],,,[3,2],""],[0,[3,3],,,,""],[1,,[5,1],,[8,1],""],[1,[7,4],,,,""]],props:[[4,0,"reaper",50,150,455,540,null],[8,0,"man",50,150,455,540,null],[8,2,"blanket",160,15,400,550,null,530],[8,0,"doll",
20,60,523,540,null],[0,2,"phone",15,6,800,600,null,530],[6,2,"book",25,10,475,560,null,530]],inventory:{},verb:"Walk to",command:"Walk to",thing:"",itemTop:-1,gameOver:!1,score:0,start:function(){$.wrap=document.getElementById("wrap");$.screen=document.getElementById("screen");$.wall=document.getElementById("wall");$.bricks=document.getElementById("bricks");$.sides=document.getElementById("sides");$.water=document.getElementById("water");$.region=document.getElementById("region");$.doors=document.getElementsByClassName("door");
$.drains=document.getElementsByClassName("drain");$.time=document.getElementById("time");$.score=document.getElementById("score");$.items=document.getElementById("itemlist");$.sentence=document.getElementById("sentence");$.controls=document.getElementById("controls");this.wall=this.renderWall();this.wallCtx=$.wall.getContext("2d");this.wallCtx.drawImage(this.wall,0,0);document.getElementById("up").addEventListener("click",function(){$.Game.scrollInv(1)});document.getElementById("down").addEventListener("click",
function(){$.Game.scrollInv(-1)});for(var a=document.getElementById("commands").children,b=0;b<a.length;b++)a[b].addEventListener("click",function(a){$.Game.command=$.Game.verb=a.target.innerHTML});$.screen.onclick=function(a){$.Game.processCommand(a)};$.Game.init();$.Game.loop()},init:function(){if(this.objs)for(var a=0;a<this.objs.length;a++)this.objs[a].remove();this.objs=[];this.room=1;$.ego=new $.Ego;$.ego.add();$.ego.setPosition(500,0,600);this.getItem("chocolate coins");this.newRoom();this.userInput=
!1;$.ego.say("Hello!!",100,function(){$.ego.say("My name is Pip.",200,function(){$.ego.say("I accidentally dropped my phone down a curbside drain...   Duh!!",300,function(){$.ego.moveTo(600,600,function(){$.ego.say("I climbed down here through that open drain to search for it.",300,function(){$.ego.moveTo(600,640,function(){$.ego.say("Unfortunately this is blocks away from where it fell in.",300,function(){$.ego.say("Please help me to find it down here.",200,function(){$.Game.userInput=!0})})})})})})})});
this.fadeIn($.wrap)},_loop:function(a){$.Game.loop(a)},loop:function(a){requestAnimationFrame(this._loop);this.updateDelta(a);this.updateObjects();$.sentence.innerHTML=this.gameOver?"Game Over":this.command+" "+this.thing;$.ego.room!=this.room&&(this.room=$.ego.room,this.fadeOut($.screen),setTimeout(function(){$.Game.newRoom()},200))},updateDelta:function(a){this.delta=a-(this.lastTime?this.lastTime:a-16);this.stepFactor=.06*this.delta;this.lastTime=a},updateObjects:function(){for(var a=-1,b,c=$.ego,
d,f=this.objs.length;;){if(c){c.update();for(b=a+1;b<f;b++)(d=this.objs[b])&&c.touching(d)&&(c.hit(d),d.hit(c));c.moved=!1}if(++a<f)c=this.objs[a];else break}},addToScore:function(a){this.score+=a;$.score.innerHTML=""+this.score+" of 230"},processCommand:function(a){this.userInput&&!this.gameOver&&(this.command=$.Logic.process(this.verb,this.command,this.thing,a),a&&a.stopPropagation(),this.command==this.verb&&(this.command=this.verb="Walk to"))},newRoom:function(){for(a=0;a<this.objs.length;a++)this.objs[a].remove();
this.objs=[];a=this.rooms[this.room-1];this.region=this.regions[a[0]];$.drains[2].className=1==this.room?"open drain":"drain";$.region.innerHTML="Down the Drain";this.region[1]?$.bricks.classList.add("bricks"):$.bricks.classList.remove("bricks");$.wall.style.backgroundColor="rgb("+this.region[2]+")";$.water.style.backgroundColor="rgb("+this.region[3]+")";$.sides.className="";a[1]||$.sides.classList.add("left");a[4]||$.sides.classList.add("right");$.doors[0].style.display=a[2]?"block":"none";$.doors[1].style.display=
a[3]?"block":"none";for(var a=0;a<this.props.length;a++){var b=this.props[a];b[0]==this.room&&this.addPropToRoom(b)}b=$.screen.children;for(a=0;a<b.length;a++)this.addObjEventListeners(b[a]);$.Game.fadeIn($.screen);$.ego.show()},addPropToRoom:function(a){var b;if(b=a[7])b.add();else{switch(a[1]){case 0:switch(a[2]){case "reaper":b=new $.Actor(a[3],a[4],"black",.95,10,"black");b.setDirection($.Sprite.OUT);break;case "man":b=new $.Actor(a[3],a[4],"#614126",.95,5,"#ccffcc","#926239");b.setDirection($.Sprite.OUT);
break;case "doll":b=new $.Actor(a[3],a[4],"#111",.95,5,"#111"),b.setDirection($.Sprite.OUT)}b.setPosition(a[5],0,a[6]);break;case 2:b=new $.Obj(a[3],a[4],a[8])}$[a[2]]=b;b.elem.id=a[2];b.add();b.setPosition(a[5],0,a[6]);a[7]=b}this.objs.push(b)},addObjEventListeners:function(a){a.onmouseenter=function(a){$.Game.thing=a.target.id?a.target.id:a.target.className};a.onmouseleave=function(a){$.Game.thing=""};a.onclick=function(a){$.Game.thing=a.target.id?a.target.id:a.target.className;$.Game.processCommand(a)}},
getItem:function(a){var b=document.createElement("span");b.innerHTML=a;$.items.appendChild(b);b.addEventListener("mouseenter",function(b){$.Game.thing=a});b.addEventListener("mouseleave",function(a){$.Game.thing=""});b.addEventListener("click",function(b){$.Game.thing=a;$.Game.processCommand(b)});this.inventory[a]=b},hasItem:function(a){return this.inventory.hasOwnProperty(a)},dropItem:function(a){$.items.removeChild(this.inventory[a]);delete this.inventory[a]},scrollInv:function(a){a=this.itemTop+
27*a;-1>=a&&a>-(27*(this.invCount-4))&&(this.itemTop=a,$.items.style.top=this.itemTop+"px")},renderWall:function(){var a=$.Util.create2dContext(960,260);a.fillStyle="hsl(0, 0%, 10%)";a.fillRect(0,0,960,260);for(var b=a.getImageData(0,0,960,260),c=0;c<b.data.length;c+=4){var d=.5*Math.random();.1>d?(d=1-d,b.data[c]=Math.floor(b.data[c]*d),b.data[c+1]=Math.floor(b.data[c+1]*d),b.data[c+2]=Math.floor(b.data[c+2]*d),b.data[c+3]=200):(d=.5+d,b.data[c]=Math.floor(b.data[c]/d),b.data[c+1]=Math.floor(b.data[c+
1]/d),b.data[c+2]=Math.floor(b.data[c+2]/d))}a.putImageData(b,0,0);return a.canvas},fadeIn:function(a){a.removeAttribute("style");a.style.transition="opacity 0.2s";a.style.opacity=1},fadeOut:function(a){a.style.transition="opacity 0.2s";a.style.opacity=0}};
(function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b,c){var g=(new Date).getTime(),h=Math.max(0,16-(g-a)),m=window.setTimeout(function(){b(g+h)},h);a=g+h;return m});window.cancelAnimationFrame||(window.cancelAnimationFrame=
function(a){clearTimeout(a)})})();window.onload=function(){$.Game.start()};
