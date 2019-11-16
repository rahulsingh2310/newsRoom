var arr = [{name: 'apple', checkRequire: true}, {name: 'mango', checkRequire: false},{name: 'watermelon', checkRequire: false},{name: 'orange', checkRequire: true}];
console.log(arr);

var arr_1 = arr.filter((fruit, index, arr) => {
    return fruit.checkRequire == true;
})
console.log(arr_1);