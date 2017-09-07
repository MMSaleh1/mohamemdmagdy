
export class Resturant {
    private  URLNAME="http://services.edge-techno.com/newgiza";
    
    public name: string;
    public id: string;
    public des : string;
    public image: string;
    public category : string;
    public products : Product[];
    
    constructor(name = "" , id = "" , des = "" , imageUrl = "" , products = [new  Product()],Category = ""){
        this.name = name ;
        this.id = id ;
        this.des = des ; 
        this.image = ( imageUrl !=null &&imageUrl.length > 0 )?this.URLNAME+imageUrl.substring(1,imageUrl.length) : "";
        this.products = products ;
        this.category= Category;
    }


}
export class Product {
    private  URLNAME="http://services.edge-techno.com/newgiza";

    public name:any;
    public imageUrl:any;
    public price : number;
    public des : any;
    public id :string;
    public quantity: number;
    public categoryId: string;
    public PosId: string;

    constructor(name = "" , imageUrl = "" , price = 0 , des = "" , id = "-1" , quantity = 0 , categoryId = '-1',POSId = "-1"){
        this.categoryId = categoryId;
        this.des = des;
        this.id = id;
        this.imageUrl = (imageUrl != null &&imageUrl.length > 0 )?this.URLNAME+imageUrl.substring(1,imageUrl.length) : "";
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.PosId = POSId;

    }

}
export class Category{
    name :string;
    id : string;
    constructor(name= "",id='-1'){
        this.name=name;
        this.id=id;
    }
}