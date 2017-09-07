export class Sports{
    public name : string ;
    public id : string;
    public logo : string;
    public description:string;

    constructor(name:string ="",id:string ="", desc="this is where description is"){
        this.name=name;
        this.id=id;
        this.logo=(name="")? "" : `assets/img/sports/${this.name}.png`;
        this.description = desc;
    }
}





export class Coach{
    private  URLNAME="http://services.edge-techno.com/newgiza/";

    public name : string;
    public id : string;
    public bio : string;
    public image :string;
    
    constructor(name : string ="",id: string="",bio :string ="",image="")
    {
        this.name = name;
        this.id = id;
        this.bio = bio;
        this.image = (image != null && image !="")? this.URLNAME+image.substring(1,image.length) : image;
    }
}






export class Team {
    public name :string ;
    public id : string ;
    public cost : number;
    public billingPeriod : number;
    public gender : string ;
    public schedule :Schedule;
    public coach : Coach;
    public sport : Sports;
    public age : number ;
    constructor(name : string ="",
    id:string ="",
    cost :number = 0 ,
    billingPeriod : number =0,
    gender :number =0,
    age : number = 0,
    schedule : Schedule =new Schedule(),
    coach : Coach = new Coach(),
    sport : Sports = new Sports()
 )
 {
     this.name= name;
     this.id = id;
     this. cost = cost;
     this.billingPeriod = billingPeriod;
     this.gender = (gender == 1)? "male" : "female" ;
     this.schedule = schedule;
     this.coach =coach;
     this.sport = sport;
     this.age = age;
 }






}

export class Schedule {
    public id : string;
    public name : string;
    public details :string;
    constructor(name : string ="", id :string ="",details : string =""){
        this.name=name;
        this.id=id;
        this.details = details;
    }
}