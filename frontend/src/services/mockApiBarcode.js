//import {simulateDelay} from './mockApiHelper'
import { BrowserBarcodeReader } from '@zxing/library';
const codeReader = new BrowserBarcodeReader();
class MockApiBarcode {
    constructor(){
    }

    search(imagePath) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.addEventListener('load', e => resolve(img));
            img.addEventListener('error', () => {
              reject(new Error(`Failed to load image's URL: ${url}`));
            });
            img.src = URL.createObjectURL(imagePath);
          }).then(img => codeReader.decodeFromImage(img)
          ).then(res => alert(res)
          ).catch(err => alert(err))

    }
}

export const BarcodeResearch = new MockApiBarcode()
