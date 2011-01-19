package com.phonegap.plugins;

import java.util.Vector;

import org.json.me.JSONArray;

import com.google.zxing.BarcodeFormat;
import com.phonegap.util.Logger;

public class BarcodeOptions {

    // TODO: options
    //  - timeout
    //  - audio?

    private Vector formats;
    private boolean highAccuracy;
    
    public BarcodeOptions() {
        this.formats = new Vector();
    }
    
    public Vector getFormats() {
        return formats;
    }

    public boolean getHighAccuracy() {
        return highAccuracy;
    }

    private void addFormat(BarcodeFormat format) {
        this.formats.addElement(format);
    }

    private void setHighAccuracy(boolean highAccuracy) {
        this.highAccuracy = highAccuracy;
    }
    
    public static BarcodeOptions fromJSONArray(JSONArray options) {
        BarcodeOptions bco = new BarcodeOptions();
        if (options != null) {
            // retrieve specified barcode formats
            if (options.length() > 0 && !options.isNull(0)) {
                Logger.log(Barcode.class.getName() + " options=" + options.toString());                    
                JSONArray fmts = options.optJSONArray(0);    
                for (int i=0; i<fmts.length(); i++) {
                    try {
                        bco.addFormat(BarcodeFormat.valueOf(fmts.optString(i)));
                    } catch (IllegalArgumentException e) {
                        // ignore invalid formats
                    }
                }
            }

            // use high accuracy scan?
            if(options.length() > 1 && !options.isNull(1)) {
                bco.setHighAccuracy(options.optBoolean(1));
            }
        }        
        return bco;
    }
}
