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
  public posts :Array<{
    name : string;
    content : string;
    likes: number;
    dislikes:number;
    isliked :boolean;
    isdesliked :boolean;
  }>;
  public news :Array<News>;
  public action :string="NaN";
  public ready : boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams , public newsProvider :NewsProvider , public natStorage :NativeStorage) {
    this.posts=[{
      name : "post1",
      content : "this is post nubmer 1 , testing long contents for over flowing",
      likes : 0,
      dislikes : 0,
      isliked :false,
      isdesliked :false
    },{
      name : "post2",
      content : "this is post nubmer 2",
      likes : 0,
      dislikes : 0,
      isliked :false,
      isdesliked :false
    },{
      name : "post3",
      content : "this is post nubmer 3",
      likes : 0,
      dislikes : 0,
      isliked :false,
      isdesliked :false
    },{
      name : "post4",
      content : "this is post nubmer 4",
      likes : 0,
      dislikes : 0,
      isliked :false,
      isdesliked :false
    }];
    this.news = new Array();
    this.natStorage.getItem("news").then(data=>{
      for(var i = 0 ;i<data.length;i++){
        this.news[i]=new News(data[i].id,data[i].title,data[i].content,data[i].likeCount,data[i].dislikeCount);
      }
      this.ready=true;
    },err=>{
      this.newsProvider.getnews('3147').subscribe(news=>{
        if(news.length > 0){
          for(var i = 0 ;i<news.length;i++){
            this.news[i]=new News(news[i].NewsID,news[i].NewsTitle,news[i].NewsContent,news[i].LikeCount,news[i].DisLikeCount);
          }
          console.log(this.news);
        this.ready=true;
        this.natStorage.setItem('news',this.news);
        
        }else{
          alert("No News For now");
        }
      },err=>{
        alert(err);
      })
    }
  )
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


  public change(itemindex:any,action:any){

    if(this.news[itemindex].isliked){
      this.news[itemindex].likeCount--;
      this.news[itemindex].isliked=false;
      
    }else if(this.news[itemindex].isdesliked)
    {
      this.news[itemindex].dislikeCount--;
      this.news[itemindex].isdesliked=false;
    }
    
  }

}
