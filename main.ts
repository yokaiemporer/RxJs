// alert("ok!!!!!!!!");
import {Observable} from "rxjs-compat";

let numbers=[1,5,10];
let circle=document.getElementById('circle');
let source =Observable.fromEvent(document,"mousemove")
.map((e:MouseEvent)=>{
    return {
        x:e.clientX,
        y:e.clientY
    }
})
.filter(value=>value.x<500)
.delay(300);
function onNext(value){
    circle.style.left=value.x;
    circle.style.top=value.y;
}
source.subscribe(
onNext,  //this gets called first
e=>console.log(`error: ${e}`),  //next this
()=>console.log("complete") //lastly this
)

