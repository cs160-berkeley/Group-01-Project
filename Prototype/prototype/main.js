let WhiteSkin = new Skin({ fill: "white" })
let TextStyle = new Style({ color: "black", font: "8px" })

var MyLabel = Label.template(function($) { return {
    left: 0, right: 0, height:10, style:TextStyle, string: $ }});

var MyScroller = Scroller.template(function($) { return {    left: 0, width: 160, top: 0, height: 120,     contents: [        new Column({            left: 0, right: 0, top: 0, height: 20,            contents: $.map(function($$) {
            	trace($$+"\n");                return new MyLabel($$);            })        })    ]}});

let MyField = Container.template($ => ({     width: 50, height: 36, left: $.left, top: $.top, skin: whiteSkin, contents: [        Scroller($, {             left: 4, right: 4, top: 4, bottom: 4, active: true,             Behavior: FieldScrollerBehavior, clip: true,             contents: [                Label($, {                     left: 0, top: 0, bottom: 0, skin: whiteSkin,                     style: fieldStyle, anchor: 'NAME',                    editable: true, string: $.name,                    Behavior: class extends FieldLabelBehavior {                        onEdited(label) {                            let data = this.data;                            trace(date + "\n");
                        }                    },                }),                Label($, {                    left: 4, right: 4, top: 4, bottom: 4, style: fieldHintStyle,                    string: "", name: "hint"                }),            ]        })    ]}));

var MainContainer = new Column({
	left: 0, right: 0, top: 0, bottom:0, skin: WhiteSkin,
	contents: [
		new MyScroller(["one", "two", "three", "four"])
	],
	Behavior: class extends Behavior {        onTouchEnded(content) {            SystemKeyboard.hide();            content.focus();        }    }


});application.add(MainContainer);