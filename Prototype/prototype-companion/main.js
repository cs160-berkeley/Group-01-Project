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

let WhiteSkin = new Skin({ fill: "white" });

let graySkin = new Skin({fill: "gray"});
let TextStyle = new Style({ color: "black", font: "22px Avenir", horizontal: 'left', vertical: 'left' })
let SmallTextStyle = new Style({ color: "black", font: "18px Avenir", horizontal: 'left', vertical: 'left' })

let CenteredTextStyle = new Style({ color: "white", font: "22px Avenir", horizontal: 'middle', vertical: 'middle'})

let NormalBlueTextStyle = new Style({ color: "#124184", font: "22px Avenir Medium Oblique", horizontal: 'left', vertical: 'left' })
let BlackTextStyle = new Style({ color: "black", font: "20px" })
let BlueTextStyle = new Style({ color: "#124184", font: "24px Avenir Medium Oblique", horizontal: 'left', vertical: 'left' })
let fieldStyle = new Style({color: 'black', font:  '14px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5});
let fieldHintStyle = new Style({color: '#aaa', font: '10px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5});

var BlueButtonSkin = new Skin({                
				fill: "#ffffff", 
                borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                stroke: "#124184"  
});
var BlackButtonSkin = new Skin({                
				fill: "#ffffff", 
                borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                stroke: "#000000"  
});
var TappedBlueButtonSkin = new Skin({                
				fill: "#124184", 
                borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                stroke: "gray"  
});
var TappedBlackButtonSkin = new Skin({                
				fill: "#000000", 
                borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                stroke: "#ffffff"  
});



// Textures
let hypeLogo = new Texture("assets2/Hype.png");

let hypeSkin = new Skin({
      width:349, height: 44,
      texture: hypeLogo,
      fill: "white",
      aspect: "fit"
});

let navBarLogo = new Texture("assets2/NavBar.png");

let TaskbarSkin = new Skin({ 
	  fill: "white",       
	  width:349, height: 70,
      texture: navBarLogo,
      fill: "white",
});

let musicButtonLogo = new Texture("assets2/MusicButtonSkin.png");

let MusicButtonSkin = new Skin({ 
	  fill: "white",       
	  width:300, height: 40,
      texture: musicButtonLogo,
});

let BottomBorder = new Texture("assets2/BottomBorder.png");

let BottomBorderSkin = new Skin({ 
	  fill: "white",       
	  width:300, height: 40,
      texture: BottomBorder,
});

let playlist1logo = new Texture("assets2/Playlist1.png");

let playlist1Skin = new Skin({ 
	  width:40, height: 40,
      texture: playlist1logo,
      fill: "white",
      aspect: "fit"

});

//Templates
let MyButtonTemplate = Button.template($ => ({
    top: $.top, left:10,
    right: 10, height: $.height, skin: MusicButtonSkin,
    contents: [
        Label($, { left: 0, right: 0, height: 55, string: $.textForLabel, style: BlueTextStyle })
    ],
    Behavior: $.behavior
}));

let MyBlueButtonTemplate = Button.template($ => ({
    top: $.top, left:50,
    right: 50, height: $.height, skin: TappedBlueButtonSkin,
    contents: [
        Label($, { left: 0, right: 0, height: 55, string: $.textForLabel, style: CenteredTextStyle, name: "label" })
    ],
    Behavior: $.behavior
}));

let MySliderTemplate = HorizontalSlider.template($ => ({
    height: 90, left: 50, right: 50, top: $.top,
    Behavior: class extends HorizontalSliderBehavior {
        onValueChanged(container) {
            trace("in slider temp, Value is: " + this.data.value + "\n");
        }
    }
}));

let MyButton = Button.template(function($) { return {
    left: 0, right: 0, height:60, skin: BottomBorderSkin,
    contents: [
    	new Content({ 
		    top: 5, left: 5, width: 40, height:40, 
		    skin: playlist1Skin, 
		}),
        Label($, { left: 60, right: 0, height:20, string: $, style: NormalBlueTextStyle, name: "label" })
    ],
    Behavior: class extends ButtonBehavior {
		onTouchBegan(button) {
	        button.skin = TappedBlackButtonSkin;
        }
		onTouchEnded(button) {
			trace("tapped\n");
	        button.skin = BottomBorderSkin;
        }
	},
}});

let MyScrollerTemplate = Scroller.template(function(array) { return {
    left: 0, left: 10, right: 10, top: 280, bottom: 0,
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
    left: 0, left: 10, right: 10, top: 130, height:140,
    name: "Scroller",
    contents: [
        new Column({
            left: 0, right: 0, top: 0, height: 40,
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
		new Content({ 
	    	top: 0, left: 0, height: 45, right: 0, 
		    skin: hypeSkin, 
		}),	
		new MyButtonTemplate({
			height: 40, top: 60, textForLabel: "Songs",
			behavior: class extends ButtonBehavior {
				onTouchEnded(button) {
					MainContainer.empty();
					MainContainer.add(SongLayer);
					current_layer = 5;
				}
			}
		}),
		new MyButtonTemplate({
			height: 40, top: 110, textForLabel: "Playlists", 
			behavior: class extends ButtonBehavior {
				onTouchEnded(button) {
					MainContainer.empty();
					MainContainer.add(new PlaylistLayer())
					current_layer = 3;
		        }
			},
		}),
		new MyButtonTemplate({
			height: 40, top: 160, textForLabel: "Artists"
		}),
		new Label({
			height: 30, left: 10, right: 10, top: 225, string: "Recent Playlists", style: TextStyle,
		}),
		new MyScrollerTemplate(playlists, 300),
	]
}));

let PlaylistLayer = Container.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0,
	contents: [
		new Content({ 
	    	top: 0, left: 0, height: 45, right: 0, 
		    skin: hypeSkin, 
		}),	
		new MyButtonTemplate({
			height: 40, top:50, textForLabel: "Create a New Playlist", 			
			behavior: class extends ButtonBehavior {
					onTouchEnded(button) {
			            trace("Pressed playlist\n");
			            MainContainer.empty()
						MainContainer.add(new CreateNewPlaylistLayer())
						current_layer = 4;
			        }
			},
		}),
		new Label({
			height: 30, left: 10, width: 100, top: 100, string: "Playlists:", style: TextStyle,
		}),
		new MyScroller(playlists, 230),
	]
}));

let CreateNewPlaylistLayer = Container.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0,
	contents: [
	
		new Content({ 
	    	top: 0, left: 0, height: 45, right: 0, 
		    skin: hypeSkin, 
		}),	
		new Label({
			height: 30, left: 10, width: 100, top: 60, string: "Name: ", style: TextStyle,
		}),
		new MyField({ left: 60, top: 57, right:10, name: "Type Name Here..." }),
		new Label({
			height: 30, left: 10, width: 220, top: 90, string: "Make Playlist Discoverable", style: TextStyle,
		}),
		new MySwitchTemplate({ value: 0, top: 82, left: 200 }),
		new MyScroller(["Song 1", "Song 2", "Song 3", "Song 4"]),	
		new MyBlueButtonTemplate({
			height: 40, top: 370, textForLabel: "Save Playlist", style: CenteredTextStyle,			
			behavior: class extends ButtonBehavior {
					onTouchEnded(button) {
			          	MainContainer.empty();
			      		playlists.push(playlistName);
						MainContainer.add(new MusicLayer());
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
}));

let nearbyPlaylists = new MyScroller(["Playlist 1", "Playlist 2", "Playlist 3"]);
let SearchLayer = Container.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0,
	contents: [
		new Content({ 
	    	top: 0, left: 0, height: 45, right: 0, 
		    skin: hypeSkin, 
		}),	
		new MyButtonTemplate({
			height: 40, top: 50, textForLabel: "Search for Nearby Playlists",
			behavior: class extends ButtonBehavior {
				onTouchEnded(button) {
					MainContainer.add(nearbyPlaylists)
				}
			}
		}),
	]
}));

let SongLayer = new Container({
	top: 0, bottom: 0, left: 0, right: 0,
	contents: [
		new Content({ 
	    	top: 0, left: 0, height: 45, right: 0, 
		    skin: hypeSkin, 
		}),	
		new MyButtonTemplate({
			height: 40, top: 50, textForLabel: "Add a song", 			
			behavior: class extends ButtonBehavior {
			},
		}),
		new MyScroller(["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"]),	
	]
});

let CalibrateLayer = Container.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0,
	contents: [
		new Content({ 
	    	top: 0, left: 0, height: 45, right: 0, 
		    skin: hypeSkin, 
		}),	
		new Label({
			height: 20, top: 50, string: "To help you calibrate the maximum volume desired,", 
			style: SmallTextStyle,			
		}),
		new Label({
			height: 20, top: 70, string: "our speakers will play a tone that will INCREASE in", 
			style: SmallTextStyle,			
		}),
		new Label({
			height: 20, top: 90, string: "volume gradually. Just hit STOP when it gets too loud!", 
			style: SmallTextStyle,			
		}),
		new MyBlueButtonTemplate({
			height: 40, top: 120, textForLabel: "Start",
			behavior: class extends ButtonBehavior {
				onTouchEnded(button) {
		          	if (button.label.string == "Start") {
		          		button.label.string = "Stop";
		          		// var cali_slider = new MySliderTemplate({ min: 0, max: 100, value: 10, top: 170});
		          		// MainContainer.add(cali_slider);
		          		// trace(cali_slider.behavior.data.value + "\n");
		          		// while (cali_slider.behavior.data.value < 100) {
		          		// 	cali_slider.behavior.data.value += 1;
		          		// 	cali_slider.behavior.onAdapt(cali_slider);
		          		// }
		        	} else if (button.label.string == "Stop") {
		            	button.label.string = "Calibration Finished!";
		        	} else {
		        		MainContainer.empty()
		        		MainContainer.add(SettingsLayer)
		        	}
		        }
			},
		}),
	]
}));

let SettingsLayer = new Container({
	top: 0, bottom: 0, left: 0, right: 0,
	contents: [
	
		new Content({ 
	    	top: 0, left: 0, height: 45, right: 0, 
		    skin: hypeSkin, 
		}),	
		new Label({
			height: 30, left: 20, top: 80, string: "Volume", style: BlueTextStyle,
		}),
		new MySliderTemplate({
			min: 1, max: 10, value: 1, top: 80,
		}),
		new Label({
			height: 30, left: 20, top: 180, string: "Smart Shuffle", style: BlueTextStyle,
		}),
		new MySwitchTemplate({ value: 0, top: 170, left: 210 }),
		new Label({
			height: 30, left: 20, top: 220, string: "Auto Volume", style: BlueTextStyle,
		}),
		new MySwitchTemplate({ value: 0, top: 210, left: 210 }),
		new MyBlueButtonTemplate({
			height: 40, top: 320, textForLabel: "Calibrate",
			behavior: class extends ButtonBehavior {
					onTouchEnded(button) {
						MainContainer.empty()
			          	// MainContainer.remove(layers[current_layer]);
						MainContainer.add(new CalibrateLayer());
			        }
			},
		}),
	]
});




let current_layer = 0;
let layers = { 0: MusicLayer, 1: SearchLayer, 2: SettingsLayer, 3: PlaylistLayer, 4: CreateNewPlaylistLayer, 5: SongLayer, 6: 
	CalibrateLayer };

let NavButton = Picture.template($ => ({
	active: true, bottom: 5, left: 45 + 90 * $.layer,
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
			} else if (this.layer == 1) {
				MainContainer.add(new SearchLayer);
			} else if (this.layer == 3) {
				MainContainer.add(new PlaylistLayer);
			} else {
				MainContainer.add(layers[this.layer]);
			}
			current_layer = this.layer;
		}
	})
}));

let MainNavBar = Container.template($ => ({
	height: 50, bottom: 0, left: 0, right: 0,
	skin: TaskbarSkin,
	contents: [
		new NavButton({ path: "assets2/MusicIcon.png", layer: 0,  }),
		new NavButton({ path: "assets2/SearchIcon.png", layer: 1 }),
		new NavButton({ path: "assets2/SettingsIcon.png", layer:2 }),

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