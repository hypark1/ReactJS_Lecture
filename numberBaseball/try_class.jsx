import React, { PureComponent } from 'react';

class Try extends PureComponent {
    /*
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.counter !== nextState.counter) {
           return true;
        }
        return false;
    }
    */

    constructor(props) {
        super(props);
        const filtered = this.props.filter(() => {
            //
        })
        this.state = {
            result: filtered,
            try: this.props.try,
        }
    }

    render () {
        const { tryInfo } = this.props;
        return (
            <li>
                {tryInfo.try} : {tryInfo.result}
            </li>
        )
    }
}

export default Try;