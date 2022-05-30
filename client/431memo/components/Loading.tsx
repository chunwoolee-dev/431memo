import styled from "styled-components";

const ProgressSvg = styled.svg`
    animation: rotate 2s linear infinite;
    z-index: 2;
    width: 100%;
    height: 100%;

    @keyframes rotate {
        100% {
          transform: rotate(360deg);
        }
    }
`

interface Props {
    color ?: string
}

const Loading = ({color}:Props) => {
    const ProgressCircle = styled.circle`
        stroke: ${props => color ? color : props.theme.color};
        stroke-width:12%;
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;

        @keyframes dash {
            0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
            }
            50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
            }
            100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
            }
        }
    `

    return (
        <ProgressSvg viewBox="0 0 50 50">
            <ProgressCircle cx="25" cy="25" r="20" fill="none" stroke-width="5"></ProgressCircle>
        </ProgressSvg>
    )
}

export default Loading;