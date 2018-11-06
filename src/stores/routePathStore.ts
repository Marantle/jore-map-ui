import { action, computed, observable } from 'mobx';
import { IRoutePath, ICoordinate } from '~/models';
import RoutePathLinkFactory from '~/factories/routePathLinkFactory';
import RoutePathLinkService from '~/services/routePathLinkService';

export interface INeighborNode {
    id: string;
    coordinates: ICoordinate;
}

export interface INeighborLink {
    startNode: INeighborNode;
    endNode: INeighborNode;
    positions: [[number, number]]; // TODO: rename as geom?
}

export class RoutePathStore {
    @observable private _isCreating: boolean;
    @observable private _routePath: IRoutePath;

    @observable private _neighborLinks: INeighborLink[];

    constructor() {
        this._neighborLinks = [];
    }

    @computed
    get isCreating(): boolean {
        return this._isCreating;
    }

    @computed
    get routePath(): IRoutePath {
        return this._routePath;
    }

    @computed
    get neighborLinks(): INeighborLink[] {
        return this._neighborLinks;
    }

    @action
    setIsCreating(value: boolean) {
        this._isCreating = value;
    }

    @action
    setRoutePath(routePath: IRoutePath) {
        this._routePath = routePath;
    }

    @action
    addNode(node: any) {
        console.log('at addNode ', node);
        // is initial add?
        if (!this._routePath.routePathLinks || this._routePath.routePathLinks.length === 0) {
            const newRoutePathLink = RoutePathLinkFactory.createNewRoutePathLink({
                startNodeId: node.id,
                positions: [[1, 1]],
            });
            console.log('newRoutePathLink ', newRoutePathLink);
            this._routePath.routePathLinks = [newRoutePathLink];

            console.log('edited RP ', this._routePath);
            this.updateNeighborRoutePathLinks();
        }

        // if (this.nodes.includes(node)) return;

        // this._nodes.push(node);
        // this.updateNeighborNodes();

        // queryResult
        // addNeighborNodes
        // addRoutePathLinks
        // addNeighborRoutePathLinks

    }

    @action
    async updateNeighborRoutePathLinks() {
        const routePathLinks = this._routePath.routePathLinks;
        const lastRoutePathLink = routePathLinks[routePathLinks.length - 1];
        console.log('lastRoutePathLink ', lastRoutePathLink);
        const queryResult = await RoutePathLinkService
            .fetchLinksWithRoutePathLinkStartNodeId(lastRoutePathLink.startNodeId);

        console.log('query result ', queryResult);
    }
    // @action
    // addNeighborNodes(nodes: INewRoutePathNode[]) {
    //     this._neighborNodes = nodes;
    // }

    // async updateNeighborNodes() {
    //     const lastNode = this._nodes[this._nodes.length - 1];
    //     const neighborNodes: INewRoutePathNode[]|null
    //         = await NodeService.fetchNodesWithRoutePathLinkStartNodeId(lastNode.id);

    //     if (neighborNodes) {
    //         this.addNeighborNodes(neighborNodes);
    //     }
    // }
}

const observableStoreStore = new RoutePathStore();

export default observableStoreStore;
