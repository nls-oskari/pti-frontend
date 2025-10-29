import { addCardinal, toDegree } from './FileWriter';

describe('addCardinal function', () => {
    test('adds cardinal for coordinate', () => {
        expect.assertions(4);
        expect(addCardinal('394913,8', true)).toEqual('394913,8E');
        expect(addCardinal('-394913,8', true)).toEqual('394913,8W');
        expect(addCardinal('6696617.2')).toEqual('6696617.2N');
        expect(addCardinal('-6696617.2')).toEqual('6696617.2S');
    });
});

describe('toDegree function', () => {
    test('coordinate to degree', () => {
        expect.assertions(5);
        expect(toDegree(65.1, 'DD MM', 3)).toEqual('65 06.000');
        expect(toDegree(65.1, 'DD MM SS', 3)).toEqual('65 05 60.000'); // or '65 06 00.000'
        //expect(['65 05 60.000', '65 06 00.000']).toContain(toDegree(65.1, 'DD MM SS', 3)); 
        expect(toDegree(65.101, 'DD MM SS', 3)).toEqual('65 06 03.600');
        expect(toDegree(180, 'radian', 8)).toEqual(Math.PI.toFixed(8));
        expect(toDegree(90, 'gradian', 5)).toEqual('100.00000');
    });
});
