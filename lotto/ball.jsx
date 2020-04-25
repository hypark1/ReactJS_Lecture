import React, { memo } from 'react';

/*
class Ball extends PureComponent {
    render() {
        const { number } = this.props;
        let background;
        if (number <= 10) {
            background = 'red';
        } else if (number <= 20) {
            background = 'orange';
        } else if (number <= 30) {
            background = 'yellow';
        } else if (number <= 40) {
            background = 'blue';
        } else {
            background = 'green';
        }
        return (
            <div className="ball" style={{ background }}>{number}</div>
        )
    }
}
*/

// 위에처럼 state를 안쓰면 아래처럼 변경할 수 있다. hooks아님. 함수컴포넌트.

const Ball = memo(({ number }) => {
    let background;
    if (number <= 10) {
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'yellow';
    } else if (number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }
    return (
        <div className="ball" style={{ background }}>{number}</div>
    )
})

export default Ball;