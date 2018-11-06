import { IRoutePathLink, INode } from '~/models';
import NodeFactory from './nodeFactory';

export interface IRoutePathLinkResult {
    link: IRoutePathLink;
    nodes: INode[];
}

let routePathLinkCount = 0;

class RoutePathLinkFactory {
    public static createRoutePathLink = (routePathLinkNode: any): IRoutePathLinkResult => {
        const nodes = [];
        if (routePathLinkNode.solmuByLnkalkusolmu) {
            const node = NodeFactory.createNode(routePathLinkNode.solmuByLnkalkusolmu);
            nodes.push(node);
        }
        if (routePathLinkNode.solmuByLnkloppusolmu) {
            nodes.push(NodeFactory.createNode(routePathLinkNode.solmuByLnkloppusolmu));
        }
        const coordinates = JSON.parse(
            routePathLinkNode.linkkiByLnkverkkoAndLnkalkusolmuAndLnkloppusolmu.geojson).coordinates;
        const positions = coordinates.map((coor: [number, number]) => [coor[1], coor[0]]);

        return {
            nodes,
            link: { // TODO: rename as routePathLink
                positions,
                id: routePathLinkNode.relid,
                startNodeId: routePathLinkNode.lnkalkusolmu,
                endNodeId: routePathLinkNode.lnkloppusolmu,
                orderNumber: routePathLinkNode.reljarjnro,
                startNodeType: routePathLinkNode.relpysakki,
                timeAlignmentStop: routePathLinkNode.ajantaspys,
            },
        };
    }

    // TODO: remove this and use createRoutePathLink
    public static createRoutePathLink2 = (routePathLinkNode: any): IRoutePathLinkResult => {
        const nodes = [];
        if (routePathLinkNode.solmuByLnkalkusolmu) {
            const node = NodeFactory.createNode(routePathLinkNode.solmuByLnkalkusolmu);
            nodes.push(node);
        }
        if (routePathLinkNode.solmuByLnkloppusolmu) {
            nodes.push(NodeFactory.createNode(routePathLinkNode.solmuByLnkloppusolmu));
        }
        const coordinates = JSON.parse(
            routePathLinkNode.geojson).coordinates;
        const positions = coordinates.map((coor: [number, number]) => [coor[1], coor[0]]);

        return {
            nodes,
            link: { // TODO: rename as routePathLink
                positions,
                id: routePathLinkNode.relid,
                startNodeId: routePathLinkNode.lnkalkusolmu,
                endNodeId: routePathLinkNode.lnkloppusolmu,
                orderNumber: routePathLinkNode.reljarjnro,
                startNodeType: routePathLinkNode.relpysakki,
                timeAlignmentStop: routePathLinkNode.ajantaspys,
            },
        };
    }

    /**
     * @param {Object} options
     * @param {[[number, number]]} options.positions
     * @param {string} [options.startNodeId]
     * @param {string} [options.endNodeId]
     */
    public static createNewRoutePathLink(options: any): IRoutePathLink {
        const routePathLink: IRoutePathLink = {
            positions: options.positions,
            id: `new-${routePathLinkCount += 1}`,
            startNodeId: options.startNodeId ? options.startNodeId : '',
            endNodeId: options.endNodeId ? options.endNodeId : '',
            orderNumber: null,
            startNodeType: '',
            timeAlignmentStop: '',
        };

        routePathLinkCount += 1;

        return routePathLink;
    }
}

export default RoutePathLinkFactory;
