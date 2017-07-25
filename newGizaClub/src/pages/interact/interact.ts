import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraPreview,CameraPreviewPictureOptions,CameraPreviewOptions,CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

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

  constructor(public navCtrl: NavController,public b64ToG : Base64ToGallery ,public navParams: NavParams, private cameraPreview: CameraPreview) {
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
this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
  this.picture = 'data:image/jpg;base64,' + imageData;
  this.b64ToG.base64ToGallery(this.picture).then(
  res => alert(res),
  err => alert(err)
);
}, (err) => {
  alert(err);

});

}


  ionViewDidLoad() {
   
  }

}
