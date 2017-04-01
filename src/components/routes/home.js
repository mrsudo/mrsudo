import React from 'react';
import BaseWindow from '../BaseWindow';

const ascii = [
    "         ,-.  ",
    "         |  \\ ",
    ",-----.  '.  '",
    "'-----'   |  |",
    "          |  |",
    ",-----.   |  |",
    "'-----'  .'  '",
    "         |  / ",
    "         `-'  "
];

export default class HomePage extends React.Component {
    render() {
        return (
            <BaseWindow title="home">
                <pre>{ascii.join("\n")}</pre>
            </BaseWindow>
        );
    }
}
