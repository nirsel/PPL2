import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
export const countVowels = (str: string): number =>{
    const arr:string []= stringToArray(str);
    const result:string[] = arr.filter((s:string):boolean =>( s==='o'||s==='i'|| s==='a' || s==='e' ||
    s==='u' || s==='O'||s==='I'|| s==='A'|| s==='E' || s==='U'));
    return result.reduce((acc:number, curr:string):number=>(acc+1),0);
}

/* Question 2 */
export const runLengthEncoding = undefined;

/* Question 3 */
export const isPaired = undefined;