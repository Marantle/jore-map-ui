import { IRoutePath, INode } from '~/models';
import HashHelper from '~/util/hashHelper';
import RoutePathLinkFactory, { IRoutePathLinkResult } from './routePathLinkFactory';
import QueryParsingHelper from './queryParsingHelper';

export interface IRoutePathResult {
    routePath: IRoutePath;
    nodes: INode[] | null;
}

class RoutePathFactory {
    // suunta to IRoutePath
    public static createRoutePath = (
        routeId: string,
        suunta: any,
    ): IRoutePathResult => {
        const internalRoutePathId = HashHelper.getHashFromString(
            [
                routeId,
                suunta.suuvoimast,
                suunta.suusuunta,
            ].join('-'),
        ).toString();

        const routePathLinkResult:IRoutePathLinkResult[] | null
        = suunta.reitinlinkkisByReitunnusAndSuuvoimastAndSuusuunta ?
            suunta.reitinlinkkisByReitunnusAndSuuvoimastAndSuusuunta.nodes
            .map((routePathLinkNode: any) =>
                RoutePathLinkFactory.createRoutePathLink(routePathLinkNode)) : null;

        const coordinates = suunta.geojson ? JSON.parse(suunta.geojson).coordinates : null;
        const positions = coordinates
            ? coordinates.map((coor: [number, number]) => [coor[1], coor[0]]) : null;

        const routePath : IRoutePath = {
            routeId,
            positions,
            routePathLinks: routePathLinkResult ? routePathLinkResult.map(res => res.link) : [],
            internalId: internalRoutePathId,
            geoJson: suunta.geojson ? JSON.parse(suunta.geojson) : null,
            routePathName: suunta.suunimi,
            routePathNameSw: suunta.suunimir,
            direction: suunta.suusuunta,
            startTime: new Date(suunta.suuvoimast),
            endTime: new Date(suunta.suuvoimviimpvm),
            lastModified: new Date(suunta.suuviimpvm),
            modifiedBy: suunta.suukuka,
            visible: false,
            originFi: suunta.suulahpaik,
            originSw: suunta.suulahpaikr,
            destinationFi: suunta.suupaapaik,
            destinationSw: suunta.suupaapaikr,
            routePathShortName: suunta.suunimilyh,
            routePathShortNameSw: suunta.suunimilyhr,
            lineId: suunta.reittiByReitunnus ? suunta.reittiByReitunnus.lintunnus : null,
        };

        return {
            routePath,
            nodes: routePathLinkResult ? QueryParsingHelper.removeINodeDuplicates(
                routePathLinkResult
                    .reduce<INode[]>((flatList, node) => flatList.concat(node.nodes), []),
            ) : null,
        };
    }

    public static createNewRoutePath(lineId: string, routeId: string): IRoutePath {
        const routePath: IRoutePath = {
            lineId,
            routeId,
            internalId: '',
            routePathName: 'Uusi reitinsuunta',
            routePathNameSw: 'Ny ruttriktning',
            direction: '1',
            positions: [[0, 0]], // TODO: remove
            geoJson: null, // TODO: remove
            visible: true,
            startTime: new Date,
            endTime: new Date,
            lastModified: new Date,
            routePathLinks: [],
            originFi: '',
            originSw: '',
            destinationFi: '',
            destinationSw: '',
            routePathShortName: '',
            routePathShortNameSw: '',
            modifiedBy: '',
        };
        return routePath;
    }
}

export default RoutePathFactory;
