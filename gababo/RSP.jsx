import React, { Component } from 'react';

// 클래스 -> constructor -> render -> ref -> componentDidMount
// setState/props 바뀔때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
// 부모가 나를 없앴을 떄 -> componentWillUnmount -> 소멸

class RSP extends Component {
    state = {
        result: '',
        imgCoord: 0,
        score: 0,
    }

    interval;

    componentDidMount() {
        //처음 render()가 성공적으로 실행됐다면 실행됨. 재render때는 실행 안됨.
        // 여기에 비동기 요청을 많이 함.
        this.interval = setInterval(() => {
            console.log('test');
        }, 1000);
    }

    componentDidUpdate() {
        //재render될때 실행.
    }

    componentWillUnmount() {
        // 컴포넌트가 제거되기 직전
        // 비동기 요청 정리를 많이함.
        clearInterval(this.interval);
    }

    render () {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://data.ac-illust.com/data/thumbnails/4f/4f63b32d7d43ea2cb231c0724200cf8e_w.jpeg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={() => onCLickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={() => onCLickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={() => onCLickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;