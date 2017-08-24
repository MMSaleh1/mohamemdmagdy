

export class User {
    
    
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
   constructor(username="",dob="",image="",membershipType="",memberId= "",familyId= "",mobile="",email = "",gender= "",Relation="",balanceMoney=0){
        
        this.username= username;
        this.dob = dob;
        this.image = image;
        this.membershipType=membershipType;
        this.memberId= memberId;
        this.familyId= familyId;
        this.membershipType=membershipType;
        this.mobile = mobile;
        this.email = email;
        this.gender= gender;
        this.Relation = Relation;
        this.balanceMoney = balanceMoney;
   }

}