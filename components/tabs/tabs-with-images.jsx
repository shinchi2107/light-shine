"use client";
import Image from "next/image";
import { useState } from "react";
const TabsWithImages = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(1);
    const [blink, setBlink] = useState(false);
    return (
        <div className="tabs-with-images">
            <div className="tabs-container max-w-[1000px] mx-auto relative">
                {tabs.map((tab) => (
                    <Tab key={tab.id} tab={tab} blink={blink} is_active={activeTab === tab.id} onClick={() => {
                        setActiveTab(tab.id);
                        setBlink(true);
                        setTimeout(() => {
                            setBlink(false);
                        }, 300);
                    }}/>
                ))}
            </div>

        </div>
    )
}

const Tab = ({ tab, is_active, onClick, blink }) => {
    
    return (
        <button className={`tab block w-full py-8 border-t border-[#ffffff17] first:border-t-0 cursor-pointer text-center ${is_active ? 'bg-[#151d1f]' : ''}`} onClick={onClick}>
            <h1 className="text-[50px] leading-[50px] font-[shippori_mincho] text-[var(--color-primary)] uppercase mb-4">{tab.title}</h1>
            {is_active && (
                <>
                    <div className="text-white text-[14px] font-[500]">
                        {tab.available} Dishes
                    </div>
                    <div className={`xl:block hidden tab-image-left absolute top-0 left-0 translate-x-[-80%] translate-y-[-12px] ${blink ? 'animate-blink' : ''}`}>
                        <Image src={tab.image_first} alt={tab.title} width={272} height={325} />
                    </div>
                    <div className={`xl:block hidden tab-image-right absolute top-0 right-0 translate-x-[80%] translate-y-[-12px] ${blink ? 'animate-blink' : ''}`}>
                        <Image src={tab.image_second} alt={tab.title} width={272} height={325} />
                    </div>
                </>
            )}
        </button>
    )
}

export default TabsWithImages;