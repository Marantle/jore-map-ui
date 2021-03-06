import React from 'react';
import { observer } from 'mobx-react';
import { IoMdMap } from 'react-icons/io';
import { RadioButton } from '../../controls';
import * as s from './mapLayersControl.scss';

interface INodeWindowProps {
}

interface IMapLayersControlState {
    selectedOption: option;
}

enum option {
    MAP = 'Kartta',
    SATELLITE = 'Satelliitti',
    TERRAIN = 'Maasto',
}

@observer
export default class MapLayersControl extends React.Component
<INodeWindowProps, IMapLayersControlState> {
    constructor (props: any) {
        super(props);
        this.state = {
            selectedOption: option.MAP,
        };
    }

    private toggleRadioButton = (option: option) => () => {
        this.setState({
            selectedOption: option,
        });
    }

    render() {
        return (
            <div className={s.mapLayerControlView}>
                <div className={s.mapLayerControlIcon}>
                    <IoMdMap />
                </div>
                <div className={s.mapLayersContainer}>
                    <RadioButton
                        onClick={this.toggleRadioButton(option.MAP)}
                        checked={this.state.selectedOption === option.MAP}
                        text={option.MAP}
                    />
                    <RadioButton
                        onClick={this.toggleRadioButton(option.SATELLITE)}
                        checked={this.state.selectedOption === option.SATELLITE}
                        text={option.SATELLITE}
                    />
                    <RadioButton
                        onClick={this.toggleRadioButton(option.TERRAIN)}
                        checked={this.state.selectedOption === option.TERRAIN}
                        text={option.TERRAIN}
                    />
                </div>
            </div>
        );
    }
}
