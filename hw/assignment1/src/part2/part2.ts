//import { access } from "node:fs";
import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
export const countVowels = (str: string): number =>{
    const a:string = str.toUpperCase();
    const arr:string []= stringToArray(a);
    const result:string[] = arr.filter((s:string):boolean =>(s==='O'||s==='I'|| s==='A'|| s==='E' || s==='U'));
    return result.length;
    //return result.reduce((acc:number, curr:string):number=>(acc+1),0);
}

/* Question 2 */
export const runLengthEncoding = (str:string): string =>{
    const arr: string[] = stringToArray(str);
    const ans:string = arr.reduce((acc:string, curr:string):string=> 
    acc!=""&&acc[acc.length-2]===curr?
    acc.substring(0,acc.length-1)+(Number(acc[acc.length-1])+1):
    acc+curr+1
    ,"");
    return ans.split('1').join('');
    
}

/* Question 3 */
export const isPaired = (str:string): boolean=>{
    const par:string[]=stringToArray(str).filter((s:string):boolean=>(s==="("||s==="["||s==="{"||s===")"||s==="]"||s==="}"));
    const isOpener = (s:string): boolean=> (s==="("||s==="["||s==="{");
    const checkPair = (open:string, closer:string): boolean=>{
      return (open==="("&&closer===")")||(open==="["&&closer==="]")||(open==="{"&&closer==="}");
    }
    const ans:string=par.reduce((acc:string,curr:string):string=>
    acc!=""&&isOpener(curr)?
    acc+curr:
    acc.length===0?
    curr:
    checkPair(acc[acc.length-1],curr)?
    acc.substring(0,acc.length-1):
    "false","");
    return ans==="";
}


