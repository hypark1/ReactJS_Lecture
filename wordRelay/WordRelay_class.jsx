const React = require('react');
const { Component } = React;

class WordReplay extends Component {
    state = {
        word: '박혜영',
        value: '',
        result: '',
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                word: this.state.value,
                value: '',
                result: '정답!'
            });
        } else {
            this.setState({
                value: '',
                result: '땡'
            });
        };
        this.input.focus();
    }

    input;

    onRefInput = (c) => {
        this.input = c;
    }

    onChange = (e) => {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <>
              <p>{this.state.word}</p> 
              <form onSubmit={this.onSubmit}>
                <input type="text"
                ref={this.onRefInput}
                value={this.state.value}
                onChange={this.onChange} />
                <button type="submit">확인!!!!!</button>
              </form> 
              <p>{this.state.result}</p>
            </>
        )
    }
}

module.exports = WordReplay;