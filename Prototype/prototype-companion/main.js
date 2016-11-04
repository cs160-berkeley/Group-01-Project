//Imports
import Pins from "pins";

import {

import {

import {

let graySkin = new Skin({fill: "gray"});
let BlackTextStyle = new Style({ color: "black", font: "20px" })
let BlueTextStyle = new Style({ color: "#4A90E2", font: "14px" })
let fieldStyle = new Style({color: 'black', font:  '14px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5});
let fieldHintStyle = new Style({color: '#aaa', font: '10px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5});

var BlueButtonSkin = new Skin({                
				fill: "#ffffff", 
});
var BlackButtonSkin = new Skin({                
				fill: "#ffffff", 
});
var TappedBlueButtonSkin = new Skin({                
				fill: "#3198D2", 
});
var TappedBlackButtonSkin = new Skin({                
				fill: "#000000", 
});


//Templates
let MyButtonTemplate = Button.template($ => ({
    Behavior: $.behavior

let MySliderTemplate = HorizontalSlider.template($ => ({

let MyButton = Button.template(function($) { return {
    contents: [
        Label($, { left: 0, right: 0, height:20, string: $, style: TextStyle, name: "label" })
    ],
    Behavior: class extends ButtonBehavior {
			onTouchEnded(button) {
					trace("tapped\n");
			        }
			}, 

let MyScrollerTemplate = Scroller.template(function(array) { return {
                return new MyButton($$);

let MySwitchTemplate = SwitchButton.template($ => ({

var playlistName = "";
let MyField = Container.template($ => ({ 
                        }

//Data Structures
var playlists = ["Priya's Playlist"];

//Layers
let MusicLayer = Container.template($ => ({
	
		new Label({
			height: 20, left: 0, right: 0, top:0, string: "Music", style: TextStyle, skin: TaskbarSkin,
		new MyButtonTemplate({
			behavior: class extends ButtonBehavior {
					onTouchEnded(button) {
						MainContainer.empty();
						MainContainer.add(PlaylistLayer)
						current_layer = 3;
			},
		new MyButtonTemplate({
		new Label({
			height: 30, left: 10, width: 100, top: 200, string: "Recent Playlists", style: TextStyle,
		new MyScrollerTemplate(playlists, 230),	


let PlaylistLayer = new Container({
	
		new Label({
			height: 20, left: 0, right: 0, top:0, string: "Playlists", style: TextStyle, skin: TaskbarSkin,
			behavior: class extends ButtonBehavior {
					onTouchEnded(button) {
			            MainContainer.remove(layers[current_layer])
						current_layer = 4;
			},
		new Label({
			height: 30, left: 10, width: 100, top: 100, string: "Priya's Playlist", style: TextStyle,

let CreateNewPlaylistLayer = new Container({
	
		new Label({
			height: 20, left: 0, right: 0, top:0, string: "Create a New Playlist", style: TextStyle, skin: TaskbarSkin,
		new Label({
			height: 30, left: 10, width: 100, top: 30, string: "Name", style: TextStyle,
		new MyField({ left: 100, top: 27, right:10, name:"Playlist Name" }),
		new Label({
			height: 30, left: 10, width: 180, top: 60, string: "Make Playlist Discoverable", style: TextStyle,
		new MySwitchTemplate({ value: 1, top: 60, left: 190 }),
		new MyScrollerTemplate(["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"]),	
		new MyButtonTemplate({
			behavior: class extends ButtonBehavior {
					onTouchEnded(button) {
			      		playlists.push(playlistName);
						current_layer = 0;
						trace(playlists + " new\n");
			},
	Behavior: class extends Behavior {

let SearchLayer = new Container({
	
		new Label({
			height: 20, left: 0, right: 0, top:0, string: "Playlists Near Me", style: TextStyle, skin: TaskbarSkin,
		new Label({
			height: 30, left: 10, right: 10, top: 50, string: "Priya's Playlist", style: BlackTextStyle,

let SettingsLayer = new Container({
	
		new Label({
			height: 20, left: 0, right: 0, top:0, string: "Settings", style: TextStyle, skin: TaskbarSkin,
		new Label({
			height: 30, left: 10, right: 100, top: 40, string: "Volume", style: BlackTextStyle,
		new MySliderTemplate({
		new Label({
			height: 30, left: 10, right: 10, top: 200, string: "Smart Shuffle", style: BlackTextStyle,
		new Label({
			height: 30, left: 10, right: 10, top: 260, string: "Auto Volume", style: BlackTextStyle,
		new MyButtonTemplate({



let current_layer = 0;

let NavButton = Picture.template($ => ({
		    SystemKeyboard.hide();
		    MainContainer.empty();
		    
			if (this.layer == 0) {
				MainContainer.add(new MusicLayer);
			
			}

let MainNavBar = Container.template($ => ({
		new NavButton({ path: "assets/SearchIcon.png", layer: 1 }),
		new NavButton({ path: "assets/SettingsIcon.png", layer:2 }),



let MainContainer = new Container({
	Behavior: class extends Behavior {


        application.add(new MainNavBar());
