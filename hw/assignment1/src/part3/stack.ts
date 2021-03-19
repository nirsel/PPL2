import { State, bind } from "./state";

export type Stack = number[];

export const push :(x: number)=>State<Stack,undefined> = (x:number)=>{
    const func=(s:Stack):[Stack,undefined]=>{
        return [[x].concat(s),undefined];
    }
    return func;
} ;

export const pop :State<Stack,number> = (s:Stack)=>{
    return [s.slice(1,s.length),s[0]];
};

export const stackManip:State<Stack,undefined>=
    bind(pop,(x:number)=>bind(push(x*x),(z:undefined)=>bind(pop,(y:number)=>push(x+y))));