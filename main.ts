import { Observable } from "rxjs-compat";
import {load,loadWithFetch} from "./loader";
//onErrorResumeNext use for producing items despite error
// let source=Observable.create(observer=>{
//     observer.next(1);
//     observer.next(2);
//     observer.error("Stop!");
//     // throw new error("Stop!");
//     observer.next(3);
//     observer.complete();
// });
let source=Observable.merge(
    Observable.of(1),
Observable.from([2,3,4]),
Observable.throw(new Error("Stop!")),
Observable.of(5)
).catch(e =>{
    console.log(`caught: ${e}`);
    return Observable.of(10);
});
source.subscribe(
    value=>console.log(`value: ${value}`),
    error=>console.log(`error: ${error}`),
    ()=>console.log("complete") 
)
// let numbers = [1, 5, 10];
let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, "click")

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);

    });// clear child data to not make it look stacked
    // output.innerHTML=""; //clear all children
    
}
 //test to see if any data is returned 

 loadWithFetch("movies.json").subscribe(renderMovies,e=>console.log(`error: ${e}`),() => console.log("complete"));
// click.flatMap(e=>load("movies.json")).subscribe(o=>console.log(o));
click.flatMap(e=>loadWithFetch("movies.json")) //seperate function to load data 
.subscribe(  // and adding a subscribe to dpecify what we have to do with loaded data
    renderMovies,  //in this case display movies
    e => console.log(`error: ${e}`),  //next this
    () => console.log("complete") //lastly this
)


