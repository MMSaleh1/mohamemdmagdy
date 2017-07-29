import { Component } from '@angular/core';
import { IonicPage,Platform, NavController, NavParams } from 'ionic-angular';
import { CameraPreview,CameraPreviewPictureOptions,CameraPreviewOptions,CameraPreviewDimensions } from '@ionic-native/camera-preview';
import {Camera} from '@ionic-native/camera';

import { ImagerecognitionProvider } from '../../providers/imagerecognition/imagerecognition';
/**
 * Generated class for the InteractPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-interact',
  templateUrl: 'interact.html',
})
export class InteractPage {

  private picture: string;
  private recog :any;

private pictureOpts: CameraPreviewPictureOptions = {
  width: 3120,
  height: 4160,
  quality: 80
}

private cameraPreviewOpts: CameraPreviewOptions = {
  x: 0,
  y: 0,
  width: window.screen.width,
  height: window.screen.height,
  camera: 'rear',
  tapPhoto: true,
  previewDrag: true,
  toBack: true,
  alpha: 1
};

  constructor(public platform :Platform,public navCtrl: NavController,public ir :ImagerecognitionProvider,private cameraPreview: CameraPreview) {
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
  (res) => {
   console.log(res);
  },
  (err) => {
    console.log(err);
  });
  this.cameraPreview.setFlashMode("off");
  this.cameraPreview.show();
  }



takePicture(){
  this.picture='../../assets/img/test.jpeg';
  this.ir.quarryImage(this.picture).subscribe(data=>{
  this.recog = data;
  if(this.recog !=[]){
    if(this.recog["results"]){
      alert(this.recog["results"]["score"]);
    }else{
      alert(this.recog["error"]["code"]);
    }
  }else{
    alert("please take another photo");
  }
})
this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
this.picture='data:image/jpeg;base64,'+imageData;
},(err) => {
  alert("image data error");
  alert(err);

});
}
  ionViewDidLoad() {
   
  }

}
