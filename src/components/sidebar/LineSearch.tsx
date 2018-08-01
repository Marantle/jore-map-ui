import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { LineStore } from '../../stores/lineStore';
import TransitToggleButtonBar from '../controls/TransitToggleButtonBar';
import LineItems from './LineItems';

interface ILineSearchProps {
    lineStore?: LineStore;
}

interface ILineSearchState {
    searchInput: string;
    lineItems: any;
}

@inject('lineStore')
@observer
class LineSearch extends React.Component<ILineSearchProps, ILineSearchState> {
    constructor(props: ILineSearchProps) {
        super(props);
        this.state = {
            lineItems: '',
            searchInput: '',
        };
    }

    public handleSearchInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            searchInput: event.currentTarget.value,
        });
    }

    public render(): any {
        return (
        <div className='routes-search'>
          <div className='routes-search-header'>
            <label className='routes-label'>
              Reitit<br/>
            </label>
            <div className='input-container'>
              <input
                placeholder='Hae reitti'
                className='input'
                type='text'
                value={this.state.searchInput}
                onChange={this.handleSearchInputChange}
              />
            </div>
            <TransitToggleButtonBar filters={this.props.lineStore!.filters || []} />
          </div>
          <LineItems
              filters={this.props.lineStore!.filters || []}
              searchInput={this.state.searchInput}
          />
        </div>
        );
    }
}

export default LineSearch;