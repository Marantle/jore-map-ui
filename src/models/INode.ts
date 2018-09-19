import NodeType from '../enums/nodeType';
import { ICoordinate } from '.';
import IStop from './IStop';

export default interface INode {
    id: number;
    type: NodeType;
    coordinates: ICoordinate;
    stop?: IStop;
}
