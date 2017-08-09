import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { CameraPreview,CameraPreviewPictureOptions,CameraPreviewOptions } from '@ionic-native/camera-preview';
import {Camera,CameraOptions} from '@ionic-native/camera';


import { ImagerecognitionProvider } from '../../providers/imagerecognition/imagerecognition';
/**
 * Generated class for the InteractPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-interact',
  templateUrl: 'interact.html',
})
export class InteractPage {

  private picture: string;
  private recog :any;
  private pic :any;
  public output:any ="test";
private pictureOpts: CameraPreviewPictureOptions = {
  width: 320,
  height: 240,
  quality: 75
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

  constructor(public camera : Camera, public platform :Platform,public navCtrl: NavController,public ir :ImagerecognitionProvider,private cameraPreview: CameraPreview) {
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

  public state=1;

  public options: CameraOptions = {
  quality: 75,
  destinationType: this.camera.DestinationType.DATA_URL,
  sourceType : this.camera.PictureSourceType.CAMERA,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  targetHeight: 320,
  targetWidth:240
}



takePicture(){
this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
  this.state=0;
this.picture='data:image/jpeg;base64,'+imageData;
this.output=typeof(this.recog);
this.ir.quarryImage(this.picture).subscribe(data=>{
 this.recog = data;
 this.output=this.recog;
  if(this.recog !=[]){
    if(this.recog["results"]){
     alert(this.recog["results"]["score"]);
    }else{
      alert(this.recog);
   }
  }else{
    alert("please take another photo");
  }
 console.log(typeof(this.pic));
  if(this.pic != null){
    console.log(this.pic);
  }
  this.state=1;
},err=>{
    this.output=err;
})
},(err) => {
  alert(err);

});
/*
this.camera.getPicture(Option).then((data)=>{
this.picture='data:image/jpeg;base64,'+data;
this.ir.quarryImage(this.picture).subscribe(data=>{;
 this.output=data;
  if(this.output !=[]){
    if(this.output["results"]){
     alert(this.output["results"]["score"]);
    }else{
      alert(this.output);
   }
  }else{
    alert("please take another photo");
  }
  this.state=1;
},err=>{
    this.output=err;
});
},(err)=>{
  this.output.err;

});
*/
}
  ionViewDidLoad() {
   
  }
  changeListener($event :any) : void {
    console.log("test");
      let image = this.readThis($event.target);
      console.log(image);
      this.ir.quarryImage(image).subscribe(data=>{
      this.recog = data;
      if(this.recog !=[]){
      if(this.recog["results"]){
     alert(this.recog["results"]["score"]);
      }else{
      alert(this.recog);
   }
  }else{
    alert("please take another photo");
  }
  })
  }
  

  readThis(inputValue: any) : any {
    var file:File = inputValue.files[0]; 
    var myReader:FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = function(e){
      return myReader.result;
    }

    
  }

}
