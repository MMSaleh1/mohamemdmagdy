

export class User {
    private  URLNAME="http://services.edge-techno.com/newgiza";
    
    username : string;
    dob : string;
    image   : string;
    membershipType: string;
    memberId: string;
    familyId   : string;
    mobile: string;
    email : string;
    gender  : string;
    Relation : string;
    //password:string;
    balanceMoney : any;
   // balancePoints : any;
   // upDate   : any;
   // subProfissionId : any;
   constructor(username="",dob="",image="",membershipType="",memberId= "",familyId= "",mobile="",email = "",gender=0,Relation="",balanceMoney=0){
        
        this.username= username;
        this.dob = dob;
        this.image =  (image !=null &&image.length > 0)?this.URLNAME+image.substring(1,image.length) : "";
        this.membershipType=membershipType;
        this.memberId= memberId;
        this.familyId= familyId;
        this.membershipType=membershipType;
        this.mobile = mobile;
        this.email = email;
        this.gender= (gender == 1 ) ? "Male" :"Female";
        this.Relation = Relation == null ? "User" : Relation;
        this.balanceMoney = balanceMoney;
   }
   setImage(image : string){
    this.image =  (image !=null &&image.length > 0)?this.URLNAME+image.substring(1,image.length) : "";
   }
   

}

export class News{
    private  URLNAME="http://services.edge-techno.com/newgiza";
    id :string ;
    title : string;
    content : string ;
    likeCount : number ; 
    dislikeCount : number;
    isliked : boolean;
    isdesliked : boolean;
    image : string;
    
    constructor(id:string="",title:string="",content:string="",likeCount:number=0,dislikeCount:number =0,image:string=""){
        this.id = id;
        this.title = title;
        this.content = content;
        this.likeCount = likeCount;
        this.dislikeCount = dislikeCount;
        this.isdesliked=false;
        this.isliked=false;
        this.image = (image !=null &&image.length > 0)?this.URLNAME+image.substring(1,image.length) : "";
    }
}

export class Balance{
    public amount :number;
    public balance : number;
    public transactionDate : string;
    public transactionType :string;

    constructor(amount : number =0 , Balance : number =0  , transactiondata : string ="" , transactiontype : string=""){
        this.amount = amount;
        this. balance = Balance;
        this.transactionDate = transactiondata;
        this.transactionType = transactiontype;
    }

}