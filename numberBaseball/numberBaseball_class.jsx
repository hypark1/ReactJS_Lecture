import React, { Component } from 'react';
import Try from './try_class';

function getNumbers () {
    // 숫제 네개를 겹치지않고 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    state = {
        value: '',
        result: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.value === this.state.answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '홈런',
                    tries: [...prevState.tries, { try: this.state.value, result: '홈런!' }]
                } 
            });
             alert('게임을 다시 시작합니다!');
             this.setState({
                 value: '',
                 answer: getNumbers(),
                 tries: [],
             });
        } else {
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) {
                // 10번이상 틀렸을때
                this.setState({
                    result: '10번 넘게 틀려서 실패! 답은' + this.state.answer.join(',') + '였습니다!'
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            } else {
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    } else if (this.state.answer.includes(answerArray[i])) {
                       ball += 1; 
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...this.state.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼 입니다.` }],
                        value: '',
                    }
                })
            }
        }
    }

    onChange = (e) => {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <>
              <p>{this.state.result}</p>
              <form onSubmit={this.onSubmit}>
                <input maxLength={4} value={this.state.value} onChange={this.onChange} />
                <button type="submit">확인</button>
              </form>
              <p>시도: {this.state.tries.length}</p>
              <ul>
                  {this.state.tries.map((v, i) => {
                      return (
                          <Try key={(i+1) + `번째`} tryInfo={v}/>
                      )
                  })}
              </ul>
            </>
        )
    }
}

export default NumberBaseball;