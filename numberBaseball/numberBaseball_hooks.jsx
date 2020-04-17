import React, { useState, useRef } from 'react';
import Try from './try_hooks';

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

const NumberBaseball = () => {
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    const inputRef = useRef(null);


    const onSubmit = (e) => {
        e.preventDefault();
        if (value === answer.join('')) {
            setResult('홈런');
            setTries((prevTries) => {
                return [...prevTries.tries, { try: value, result: '홈런!' }]
            })
            alert('게임을 다시 시작합니다!');
            setValue('');
            setAnswer(getNumbers());
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                // 10번이상 틀렸을때
                setResult('10번 넘게 틀려서 실패! 답은' + answer.join(',') + '였습니다!');
                alert('게임을 다시 시작합니다!');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else {
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                       ball += 1; 
                    }
                }
                setTries([...tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다.` }])
                setValue('');
            }
        }
        inputRef.current.focus();
    }

    const onChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <p>{result}</p>
            <form onSubmit={onSubmit}>
            <input maxLength={4} value={value} onChange={onChange} />
            <button type="submit">확인</button>
            </form>
            <p>시도: {tries.length}</p>
            <ul>
                {tries.map((v, i) => {
                    return (
                        <Try key={(i+1) + `번째`} tryInfo={v}/>
                    )
                })}
            </ul>
        </>
    )
}

export default NumberBaseball;