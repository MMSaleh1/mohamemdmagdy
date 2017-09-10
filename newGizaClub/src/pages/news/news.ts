import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';

import { NewsProvider } from '../../providers/news/news';  

import { News } from '../../templates/usertemplate';


/**
 * Generated class for the NewsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  public name : string ="news";
  public news :Array<News>;
  public action :string="NaN";
  public ready : boolean = false;
  public user : any;
  public userId : string;
  constructor(public navCtrl: NavController, public navParams: NavParams , public newsProvider :NewsProvider , public natStorage :NativeStorage) {
    this.news = new Array();
    this.natStorage.getItem("user").then(data=>{
      this.user = data;
      this.userId = this.user.id;
    },err=>{
      this.user = "";
      this.userId = "3147";
    })
    this.newsProvider.getnews(this.userId).subscribe(news=>{
      if(news.length > 0){
      for(var i =0 ;i<news.length;i++){
      this.news[i]= new News(news[i].NewsID,news[i].NewsTitle,news[i].NewsContent,news[i].LikeCount,news[i].DisLikeCount,news[i].NewsImage);;
      }
      this.ready= true;
    }
    },err=>{
      alert(err);
    }
  );
    /*
    this.natStorage.getItem("news").then(data=>{
      alert('native news');
      for(var i = 0 ;i<data.length;i++){
        this.news[i]=new News(data[i].id,data[i].title,data[i].content,data[i].likeCount,data[i].dislikeCount,data[i].image);
      }
      this.ready=true;
    },err=>{
      this.newsProvider.getnews('3147').subscribe(news=>{
        if(news.length > 0){
          for(var i = 0 ;i<news.length;i++){
            this.news[i]=new News(news[i].NewsID,news[i].NewsTitle,news[i].NewsContent,news[i].LikeCount,news[i].DisLikeCount,news[i].NewsImage);
          }
          console.log(this.news);
        this.ready=true;
        this.natStorage.setItem("news",this.news);
        
        }else{
          alert("No News For now");
        }
      },err=>{
        alert(err);
      })
    }
  )
  */
  if(this.ready){
    console.log(this.news);
  }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }
  public like(itemindex :any){
    this.news[itemindex].isliked=true;
    this.news[itemindex].likeCount++;

  }
  public dislike(itemindex :any){
    this.news[itemindex].isdesliked=true;
    this.news[itemindex].dislikeCount++;
  }


  public change(itemindex:any,action:any = '0'){ // action 0 is used if a user wants to remove his/her like/dislike

    if(action == '1'){
     this.like(itemindex);
     
    }else if(action== '2')
    {
     this.dislike(itemindex);
    }else{
      this.reset(itemindex);
    }
    if(action !='0'){
      this.newsProvider.newsFeedBack((this.user == "" )? "3147":this.user.id,this.news[itemindex].id,action).subscribe(data=>{
        console.log(data);
      },err=>{
        console.log(err);
      });
    }
    
  }
  public reset(itemindex :any){
    if(this.news[itemindex].isliked == true){
      this.news[itemindex].likeCount--;
      this.news[itemindex].isliked=false;
    }else{
      this.news[itemindex].dislikeCount--;
      this.news[itemindex].isdesliked=false;
    }
  }

}
