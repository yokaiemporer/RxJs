// alert("ok!!!!!!!!");
import {Observable} from "rxjs-compat";

let numbers=[1,5,10];
let output=document.getElementById('output');
let button=document.getElementById('button');

let click =Observable.fromEvent(button,"click")
function load(url:string)
{
    let xhr=new XMLHttpRequest();
    xhr.addEventListener("load",()=>{
        let movies=JSON.parse(xhr.responseText);
        movies.forEach(element => {
            let div=document.createElement("div");
            div.innerText=element.title;
            output.appendChild(div);
        });
    });
    xhr.open("GET",url);
    xhr.send();


}
click.subscribe(
e=>load("movies.json"),  //this gets called first
e=>console.log(`error: ${e}`),  //next this
()=>console.log("complete") //lastly this
)

