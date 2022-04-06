/// <reference types="react" />
import "../../css/BouncingBalls.css";
interface BouncingBallsProps {
    className?: string;
    color?: string;
    width?: number | string;
    height?: number | string;
    duration?: string;
}
declare const BouncingBalls: React.FC<BouncingBallsProps & React.HTMLProps<HTMLDivElement>>;
export default BouncingBalls;
//# sourceMappingURL=index.d.ts.map