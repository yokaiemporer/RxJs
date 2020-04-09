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
            let data = JSON.parse(xhr.responseText);
            observer.next(data);
            observer.complete();
        });// clear child data to not make it look stacked
        xhr.open("GET",url);
        xhr.send();
    });
    


}
function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}
load("movies.json");  //test to see if any data is returned 
// click.flatMap(e=>load("movies.json")).subscribe(o=>console.log(o));
click.flatMap(e=>load("movies.json")) //seperate function to load data 
.subscribe(  // and adding a subscribe to dpecify what we have to do with loaded data
    renderMovies,  //in this case display movies
    e => console.log(`error: ${e}`),  //next this
    () => console.log("complete") //lastly this
)


