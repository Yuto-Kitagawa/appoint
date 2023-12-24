import React,{useState, useRef, useEffect} from 'react';
import './Nav.css'; 
// import { useContainerHeight } from "./../useContainerHeight";

function Nav() {
    const [isNavActive, setNavActive] = useState(false);
    // const [navHeight, setNavHeight] = useState(0);

    function HBG() {
        setNavActive(!isNavActive);
        return ;
    }

    
    const ref = useRef<HTMLDivElement>(null);
    // カスタムフックで高さを取得
    // const containerHeight = useContainerHeight(ref);
    // setNavHeight(containerHeight);    
    
  return (
    <div className="" id='navWrapper'>
        <nav className='fixed top-0 left-0 w-[100vw] py-2 bg-white' ref={ref}>
            <div className="flex justify-around items-center">
                <div className="text-[2em] nav-title">
                    レモンサワー
                </div>
                <div className="hidden md:flex">
                    <div className="px-5">ホーム</div>
                    <div className="px-5">予約</div>
                    <div className="px-5">当レモンサワーについて</div>
                    <div className="px-5">お問い合わせ</div>
                </div>
            </div>
            <div className="flex md:hidden absolute top-[12px] right-[20px] w-[30px] h-[40px] z-[9999]">
                <div className={`relative h-full w-full nav-${isNavActive}`} onClick={() => HBG()}>
                    <div className="hbg"></div>
                </div>
            </div>
            <div className={`sp h-[100vh] w-[100vw] bg-[#25252555] backdrop-blur-xl text-white fixed top-0 left-0 ${isNavActive ? `block` : `hidden`}`}>
                <div className="relative h-full w-full flex flex-col justify-center items-center">
                    <div className="p-5">
                        <div className="w-fit text-[1.25em] my-5">ホーム</div>
                        <div className="w-fit text-[1.25em] my-5">予約</div>
                        <div className="w-fit text-[1.25em] my-5">当レモンサワーについて</div>
                        <div className="w-fit text-[1.25em] my-5">お問い合わせ</div>
                    </div>
                </div>
            </div>
        </nav>
    </div>

  );
}

export default Nav;
