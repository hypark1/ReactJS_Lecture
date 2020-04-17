import React, { Component } from 'react';

class Try extends Component {
    render () {
        return (
            <>
                <li>
                    {this.props.tryInfo.try} : {this.props.tryInfo.result}
                </li>
            </>
        )
    }
}

export default Try;