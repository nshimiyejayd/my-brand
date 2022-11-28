
let obj = [{'name': 'jay', 'age': 18}, {'name': 'pacis', 'age': 30}];
let newObj = {'p':'xxk','name':'doc', 'age': 20};
// obj.push(newObj);

    delete newObj.p
// delete Object.assign(newObj, {['c']: newObj['p']})['p'];
// const { p, ...rest } = newObj
// const new_obj = { 'kA': p, ...rest}
let a = 'k1'
let v = 10
let replaced = {a: v, ...newObj}

console.log(replaced)

// console.log(newObj);

// obj[0].name = 'King';
// console.log(obj);

let arr = [2, 3, null, 5, 6, 7, 8, 9, 10];
// arr.unshift(1); 
// console.log(arr)
// let date = new Date()
// console.log(date.getMonth()+1)

// let str = 'hey bro are oksy';
// let n = str.substring(2)
// console.log(n); 

// let newArr = arr.filter(el => el !== null);

// console.log(newArr);

// let str = 'hello bro'
// let sl = str.slice(0, 3)
// console.log(sl);