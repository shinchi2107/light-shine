"use client"
import { cn } from "@/src/lib/utils";
import { analytic_data } from "@/src/constants/analytic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "@/styles/stair-count.module.css";
const StairScrollCount = ({ className = '' }) => {

    return (
        <div className={cn(`stair-scroll-count ${className}`)}>
            <div className="stair-scroll-count__container flex flex-col lg:flex-row gap-2 lg:gap-6">
                {analytic_data.map((item, index) => (
                    <StairScrollCountItem
                        data={item}
                        className={`max-w-full lg:max-w-1/${analytic_data.length} flex-1`}
                        key={index}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
}

export default StairScrollCount;

const StairScrollCountItem = ({ data, className = '', index, duration = 500 }) => {
    const ref = useRef(null);
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (started || !ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
                setStarted(true);
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [started]);

    useEffect(() => {
        if (!started) return;
        const stepTime = duration / data.number;
        if (count < data.number) {
          const timer = setTimeout(() => setCount((c) => c + 1), stepTime);
          return () => clearTimeout(timer);
        }
      }, [started, count, data.number, duration]);
    
    return (
        <div className={`stair-scroll-count__item text-white ${className} ${styles.stair_scroll_item}`}
            style={{
                marginTop: `${index * 138}px`
            }}
        >
            <div className="stair-scroll-count__item__number font-[500] leading-[1] text-[82px] font-[shippori_mincho] mb-3" ref={ref}>
                <span className="stair-scroll-count__item__number__number">{count}K
                    <span className="text-[var(--color-primary)] font-[300]">+</span>
                </span>
            </div>
            <div className="stair-scroll-count__item__title text-[22px] font-[500]">
                <span className="stair-scroll-count__item__title__title">{data.title}</span>
            </div>
            <div className="stair-scroll-count__item__description border-t border-white/20 pt-4 mt-4 flex gap-6">
                <div className="stair-scroll-count__item__description__icon flex-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 110 110" fill="none">
                        <path d="M0 0H110V110C49.2487 110 0 60.7513 0 0Z" fill="#F2B612"></path>
                    </svg>
                </div>
                <span className="stair-scroll-count__item__description__description text-[16px] overflow-hidden text-ellipsis line-clamp-6">{data.description}</span>
            </div>
        </div>
    )
}