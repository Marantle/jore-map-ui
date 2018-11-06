import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import apolloClient from '~/util/ApolloClient';
// import { INode } from '~/models';

import notificationStore from '~/stores/notificationStore';
import NotificationType from '~/enums/notificationType';
import RoutePathLinkFactory from '~/factories/routePathLinkFactory';

export default class RoutePathLinkService {
    public static async fetchLinksWithRoutePathLinkStartNodeId(nodeId: string)
        : Promise<any[] | null> { // TODO: any -> type?
        try {
            const queryResult: ApolloQueryResult<any> = await apolloClient.query(
                { query: getLinksWithRoutePathLinkStartNodeIdQuery, variables: { nodeId } },
            );

            const externalRoutePathLinks =
                queryResult.data.solmuBySoltunnus.linkkisByLnkalkusolmu.nodes;
            return externalRoutePathLinks.map((externalRoutePathLink: any) => {
                return RoutePathLinkFactory.createRoutePathLink2(externalRoutePathLink);

            });
        } catch (err) {
            notificationStore.addNotification({
                message: `Haku löytää reitin linkkien Lnkalkusolmu solmuja, joilla on
                    soltunnus ${nodeId}, ei onnistunut.`,
                type: NotificationType.ERROR,
            });
            return null;
        }
    }

    // TODO: use nodeFactory's createNode instead?
//     private static createNodes(nodes: any): any[] { // TODO: any -> type?
//         return nodes.map((queryNode: any) => {
//             const node = queryNode.solmuByLnkloppusolmu;

//             // Use less accurate location if measured location is missing.
//             const coordinateList =
//                 JSON.parse(node.geojson ? node.geojson : node.geojsonManual);
//             const coordinates : ICoordinate = {
//                 lon: coordinateList.coordinates[0],
//                 lat: coordinateList.coordinates[1],
//             };

//             return {
//                 coordinates,
//                 id: node.soltunnus,
//             };
//         });
//     }

}

const getLinksWithRoutePathLinkStartNodeIdQuery = gql`
query getNodesWithRoutePathLinkStartNodeId($nodeId: String!) {
    solmuBySoltunnus(soltunnus: $nodeId) {
        linkkisByLnkalkusolmu {
            nodes {
                lnkverkko
                geojson
                solmuByLnkalkusolmu {
                    soltunnus
                    geojson
                    soltyyppi
                    solkirjain
                    geojsonManual
                }
                solmuByLnkloppusolmu {
                    soltunnus
                    geojson
                    soltyyppi
                    solkirjain
                    geojsonManual
                }
            }
        }
    }
}
`;
