const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
    const [word, setWord] = useState('박혜영');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === value[0]) {
            setWord(value);
            setValue('');
            setResult('정답!!');
        } else {
            setValue('');
            setResult('땡!!');
        }
        inputRef.current.focus();
    }

    return (
        <div>
            <p>
                {word}
            </p>
            <form onSubmit={onSubmit}>
                <input type="text"
                ref={inputRef}
                value={value}
                onChange={onChange} />
                <button type="submit">입력</button>
            </form>
            <p>{result}</p>
        </div>
    )
}

module.exports = WordRelay;