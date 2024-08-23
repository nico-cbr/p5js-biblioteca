class Inimigo{
  constructor(img,x,y,){
    this.x =x;
    this.y = y;
    this.img = img;
  }
  
  render(){
    image(this.img,this.x,this.y, 40, 40);
    this.y +=2;
  }
}