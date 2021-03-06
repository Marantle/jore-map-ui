import classnames from 'classnames';
import * as React from 'react';
import * as s from './multiTabTextarea.scss';

interface IMultiTabInputProps {
    tabs: string[];
}

interface IMultiTabInputState {
    selectedTabIndex: number;
}

class MultiTabTextarea extends React.Component<IMultiTabInputProps, IMultiTabInputState> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedTabIndex: 0,
        };

    }

    public onTabClick = (selectedTabIndex: number) => () => {
        this.setState({
            selectedTabIndex,
        });
    }

    public generateTabs = () => {
        return this.props.tabs.map((tab: string, index) => {
            const classname = classnames(s.tabButton, s.tabButtonPiece);
            return(
                <div
                    key={index}
                    className={(this.state.selectedTabIndex === index) ?
                    classnames(classname, s.opened) :
                    classname}
                    onClick={this.onTabClick(index)}
                >
                    <div className={s.tabLabel}>
                        {tab}
                    </div>
                </div>
            );
        });
    }

    public render(): any {
        return (
             <div className={s.tabsInputContainer}>
                <div className={s.flexRow}>
                    {this.generateTabs()}
                </div>
                <textarea
                    placeholder=''
                    className={s.tabsInput}
                />
            </div>
        );
    }
}

export default MultiTabTextarea;
