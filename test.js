const arr = [10, 20, 30, 40, 50, 30, 20 , 10];


function add(a) {
    return function(b) {
        return a + b;
    }
}