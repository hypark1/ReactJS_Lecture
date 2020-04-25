import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'; 
import Ball from './ball';

function getWinNmbers() {
    console.log('getNumber');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1]
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNmbers(), []); // 마지막 배열에 값이 없으면 한번만 실행. 값 있으면 그 값이 변할때마다 실행.
    // useMemo : 복잡한 함수 결과값을 기억
    // useRef : 일반값을 기억
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    const runTimeouts = () => {
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevWinBalls) => {
                    return (
                        [...prevWinBalls, winNumbers[i]]
                    )
                })
            }, (i + 1) * 1000);
        };
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
    }

    useEffect(() => {
        // componentDidMount, componentDidUpdate 역할
        runTimeouts();
        return () => {
            //componentWillUnmount 역할
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        }
    }, [timeouts.current]);
    // 여기 배열에 넣은 값이 바뀔때 useEffect가 실행된다.
    // 배열이 빈배열이면 componentDidMount
    // 배열에 요소가 있으면 componentDidMount, componentDidUpdate 둘다 수행

    const onCLickRedo = useCallback(() => {
        setWinNumbers(getWinNmbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers])
    //useCallback : 함수를 기억.
    //              재렌더링되도 함수를 새로 생성하지않음.
    //              안에서 state를 처음 할당된값으로 계속 기억하기때문에
    //              바뀌어야하는 값을 마지막 배열에 넣어야한다.
    // 자식컴포넌트에 함수 넘겨줄때는 꼭 useCallback 해야한다.

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onCLickRedo}>한번더!</button>}
        </>
    )
}

export default Lotto;