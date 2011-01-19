/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *  
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010, IBM Corporation
 */
function Barcode() {};

BarcodeFormat = {
    CODE_128: "CODE_128",
    CODE_39: "CODE_39",
    DATAMATRIX: "DATAMATRIX",
    EAN_13: "EAN_13",
    EAN_8: "EAN_8",
    ITF: "ITF",
    PDF417: "PDF417",
    QR_CODE: "QR_CODE",
    UPC_A: "UPC_A",
    UPC_E: "UPC_E",
    ALL: null
};

Barcode.prototype.scan = function(options, successCallback, errorCallback) {
    // check for options
    var formats = null;
    var highAccuracy = false;
    if (options) {
        formats = options.formats;
        highAccuracy = options.highAccuracy;
    }

    PhoneGap.exec(successCallback, errorCallback, 'Barcode', 'scan', [formats, highAccuracy]);
};

/**
 * Options to customize barcode scan.
 * @param formats {Array}         Array of barcode formats to scan.
 * @param highAccuracy {Boolean}  True if barcode scanner should optimize for accuracy, rather than speed.
 */
function BarcodeOptions(formats, highAccuracy) {
    this.formats = formats || null;
    this.highAccuracy = highAccuracy || false;
};

PhoneGap.addConstructor(function() {
    // add plugin to window.plugins
    PhoneGap.addPlugin('barcode', new Barcode());
    
    // register plugin on native side
    phonegap.PluginManager.addPlugin("Barcode","com.phonegap.plugins.Barcode");
});
