// console.log(this);

// const helloFn = () => {
//     console.log(this);
// };
// helloFn();

// const obj = {
//     f: function(){
//         const neO = {
//            g: function g(){
//                 console.log(this);
//             }
//         }
//         neO.g();
//     }
// }
// obj.f();

// const p1 = {
//     name:"abhi",
//     showDetails:function(age){
//         console.log(this.name+" Age:"+age);
//     }
// }
// const p2 = {
//     name:"raj"
// }
// p1.showDetails(23);
// p1.showDetails.call(p2,29); // call
// p1.showDetails.apply(p2,[29]); // apply
// let newFn = p1.showDetails.bind(p2,[29]); // bind
// newFn();

// curying
// function add(x,y){
//     return x+y;
// }
// const addC = add.bind(this,2);
// console.log(addC(3)); 
function add(x){
    return function addC(y){
        console.log(x+y);
    }
}
let child = add(2);
child(4);