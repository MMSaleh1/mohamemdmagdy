import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';


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
  }>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.posts=[{
      name : "post1",
      content : "this is post nubmer 1 , testing long contents for over flowing",
      likes : 0,
      dislikes : 0
    },{
      name : "post2",
      content : "this is post nubmer 2",
      likes : 0,
      dislikes : 0
    },{
      name : "post3",
      content : "this is post nubmer 3",
      likes : 0,
      dislikes : 0
    },{
      name : "post4",
      content : "this is post nubmer 4",
      likes : 0,
      dislikes : 0
    }
  ]
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }
  public like(itemindex :any){
    this.posts[itemindex].likes++;

  }
  public dislike(itemindex :any){
    this.posts[itemindex].dislikes++;
  }

}
