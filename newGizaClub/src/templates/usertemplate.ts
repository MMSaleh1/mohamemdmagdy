

export class User {
    
    id    : string;
    username : string;
    dob : Date;
    image   : string;
    membershipType: string;
    memberId: string;
    nid   : string;
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
       this.id = "";
        this.username= "";
        this.dob = new Date();
        this.image ="";
        this.membershipType="" ;
        this.memberId= "";
        this.nid= "";
        this.mobile="";
        this.email = "";
        this.gender= "";
        this.password="";
   }

}