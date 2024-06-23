function Tile({className, value, onClick}) {
    return (
        <div onClick={onClick} className={`tile ${className} x-hover`}>{value}</div>
    );
}

export default Tile;