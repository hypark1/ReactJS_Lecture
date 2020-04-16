const React = require('react');
const { Component } = React;

class Gugudan extends Component {
    state = {
        first:Math.ceil(Math.random() * 9),
        second:Math.ceil(Math.random() * 9),
        value: '',
        result: ''
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (parseInt(this.state.value) === this.state.first * this.state.second) {
            this.setState((prevState) => {
                return {
                    result: '정답' + prevState.value,
                    first: Math.ceil(Math.random() * 9),
                    secont: Math.ceil(Math.random() * 9),
                    value: ''
                }
            });
        } else {
            this.setState({
                result: '땡',
                value: ''
            });
        }
        this.input.focus();
    }

    onChange = function (e) {
        this.setState({ value: e.target.value })
    }.bind(this)

    input;

    onFocus = function (c) { 
        this.input = c; 
    }.bind(this);

    render() {
        return (
            <div>
                <p>
                    {this.state.first} 곱하기 {this.state.second} 는?
                </p>
                <form onSubmit={this.onSubmit}>
                    <input type="number"
                    ref={this.onFocus}
                    value={this.state.value}
                    onChange={this.onChange} />
                    <button type="submit">입력</button>
                </form>
                <p>{this.state.result}</p>
            </div>
        )
    }
}

module.exports = Gugudan;