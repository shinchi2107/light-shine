const ArrowRightIcon = ({ width, height, className = '', fill = 'white' }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16" fill={fill}>
            <path fillRule="evenodd" clipRule="evenodd" d="M14.2222 7.24925C12.326 7.24925 10.5978 5.58183 10.5978 3.75075V3H9.04222V3.75075C9.04222 5.08258 9.64733 6.33183 10.597 7.24925H1V8.75075H10.597C9.64733 9.66817 9.04222 10.9174 9.04222 12.2492V13H10.5978V12.2492C10.5978 10.4182 12.326 8.75075 14.2222 8.75075H15V7.24925H14.2222Z" fill={fill}></path>
        </svg>
    )
}

export default ArrowRightIcon;