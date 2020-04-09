// alert("ok!!!!!!!!");
import { Observable } from "rxjs-compat";

let numbers = [1, 5, 10];
let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, "click")
function load(url: string) {
    return Observable.create(observer => {

        let xhr = new XMLHttpRequest();
        xhr.addEventListener("load", () => {
            let data = JSON.parse(xhr.responseText);
            observer.next(data);
            observer.complete();
        });
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
//same thing bfore flat map
click.subscribe(
    e => load("movies.json").subscribe(o=>console.log(o)),  //this gets called first
    e => console.log(`error: ${e}`),  //next this
    () => console.log("complete") //lastly this
)
//there is a nesting of scubscribe inside one another 
//so we can better implment this in next commit

