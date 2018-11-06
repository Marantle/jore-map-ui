import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import * as L from 'leaflet';
// import { RoutePathStore } from '~/stores/new/newRoutePathStore';
// import { Marker } from 'react-leaflet';
// import classnames from 'classnames';
// import * as s from './newRoutePathLayer.scss';

// interface IRoutePathLayerProps {
//     routePathStore?: RoutePathStore;
// }

// @inject('newRoutePathStore')
@observer
export default class RoutePathLayer extends Component { // TODO: <IRoutePathLayerProps>

    // private getMarkerHtml = (isNeighbor: boolean) => {
    //     return `<div class="${classnames(
    //         s.nodeBase,
    //         isNeighbor ? s.newRoutePathMarkerNeighbor : s.newRoutePathMarker,
    //     )}" />`;
    // }

    // private getIcon({ isNeighbor }: any) {
    //     const divIconOptions : L.DivIconOptions = {
    //         html: this.getMarkerHtml(isNeighbor),
    //         className: s.node,
    //     };

    //     return new L.DivIcon(divIconOptions);
    // }

    // private renderNodes() {
    //     // TODO
    //     return this.props.routePathStore!.nodes.map((node, index) => {
    //         const latLng = L.latLng(node.coordinates.lat, node.coordinates.lon);
    //         return (
    //             <Marker
    //                 icon={this.getIcon({ isNeighbor: false })}
    //                 key={index}
    //                 position={latLng}
    //             />
    //         );
    //     });
    // }

    // private renderNeighbors() {
    //     // TODO
    //     return this.props.routePathStore!.neighborNodes.map((node, index) => {
    //         const latLng = L.latLng(node.coordinates.lat, node.coordinates.lon);
    //         return (
    //             <Marker
    //                 onClick={this.addNode(node)}
    //                 icon={this.getIcon({ isNeighbor: true })}
    //                 key={index}
    //                 position={latLng}
    //             />
    //         );
    //     });
    // }

    // private addNode = (node: INewRoutePathNode) => () => {
    //     this.props.routePathStore!.addNode(node);
    // }

    render() {
        return (
            <div/>
        );
        // return (
        //     <>
        //         {this.renderNodes()}
        //         {this.renderNeighbors()}
        //     </>
        // );

    }
}
