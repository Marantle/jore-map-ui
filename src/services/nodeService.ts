import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import apolloClient from '~/util/ApolloClient';
import { INode } from '~/models';

import notificationStore from '~/stores/notificationStore';
import NotificationType from '~/enums/notificationType';
import NodeFactory from '~/factories/nodeFactory';

export default class NodeService {
    public static async fetchNode(nodeId: string): Promise<INode | null> {
        try {
            const queryResult: ApolloQueryResult<any> = await apolloClient.query(
                { query: getNodeQuery, variables: { nodeId } },
            );
            return NodeFactory.createNode(queryResult.data.node);
        } catch (err) {
            notificationStore.addNotification({
                message: 'Solmun haku ei onnistunut.',
                type: NotificationType.ERROR,
            });
            return null;
        }
    }
}

const getNodeQuery = gql`
query getNodeDetails($nodeId: String!) {
    node: solmuBySoltunnus(soltunnus: $nodeId) {
        soltyyppi
        soltunnus
        solkuka
        solviimpvm
        mittpvm
        geojson
        geojsonManual
        pysakkiBySoltunnus {
            pysnimi
            pysnimir
            pyssade
        }
    }
}
`;
