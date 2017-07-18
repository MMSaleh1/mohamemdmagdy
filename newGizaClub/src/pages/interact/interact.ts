import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraPreview,CameraPreviewPictureOptions,CameraPreviewOptions,CameraPreviewDimensions } from '@ionic-native/camera-preview';

/**
 * Generated class for the InteractPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-interact',
  templateUrl: 'interact.html',
})
export class InteractPage {

private pictureOpts: CameraPreviewPictureOptions = {
  width: 1280,
  height: 1280,
  quality: 85
}
private picture: string;

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview) {
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  });
  this.cameraPreview.show();


  }

 
takePicture(){
this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
  this.picture = 'data:image/jpeg;base64,' + imageData;
}, (err) => {
  alert(err);

});

}


  ionViewDidLoad() {
   
  }

}
