import * as React from 'react';
import lineHelper from '../../util/lineHelper';
import TransitType from '../../enums/transitType';
import classNames from 'classnames';
import * as s from './transitToggleButton.scss';
import TransitTypeColorHelper from '../../util/transitTypeColorHelper';

interface ITransitToggleButtonProps {
    type: TransitType;
    toggled: boolean;
    toggleActivity(event: TransitType): void;
}

interface ITransitToggleButtonState {
    type: TransitType;
}

class TransitToggleButton extends React.Component
  <ITransitToggleButtonProps, ITransitToggleButtonState> {
    constructor(props: ITransitToggleButtonProps) {
        super(props);
    }

    public toggleActivity = () => {
        this.props.toggleActivity(this.props.type);
    }

    private getToggledButtonClass = (transitType: TransitType, isToggled: boolean) => {
        if (isToggled) {
            return TransitTypeColorHelper.getColorClass(transitType, true);
        }
        return s.toggled;
    }

    public render(): any {
        return (
            <button
                className={classNames(
                    s.toggle,
                    this.getToggledButtonClass(this.props.type, this.props.toggled),
                )}
                onClick={this.toggleActivity}
            >
                {lineHelper.getTransitIcon(this.props.type, true)}
            </button>
        );
    }
}

export default TransitToggleButton;
