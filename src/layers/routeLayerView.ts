import * as L from 'leaflet';
import { IDirection, IRoute } from '../models';
import { routeLayerBlue, routeLayerRed } from './routeLayer.scss';

export default class RouteLayerView {
    private map: L.Map;
    private routeLayers: L.GeoJSON<any>[];

    constructor(map: L.Map) {
        this.map = map;
        this.routeLayers = [];
    }

    public drawRouteLines(routes: IRoute[]) {
        if (routes && routes[0]) {
            if (routes[0].directions[0]) {
                routes[0].directions.map(direction => (
                    this.drawRouteLine(direction)
                ));
            } else {
                // TODO: throw error / show error on UI if direction is empty?
            }
        } else {
            this.clearRoute();
        }
    }

    private drawRouteLine(direction: IDirection) {
        const getClassName = (type: string) => {
            switch (direction.direction) {
            case '1': return routeLayerBlue;
            case '2': return routeLayerRed;
            default: return routeLayerBlue;
            }
        };

        const geoJSON = new L.GeoJSON(JSON.parse(direction.geoJson))
        .setStyle({
            className: getClassName(direction.direction),
        })
        .addTo(this.map);
        this.routeLayers.push(geoJSON);
    }

    private clearRoute() {
        this.routeLayers.map((layer: L.GeoJSON) => {
            this.map.removeLayer(layer);
        });
        this.routeLayers = [];
    }

}
