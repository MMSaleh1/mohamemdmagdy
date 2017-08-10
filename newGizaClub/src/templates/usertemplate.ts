

export class User {
    
    userID    : string;
    username : string;
    DOB : Date;
    image   : string;
    membershipType: string;
    membershipID: string;
    nationalId   : string;
    mobile: string;
    email : string;
    //nID => natunal id
    gender  : string;
    password:string;
   // balanceMoney : any;
   // balancePoints : any;
   // upDate   : any;
   // subProfissionId : any;
   constructor(){
       this.userID = "";
        this.username= "";
        this.DOB = new Date();
        this.image ="";
        this.membershipType="" ;
        this.membershipID= "";
        this.nationalId= "";
        this.mobile="";
        this.email = "";
        this.gender= "";
        this.password="";
   }

}