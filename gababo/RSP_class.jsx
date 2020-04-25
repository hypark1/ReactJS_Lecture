import React, { Component } from 'react';

// 클래스 -> constructor -> render -> ref -> componentDidMount
// setState/props 바뀔때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
// 부모가 나를 없앴을 떄 -> componentWillUnmount -> 소멸

const rspCoords = {
    바위: '0',
    가위: '-230px',
    보: '-490px'
}

const scores = {
    바위: 1,
    가위: 0,
    보: -1
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
}

class RSP extends Component {
    state = {
        result: '',
        imgCoord: '0',
        score: 0,
    }

    interval;

    componentDidMount() {
        //처음 render()가 성공적으로 실행됐다면 실행됨. 재render때는 실행 안됨.
        // 여기에 비동기 요청을 많이 함.
        this.interval = setInterval(this.changeHand, 100);
    }

    componentDidUpdate() {
        //재render될때 실행.
    }

    componentWillUnmount() {
        // 컴포넌트가 제거되기 직전
        // 비동기 요청 정리를 많이함.
        clearInterval(this.interval);
    }

    changeHand = () => {
        const {imgCoord} = this.state;
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위
            })
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보
            })
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위
            })
        }
    }

    onCLickBtn = (choice) => (e) => {
        const {imgCoord} = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0){
            this.setState({
                result: '비겼습니다!',
            })
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '졌습니다!',
                    score: prevState.score - 1
                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다!',
                    score: prevState.score + 1,
                }
            })
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 1000)
    }

    render () {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://data.ac-illust.com/data/thumbnails/4f/4f63b32d7d43ea2cb231c0724200cf8e_w.jpeg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={this.onCLickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onCLickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onCLickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;