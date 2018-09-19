import IStop from '../models/IStop';

export default class StopFactory {
    public static createStop = (node: any): IStop => {
        return {
            id: node.id,
            nameFi: node.pysnimi,
            nameSe: node.pysnimir,
            radius: node.pyssade,
        };
    }
}
