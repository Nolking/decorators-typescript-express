import 'reflect-metadata'

// const plane = {
//     color: 'red'
// };

// Reflect.defineMetadata('note', 'hi there', plane)

// console.log(plane);

// const note = Reflect.getMetadata('note', plane);

// console.log(note);

@printMetadata
class Plane {
    color: string = 'red';

    @markFunction('Hi threre')
    fly(): void {
        console.log('vrrrrr');
    }
}
function markFunction(secretInfo: string) {
    return function(target: Plane, key: string) {
        Reflect.defineMetadata('secret', secretInfo, target, key)
    }
}

const secret = Reflect.getMetadata('secret', Plane.prototype, 'fly');

console.log(secret);

function printMetadata(target: typeof Plane) {
    for (let key in target.prototype) {
        const secret = Reflect.getMetadata('secret', target.prototype, key);
        console.log(secret)
    }
}