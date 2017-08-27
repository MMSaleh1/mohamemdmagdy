
export class Resturant {
    public name: string;
    public id: string;
    public des : string;
    public image: string;
    public products : Product[];
    
    constructor(name = "" , id = "" , des = "" , Image = "" , products = [new  Product()]){
        this.name = name ;
        this.id = id ;
        this.des = des ; 
        this.image = Image;
        this.products = products ;
    }


}
export class Product {
    public  URLNAME="http://services.edge-techno.com/newgiza";

    public name:any;
    public imageUrl:any;
    public price : number;
    public des : any;
    public id :string;
    public quantity: number;
    public categoryId: string;

    constructor(name = "" , imageUrl = "" , price = 0 , des = "" , id = "-1" , quantity = 0 , categoryId = '-1'){
        this.categoryId = categoryId;
        this.des = des;
        this.id = id;
        this.imageUrl = this.URLNAME+imageUrl.substring(1,imageUrl.length);
        this.name = name;
        this.price = price;
        this.quantity = quantity;

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