export const TickMark = ({i, pos, min, range}) => {

    const leftPercent = ((pos - min) / range) * 100;
    return (
        <div
            key={i}
            style={{ position: 'absolute', left: `${leftPercent}%`, transform: 'translateX(-50%)' }}
        >
            {/* Tick mark */}
            <div
            style={{
                height: '10px',
                width: '1px',
                backgroundColor: 'black',
                marginBottom: '2px',
            }}
            />
            {/* Number above, rotated vertically */}
            <div
            style={{
                fontSize: '12px',
                position: 'absolute',
                top: '-20px',
                left:'8px',
                transform: 'rotate(-90deg)',
                transformOrigin: 'left bottom',
                whiteSpace: 'nowrap'
            }}
            >
            {pos}
            </div>
        </div>
    );
}