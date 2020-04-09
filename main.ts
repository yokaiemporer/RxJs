// alert("ok!!!!!!!!");
import {Observable} from "rxjs-compat/observable";
// import "rxjs/add/operator/map";
let numbers=[1,5,10];
// let source=Observable.from(numbers);


let source=Observable.create(observer=>{
    let index=0;
    let produceValue=()=>{
        observer.next(numbers[index++]);
        if(index<numbers.length)
        setTimeout(produceValue,2000);
        else
        observer.complete();
    }
    produceValue();
    // for(let n of numbers)  //value iteration -use let in numbers for index iteration
    // {
    //     if(n==5)
    //     observer.error("something went wrong!");//stop the observable with this function
    //     observer.next(n);
    // }
    // observer.complete();
}).map(n=>n*2).filter(n=>n>4);
source.subscribe(
value=>console.log(`value: ${value}`),  //this gets called first
e=>console.log(`error: ${e}`),  //next this
()=>console.log("complete") //lastly this
)
// class MyObserver
// {

//     next(value)
//     {
//         console.log(`value: ${value}`);
//     }
//     error(e)
//     {
//         console.log(`error: ${e}`);

//     }
//     complete()
//     {
//         console.log("complete");
//     }
// }
// source.subscribe(new MyObserver());
