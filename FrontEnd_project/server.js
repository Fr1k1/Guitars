const fs=require('fs');
const {
    createCanvas,
    loadImage,
    registerFont,
} = require('canvas');

const imageCanvas=createCanvas(1200,630);
const context=imageCanvas.getContext('2d');