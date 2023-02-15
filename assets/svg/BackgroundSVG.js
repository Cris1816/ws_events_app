import Svg, { Path } from "react-native-svg"

const Background = (props) => 
(
    <Svg width={props.width} height={props.height} xmlns="http://www.w3.org/2000/svg">
        <Path fill="#181D36" d="M0 0h450v900H0z" />
        <Path
        d="m0 435 37.5 11.2C75 457.3 150 479.7 225 473.2s150-41.9 187.5-59.5L450 396V0H0Z"
        fill="#d6d6d6"
        />
        <Path
        d="m0 368 37.5.8c37.5.9 112.5 2.5 187.5 9.9 75 7.3 150 20.3 187.5 26.8L450 412V0H0Z"
        fill="#e3a4b4"
        />
        <Path
        d="m0 241 37.5 6.3c37.5 6.4 112.5 19 187.5 26.5s150 9.9 187.5 11L450 286V0H0Z"
        fill="#e76e94"
        />
        <Path
        d="m0 89 37.5 4.5C75 98 150 107 225 110.8c75 3.9 150 2.5 187.5 1.9l37.5-.7V0H0Z"
        fill="#e51576"
        />
    </Svg>
)

export default Background;