import { RotatingLines } from 'react-loader-spinner'
import { useLoadingWheelHandler } from '../contexts/LoadingWheelContext';

const LoadingWheel = ({}) => {

    const { show } = useLoadingWheelHandler();

    return (
        <div className='align-center'>

            <RotatingLines visible={show}
                            height="96"
                            width="96"
                            strokeColor="var(--primary)"
                            strokeWidth="5"
                            animationDuration="1"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""/>
        </div>
    );
};

export default LoadingWheel;