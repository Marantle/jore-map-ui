import * as L from 'leaflet';
import { IRoutePath, IRoute, INode } from '../models';
import * as s from './routeLayer.scss';
import { SidebarStore } from '../stores/sidebarStore';
import NodeType from '../enums/nodeType';
import classnames from 'classnames';

export default class RouteLayerView {
    private map: L.Map;
    private sidebarStore?: SidebarStore;
    private routeLines: L.GeoJSON<any>[];
    private routeNodes: L.CircleMarker<any>[];

    constructor(map: L.Map, sidebarStore?: SidebarStore) {
        this.map = map;
        this.sidebarStore = sidebarStore;
        this.routeLines = [];
        this.routeNodes = [];
    }

    public drawRouteLines(routes: IRoute[]) {
        this.clearRoute();

        if (routes && routes[0]) {
            if (routes[0].routePaths[0]) {
                routes[0].routePaths.map((routePath) => {
                    if (routePath.visible) {
                        this.drawRouteLine(routePath);
                        this.drawNodes(routePath);
                    }
                });
            } else {
                // TODO: throw error / show error on UI if routePath is empty?
            }
        } else {
            this.clearRoute();
        }
    }

    private drawRouteLine(routePath: IRoutePath) {
        const getColorClassName = (type: string) => {
            switch (routePath.direction) {
            case '1': return s.blue;
            case '2': return s.red;
            default: return s.blue;
            }
        };

        const geoJSON = new L.GeoJSON(routePath.geoJson)
        .setStyle({
            className: classnames(s.route, getColorClassName(routePath.direction)),
        })
        .addTo(this.map);
        this.routeLines.push(geoJSON);
    }

    private drawNodes(routePath: IRoutePath) {
        routePath.nodes.map((node) => {
            this.drawNode(node, routePath.direction);
        });
    }

    private drawNode(node: INode, direction: string) {
        const getColorClassName = (type: NodeType, direction: string) => {
            if (type === NodeType.CROSSROAD) return s.grey;

            switch (direction) {
            case '1': return s.blue;
            case '2': return s.red;
            default: return s.blue;
            }
        };

        const coordinates = node.geoJson.coordinates;
        const circle = new L.CircleMarker([coordinates[1], coordinates[0]])
        .setStyle({
            className: classnames(s.node, getColorClassName(node.type, direction)),
        })
        .on('click', () => {
            this.sidebarStore!.setOpenedNodeId(node.id);
        })
        .addTo(this.map);
        this.routeNodes.push(circle);
    }

    private clearRoute() {
        this.routeLines.map((layer: L.GeoJSON) => {
            this.map.removeLayer(layer);
        });
        this.routeNodes.map((circleMarker: L.CircleMarker) => {
            this.map.removeLayer(circleMarker);
        });
        this.routeLines = [];
        this.routeNodes = [];
    }

}
