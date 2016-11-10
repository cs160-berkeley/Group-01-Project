//Imports
import Pins from "pins";

import {
    HorizontalSlider, HorizontalSliderBehavior
} from 'sliders';

import { 
    Button,
    ButtonBehavior 
} from 'buttons';

import {
    VerticalScroller,
    VerticalScrollbar,
    TopScrollerShadow,
    BottomScrollerShadow
} from 'scroller';

import {
    FieldScrollerBehavior,
    FieldLabelBehavior
} from 'field';

import {
    SystemKeyboard
} from 'keyboard';

import {
    SwitchButton,
    SwitchButtonBehavior
} from 'switch';

//Skins and Styles
let TaskbarSkin = new Skin({ fill: "#4A90E2" });
let WhiteSkin = new Skin({ fill: "white" });
let graySkin = new Skin({fill: "gray"});
let TextStyle = new Style({ color: "black", font: "14px" })
let BlackTextStyle = new Style({ color: "black", font: "20px" })
let BlueTextStyle = new Style({ color: "#4A90E2", font: "14px" })
let fieldStyle = new Style({color: 'black', font:  '14px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5});
let fieldHintStyle = new Style({color: '#aaa', font: '10px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5});

var BlueButtonSkin = new Skin({                
				fill: "#ffffff", 
                borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                stroke: "#3198D2"  
});
var BlackButtonSkin = new Skin({                
				fill: "#ffffff", 
                borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                stroke: "#000000"  
});
var TappedBlueButtonSkin = new Skin({                
				fill: "#3198D2", 
                borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                stroke: "#ffffff"  
});
var TappedBlackButtonSkin = new Skin({                
				fill: "#000000", 
                borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                stroke: "#ffffff"  
});


//Templates
let MyButtonTemplate = Button.template($ => ({
    top: $.top, left:10,
    right: 10, height: $.height, skin: BlueButtonSkin,
    contents: [
        Label($, { left: 0, right: 0, height: 55, string: $.textForLabel, style: TextStyle })
    ],
    Behavior: $.behavior
}));

let MySliderTemplate = HorizontalSlider.template($ => ({
    height: 90, left: 50, right: 50, top: $.top,
    Behavior: class extends HorizontalSliderBehavior {
        onValueChanged(container) {
            trace("Value is: " + this.data.value + "\n");
        }
    }
}));

let MyButton = Button.template(function($) { return {
    left: 0, right: 0, height:30, skin: BlackButtonSkin, 
    contents: [
        Label($, { left: 0, right: 0, height:20, string: $, style: TextStyle, name: "label" })
    ],
    Behavior: class extends ButtonBehavior {
		onTouchBegan(button) {
	        button.skin = TappedBlackButtonSkin;
        }
		onTouchEnded(button) {
			trace("tapped\n");
	        button.skin = BlackButtonSkin;
			MainContainer.empty();
			MainContainer.add(SongLayer);
			current_layer = 5;
        }
	},
}});

let MyScrollerTemplate = Scroller.template(function(array) { return {
    left: 0, left: 10, right: 10, top: 220, bottom: 0,
    contents: [
        new Column({
            left: 0, right: 0, top: 0, height: 30,
            contents: array.map(function($$) {
                return new MyButton($$);
            })
        })
    ]
}});

let MyScroller = Scroller.template(function(array) { return {
    left: 0, left: 10, right: 10, top: 130, bottom: 0,
    name: "Scroller",
    contents: [
        new Column({
            left: 0, right: 0, top: 0, height: 30,
            contents: array.map(function($$) {
                return new MyButton($$);
            })
        })
    ]
}});

let MySwitchTemplate = SwitchButton.template($ => ({
    height: 50, width: 100, left: $.left, top: $.top,
    Behavior: class extends SwitchButtonBehavior {
    	onValueChanged(container) {
    	}
    }
}));

var playlistName = "";
let MyField = Container.template($ => ({ 
    width: 120, height: 36, left: $.left, top: $.top, skin: WhiteSkin, contents: [
        Scroller($, { 
            left: 4, right: 4, top: 4, bottom: 4, active: true, 
            Behavior: FieldScrollerBehavior, clip: true, 
            contents: [
                Label($, { 
                    left: 0, top: 0, bottom: 0, skin: WhiteSkin, 
                    style: fieldStyle, anchor: 'NAME',
                    editable: true, string: $.name,
                    Behavior: class extends FieldLabelBehavior {
                        onEdited(label) {
                            let data = this.data;
                            data.name = label.string;
                            label.container.hint.visible = (data.name.length == 0);
                            playlistName = data.name;
                        }
                    },
                }),
                Label($, {
                    left: 4, right: 4, top: 4, bottom: 4, style: fieldHintStyle,
                    string: "", name: "hint"
                }),
            ]
        })
    ]
}));

//Data Structures
var playlists = ["Priya's Playlist"];

//Layers
let MusicLayer = Container.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0, name: "MusicLayer",
	contents: [
		new Label({
			height: 20, left: 0, right: 0, top:0, string: "Music", style: TextStyle, skin: TaskbarSkin,
		}),
		new MyButtonTemplate({
			height: 40, top: 50, textForLabel: "Songs",
			behavior: class extends ButtonBehavior {
				onTouchEnded(button) {
					MainContainer.empty();
					MainContainer.add(SongLayer);
					current_layer = 5;
				}
			}
		}),
		new MyButtonTemplate({
			height: 40, top: 100, textForLabel: "Playlists", 
			behavior: class extends ButtonBehavior {
				onTouchEnded(button) {
					MainContainer.empty();
					MainContainer.add(new PlaylistLayer())
					current_layer = 3;
		        }
			},
		}),
		new MyButtonTemplate({
			height: 40, top: 150, textForLabel: "Artists"
		}),
		new Label({
			height: 30, left: 10, width: 100, top: 200, string: "Recent Playlists", style: TextStyle,
		}),
		new MyScrollerTemplate(playlists, 230),
	]
}));

let PlaylistLayer = Container.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0,
	contents: [
	
		new Label({
			height: 20, left: 0, right: 0, top:0, string: "Playlists", style: TextStyle, skin: TaskbarSkin,
		}),
		new MyButtonTemplate({
			height: 40, top:50, textForLabel: "Create a New Playlist", 			
			behavior: class extends ButtonBehavior {
					onTouchEnded(button) {
			            trace("Pressed playlist\n");
			            MainContainer.empty()
						MainContainer.add(CreateNewPlaylistLayer)
						current_layer = 4;
			        }
			},
		}),
		new Label({
			height: 30, left: 0, width: 100, top: 100, string: "Playlists:", style: TextStyle,
		}),
		new MyScroller(playlists, 230),
	]
}));

let CreateNewPlaylistLayer = new Container({
	top: 0, bottom: 0, left: 0, right: 0,
	contents: [
	
		new Label({
			height: 20, left: 0, right: 0, top:0, string: "Create a New Playlist", style: TextStyle, skin: TaskbarSkin,
		}),
		new Label({
			height: 30, left: 10, width: 100, top: 30, string: "Name: ", style: TextStyle,
		}),
		new MyField({ left: 100, top: 27, right:10, name: "Type Name Here..." }),
		new Label({
			height: 30, left: 10, width: 180, top: 70, string: "Make Playlist Discoverable", style: TextStyle,
		}),
		new MySwitchTemplate({ value: 0, top: 60, left: 190 }),
		new MyScrollerTemplate(["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"]),	
		new MyButtonTemplate({
			height: 40, top: 370, textForLabel: "Save Playlist", 			
			behavior: class extends ButtonBehavior {
					onTouchEnded(button) {
			          	MainContainer.remove(layers[current_layer]);
			      		playlists.push(playlistName);
						MainContainer.add(new MusicLayer);
						current_layer = 0;
						trace(playlists + " new\n");
			        }
			},
		}),

	],
	Behavior: class extends Behavior {
        onTouchEnded(content) {
            SystemKeyboard.hide();
            content.focus();
        }
    }
});

let SearchLayer = new Container({
	top: 0, bottom: 0, left: 0, right: 0,
	contents: [
	
		new Label({
			height: 20, left: 0, right: 0, top:0, string: "Playlists Near Me", style: TextStyle, skin: TaskbarSkin,
		}),
		new Label({
			height: 30, left: 10, right: 10, top: 50, string: "Priya's Playlist", style: BlackTextStyle,

		}),

	]
});

let SettingsLayer = new Container({
	top: 0, bottom: 0, left: 0, right: 0,
	contents: [
	
		new Label({
			height: 20, left: 0, right: 0, top:0, string: "Settings", style: TextStyle, skin: TaskbarSkin,
		}),
		new Label({
			height: 30, left: 50, top: 80, string: "Volume", style: BlackTextStyle,
		}),
		new MySliderTemplate({
			min: 1, max: 10, value: 1, top: 80,
		}),
		new Label({
			height: 30, left: 50, top: 200, string: "Smart Shuffle", style: BlackTextStyle,
		}),
		new MySwitchTemplate({ value: 0, top: 190, left: 210 }),
		new Label({
			height: 30, left: 50, top: 260, string: "Auto Volume", style: BlackTextStyle,
		}),
		new MySwitchTemplate({ value: 0, top: 250, left: 210 }),
		new MyButtonTemplate({
			height: 40, top: 320, textForLabel: "Calibrate"
		}),
	]
});

let SongLayer = new Container({
	top: 0, bottom: 0, left: 0, right: 0,
	contents: [
		new Label({
			height: 20, left: 0, right: 0, top:0, string: "Songs", style: TextStyle, skin: TaskbarSkin,
		}),
		new MyScrollerTemplate(["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"]),	
	]
})

let current_layer = 0;
let layers = { 0: MusicLayer, 1: SearchLayer, 2: SettingsLayer, 3: PlaylistLayer, 4: CreateNewPlaylistLayer, 5: SongLayer };

let NavButton = Picture.template($ => ({
	active: true, top: 5, bottom: 5, left: 45 + 90 * $.layer,
	width: 20, height: 20,
	url: $.path,
	behavior: Behavior({
		onCreate: function() {
			this.layer = $.layer;
		},
		onTouchBegan: function () {
		    SystemKeyboard.hide();
		    MainContainer.empty();
		    
			if (this.layer == 0) {
				MainContainer.add(new MusicLayer);
			} else if (this.layer == 3) {
				MainContainer.add(new PlaylistLayer)
			} else {
				MainContainer.add(layers[this.layer])
			}
			current_layer = this.layer;
		}
	})
}));

let MainNavBar = Container.template($ => ({
	height: 50, bottom: 0, left: 0, right: 0,
	skin: TaskbarSkin,
	contents: [
		new NavButton({ path: "assets/MusicIcon.png", layer: 0 }),
		new NavButton({ path: "assets/SearchIcon.png", layer: 1 }),
		new NavButton({ path: "assets/SettingsIcon.png", layer:2 }),

	]
}));



let MainContainer = new Container({
	top: 0, bottom: 0, left: 0, right: 0,
	skin: WhiteSkin,
	contents: [
		new MusicLayer,
	],
	Behavior: class extends Behavior {
        onTouchEnded(content) {
            SystemKeyboard.hide();
            content.focus();
        }
    }
});

let remotePins;
class AppBehavior extends Behavior {
    onLaunch(application) {
        application.add(MainContainer);
        application.add(new MainNavBar());
        let discoveryInstance = Pins.discover(
            connectionDesc => {
                if (connectionDesc.name == "pins-share-led") {
                    trace("Connecting to remote pins\n");
                    remotePins = Pins.connect(connectionDesc);
                }
            }, 
            connectionDesc => {
                if (connectionDesc.name == "pins-share-led") {
                    trace("Disconnected from remote pins\n");
                    remotePins = undefined;
                }
            }
        );
    }

}
application.behavior = new AppBehavior();