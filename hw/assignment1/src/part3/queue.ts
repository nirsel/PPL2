import { State, bind } from "./state";

export type Queue = number[];

export const enqueue:(x: number)=>State<Queue,undefined> = (x:number)=>{
    const func=(q:Queue):[Queue,undefined]=>{
        return [q.concat(x),undefined];
    }
    return func;
} ;

export const dequeue:State<Queue,number> = (q:Queue)=>{
    return [q.slice(1,q.length),q[0]];
};

//export const queueManip:State<Queue,number> = (q:Queue)=>{
 //   return bind(dequeue,(x:number)=>bind(enqueue(x*2),(y:undefined)=>bind(enqueue(x/3),(z:undefined)=>dequeue(q))))
//};
export const queueManip : State<Queue, number> = bind(bind(dequeue, (x: number) => bind(enqueue(2*x), (y: undefined) => enqueue(x/3))), (x: undefined) => dequeue);


console.log(queueManip([6, 7, 8]));

