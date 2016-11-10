import Pins from "pins";

let TaskbarSkin = new Skin({ fill: "#4A90E2" });
let WhiteSkin = new Skin({ fill: "white" });
let graySkin = new Skin({fill: "gray"});
let TextStyle = new Style({ color: "black", font: "14px" })
let BlackTextStyle = new Style({ color: "black", font: "20px" })
let BlueTextStyle = new Style({ color: "#4A90E2", font: "14px" })
let fieldStyle = new Style({color: 'black', font:  '14px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5});
let fieldHintStyle = new Style({color: '#aaa', font: '10px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5});

import {
    HorizontalSlider, HorizontalSliderBehavior
} from 'sliders';

import {
    SwitchButton,
    SwitchButtonBehavior
} from 'switch';

let MySliderTemplate = HorizontalSlider.template($ => ({
    height: 90, left: 55, right: 55, top: $.top,
    Behavior: class extends HorizontalSliderBehavior {
        onValueChanged(container) {
            trace("Value is: " + this.data.value + "\n");
        }
    }
}));

let MySwitchTemplate = SwitchButton.template($ => ({
    height: 50, width: 100, left: $.left, top: $.top,
    Behavior: class extends SwitchButtonBehavior {
    	onValueChanged(container) {
    	}
    }
}));

let MainContainer = new Container({
	top: 0, bottom: 0, left: 0, right: 0,
	skin: WhiteSkin,
	contents: [
		new Label({
			height: 20, left: 0, right: 0, top:0, string: "IoT Speaker", style: TextStyle, skin: TaskbarSkin,
		}),
		new Label({
			height: 30, left: 25, width: 100, top: 40, string: "Speaker Volume", style: TextStyle,
		}),
		new MySliderTemplate({ min: 0, max: 100, value: 0, top: 45 }),
		new Label({
			height: 30, left: 25, width: 100, top: 140, string: "App Connection", style: TextStyle,
		}),
		new MySwitchTemplate({ value: 1, top: 130, left: 165 }),
	]
});

let ActivatePins = function () {
};

class AppBehavior extends Behavior {
	onLaunch(application) {
		Pins.configure({
			led: {
				require: "Digital", // use built-in digital BLL
				pins: {
					ground: { pin: 51, type: "Ground" },
					digital: { pin: 52, direction: "output" },
				}
			},
		},  success => {
			if (success) {
			   Pins.share("ws", {zeroconf: true, name: "pins-share-led"});
			   ActivatePins();
			   application.add(MainContainer);
			} else {
			   trace("Failed\n");
			};
		});
	}
}
application.behavior = new AppBehavior();