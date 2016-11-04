let WhiteSkin = new Skin({ fill: "white" })
let TextStyle = new Style({ color: "black", font: "8px" })

var MyLabel = Label.template(function($) { return {
    left: 0, right: 0, height:10, style:TextStyle, string: $ 

var MyScroller = Scroller.template(function($) { return {
            	trace($$+"\n");

let MyField = Container.template($ => ({ 
                        }

var MainContainer = new Column({
	left: 0, right: 0, top: 0, bottom:0, skin: WhiteSkin,
	contents: [
		new MyScroller(["one", "two", "three", "four"])
	],
	Behavior: class extends Behavior {


});