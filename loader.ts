import {Observable} from "rxjs-compat";
export function load(url: string) { // this code does not execute until someone subscribes!!
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
function retryStrategy({attempts=4,delay=1000}={})//= here
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

export function loadWithFetch(url:string){
    return Observable.defer(()=>{
        return Observable.fromPromise(fetch(url).then(r=>{if(r.status==200)
                                                                return r.json()
                                                                else{
                                                                    return Promise.reject(r);
                                                                }}));
    }).retryWhen(retryStrategy());


}