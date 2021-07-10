@classDecorator
class Boat {
    @testDecorator
    color: string = 'red';

    get formattedColor(): string {
        return `This boats color is ${this.color}`;
    }

    @logError('sunk in the ocean')
    pilot(
        @parameterDecorator speed: string, 
        @parameterDecorator gegenrateWake: boolean): void {
        // throw new Error();
        if (speed === 'fast') {
            console.log('swish');
        } else {
            console.log('nothing');
        }
        // console.log('swish');
    }
}

function classDecorator( constructor: typeof Boat) {
    console.log(constructor)
}
function parameterDecorator(target: Boat, key: string, index: number ) {
    console.log(key, index);
}

function testDecorator(target: any, key: string): void {
    console.log('Target: ', target);
    console.log('Key: ', key);
}

function logError(errorMessage: string) {
    return function (target: any, key: string, desc: PropertyDescriptor): void {
        const method = desc.value;

        desc.value = function() {
            try {
                method();
            } catch (e) {
                console.log(errorMessage)
            }
        }
    }
}

// new Boat().pilot()s