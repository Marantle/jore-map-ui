import { INode, ICoordinate } from '../models';
import NodeType from '../enums/nodeType';
import StopFactory from './stopFactory';

class NodeFactory {
    public static createNode = (node: any): INode => {
        const coordinateList = JSON.parse(node.geojson);
        const coordinate : ICoordinate = {
            lon: coordinateList.coordinates[0],
            lat: coordinateList.coordinates[1],
        };

        const nodeStop =  node.pysakkiBySoltunnus;

        return {
            id: node.soltunnus,
            stop: nodeStop ? StopFactory.createStop(nodeStop) : undefined,
            type: getNodeType(node.soltyyppi),
            coordinates: coordinate,
        };
    }
}

const getNodeType = (type:any) => {
    switch (type) {
    case 'X':
        return NodeType.CROSSROAD;
    case 'P':
        return NodeType.STOP;
    default:
        return NodeType.NOT_FOUND;
    }
};

export default NodeFactory;
