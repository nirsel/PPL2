
import { Result, makeFailure, makeOk } from '../shared/result';
import { unparseL31,makeVarDecl, DefineExp, isAppExp, isCExp, isDefineExp, isIfExp, isLitExp, makeLetExp,Binding, makeDefineExp, makeAppExp, CExp, ClassExp, ProcExp,  Exp, Program, makeIfExp, parseL31CExp, parseL31, IfExp, makeProcExp, parseSExp, isClassExp, makeProgram, isProgram, isAtomicExp, isCompoundExp, isBinding, isBoolExp, isLetExp, isNumExp, isPrimOp, isProcExp, isStrExp, isVarDecl, isVarRef, makeLitExp, makeBoolExp, AppExp, makePrimOp, makeVarRef, PrimOp } from "./L31-ast";
import { map, zipWith, reduce } from "ramda";
/*
Purpose: Transform L2 AST to Python program string
Signature: l2ToPython(l2AST)
Type: [EXP | Program] => Result<string>
*/
export const l2ToPython = (exp: Exp | Program): Result<string>  => 
    exp.tag==="Program"? makeOk(exp.exps.reduce((acc,curr)=>acc.concat(reWritePython(curr)+'\n'),"").slice(0,-1)):
    makeOk(reWritePython(exp))
    


export const reWritePython = (e:Exp):string=>
isDefineExp(e)? e.var.var+' = '+reWritePython(e.val): 
isBoolExp(e) ?unparseL31(e) :
isNumExp(e) ? unparseL31(e) :
isPrimOp(e) ? reWritePrim(e) :
isVarRef(e) ? unparseL31(e) :
isVarDecl(e) ? unparseL31(e) :
isStrExp(e)? e.val:
isIfExp(e) ?  '('+reWritePython(e.then)+' if '+reWritePython(e.test)+' else '+reWritePython(e.alt)+')':
isAppExp(e) ? reWriteApp(e):
isProcExp(e)? '(lambda '+e.args.reduce((acc,curr)=>acc.concat(curr.var+','),"").slice(0,-1)+' : '+e.body.reduce((acc,curr)=>acc.concat(reWritePython(curr)+' '),"").slice(0,-1)+')':
isLetExp(e)? unparseL31(e):
unparseL31(e);

export const reWritePrim = (e:PrimOp):string=>
     (e.op==='=')?'==':e.op


export const reWriteApp = (e:AppExp):string=>
    isPrimOp(e.rator)? 
    (unparseL31(e.rator)==='=')? '('+e.rands.map((exp:CExp)=>reWritePython(exp)+' '+reWritePython(e.rator)).join(' ').slice(0,-3)+')':
    (unparseL31(e.rator)==='not')?
    '('+unparseL31(e.rator)+' '+reWritePython(e.rands[0])+')':
    (unparseL31(e.rator)==='number?')?
    '(lambda x : (type(x) == int)'+'('+reWritePython(e.rands[0])+'))':
    (unparseL31(e.rator)==='boolean?')?
    '(lambda x : (type(x) == bool)'+'('+reWritePython(e.rands[0])+'))':
    (unparseL31(e.rator)==='eq?')?
    '('+e.rands.map((exp:CExp)=>reWritePython(exp)+' ==').join(' ').slice(0,-3)+')':
    '('+e.rands.map((exp:CExp)=>reWritePython(exp)+' '+reWritePython(e.rator)).join(' ').slice(0,-2)+')':
    reWritePython(e.rator)+'('+e.rands.reduce((acc,curr)=>acc.concat(reWritePython(curr)+','),"").slice(0,-1)+')'
    


