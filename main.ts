// alert("ok!!!!!!!!");
import { Observable } from "rxjs-compat";

let numbers = [1, 5, 10];
let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, "click")
function load(url: string) { // this code does not execute until someone subscribes!!
    return Observable.create(observer => {

        let xhr = new XMLHttpRequest();
        xhr.addEventListener("load", () => {
            if(xhr.status===200){
            let data = JSON.parse(xhr.responseText);
            observer.next(data);
            observer.complete();
            }
            else{
                observer.error(xhr.statusText);
            }
        });
        xhr.open("GET",url);
        xhr.send();
    }).retryWhen(retryStrategy({attempts:3,delay:1500}));// : here
    


}
function retryStrategy({attempts=4,delay=1000})//= here
{
return function(errors)
{
    return errors
    .scan((acc,value)=>{//accumulator

        console.log(acc,value);
        return acc+1;
    },0)
    .takeWhile(acc=>acc<attempts)
    .delay(delay);
}
}

function loadWithFetch(url:string){
    return Observable.defer(()=>{
        return Observable.fromPromise(fetch(url).then(r=>r.json()));
    });


}
function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);

    });// clear child data to not make it look stacked
    // output.innerHTML=""; //clear all children
    
}
 //test to see if any data is returned 

 loadWithFetch("movies.json").subscribe(renderMovies);
// click.flatMap(e=>load("movies.json")).subscribe(o=>console.log(o));
click.flatMap(e=>loadWithFetch("movies.json")) //seperate function to load data 
.subscribe(  // and adding a subscribe to dpecify what we have to do with loaded data
    renderMovies,  //in this case display movies
    e => console.log(`error: ${e}`),  //next this
    () => console.log("complete") //lastly this
)


