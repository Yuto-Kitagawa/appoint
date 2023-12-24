import React, {HtmlHTMLAttributes, ObjectHTMLAttributes, ReactHTMLElement, TableHTMLAttributes, useState} from 'react';
import Nav from './Components/Nav';
import { Link } from "react-router-dom" // 追加
import { log } from 'console';

function Top() {
  
    const d = new Date();
    const [year, setYear] = useState<number>(d.getFullYear());
    const [month, setMonth] = useState<number>(d.getMonth() + 1);
    const [day, setDay] = useState<number>(d.getDate());

    const [isModalActive,setModalActive] = useState<boolean>(false);
    const [isConfirm,setConfirm] = useState<boolean>(false);

    const [modalDay,setModalDay] = useState<string>();

    // 前月
    const pre = ()=>{
        // JavaScriptのDateオブジェクトが月を0から始まるインデックスで扱うため、1月は0、2月は1と表現するから月から1引く
        let date = new Date(year, month - 1, day);
        date.setMonth(date.getMonth() - 1);
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);
        setDay(date.getDate());
    }

    // 翌月
    const next = ()=>{
        let date = new Date(year, month - 1, day);
        date.setMonth(date.getMonth() + 1);
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);
        setDay(date.getDate());
    }

    // 月初めの曜日
    let date = new Date(year, month - 1, 1);
    let w = date.getDay();

    // 月末の日付
    date.setMonth(date.getMonth() + 1);   // 1ヶ月加えて翌月にします
    date.setDate(0);                      // 日付に0を設定し、該当月のの0日（つまり、前月末）にします
    let endDay= date.getDate();

    // Modalを表示させる
    // TODO: 日付を入力のvalueに反映する
    const ModalActive = (e:React.MouseEvent<HTMLTableCellElement>) => {   
        let selected_day = e.currentTarget.dataset.value;
        setModalDay(selected_day);
        setModalActive(true); 
        return;
    }

    const reserve = async () => {
        await fetch("http://localhost:3001/", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "hoge",
                email: "info@yutons.com"
            }),
        })
        .then ((response) => console.log(response))
        .then((data) => console.log(data));
    }

    function confirm() {
        setConfirm(true);
        return;
    }

    return (
        <div className="">
            <div className="">
                <Nav/>
            </div>
            
            <div className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#00000088] backdrop-blur-xl flex justify-center items-center ${isModalActive ? `block` : `hidden`}`} onClick={() => {setConfirm(false);setModalActive(false)}}></div>

            <div className={`fixed w-5/6 md:w-3/4 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-[white] rounded-[10px] p-4 z-[999] ${isModalActive ? `block` : `hidden`}`}>
                <div className="flex justify-between items-center border-b-2 border-[#00000088]">
                    <div className="pb-3 ps-5  text-[2em] ">予約</div>
                    <div className="me-5 cursor-pointer" onClick={() => {setConfirm(false);setModalActive(false)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                </div>

                <div className="md:flex pt-8 flex justify-center">
                    <div className={`w-full md:w-1/2 ${isConfirm && 'hidden'}  `}>

                        <div className="flex items-center my-3">
                            <div className='whitespace-nowrap px-3 w-1/3' id='modalDay'>日付</div>
                            <input type="date" className='border-2 p-2 w-2/3' value={modalDay}/>
                        </div>

                        <div className="flex items-center my-3">
                            <div className='whitespace-nowrap px-3 w-1/3 '>時間</div>
                            <input type="time" className='border-2 p-2 w-2/3'/>
                        </div>

                        <div className="flex items-center my-3">
                            <div className='whitespace-nowrap px-3 w-1/3 '>
                                <div className="">名前</div>
                                <div className="text-[.7em]">(空白なし)</div>
                            </div>
                            <input type="text" className='border-2 p-2 w-2/3'/>
                        </div>

                        <div className="flex items-center my-3">
                            <div className='whitespace-nowrap px-3 w-1/3 '>
                                <div className="">フリガナ</div>
                                <div className="text-[.7em]">(空白なし)</div>
                            </div>
                            <input type="text" className='border-2 p-2 w-2/3'/>
                        </div>

                        <div className="flex items-center my-3">
                            <div className='whitespace-nowrap px-3 w-1/3 '>性別</div>
                            <div className="flex justify-around w-2/3">
                                <div className="w-1/2 text-center mx-1">
                                    <input type="radio" name='gender' id='otoko' className='hidden peer'/>
                                    <label htmlFor="otoko" className='border-2 block w-full py-1 peer-checked:bg-[#afc7ff]'>男</label>
                                </div>
                                <div className="w-1/2 text-center mx-1">
                                    <input type="radio" name='gender' id='onna' className='hidden peer'/>
                                    <label htmlFor="onna" className='border-2 block w-full py-1 peer-checked:bg-[#fcc1b7]'>女</label>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center my-3">
                            <div className='whitespace-nowrap px-3 w-1/3 '>
                                <div className="">電話番号</div>
                                <div className="text-[.7em]">(ハイフンなし)</div>
                            </div>
                            <input type="tel" className='border-2 p-2 w-2/3'/>
                        </div>
                        
                        <div className="flex items-center my-3">
                            <div className='whitespace-nowrap px-3 w-1/3 '>メール</div>
                            <input type="email" className='border-2 p-2 w-2/3'/>
                        </div>

                        <div className="flex justify-center my-5">
                            <button onClick={() => confirm()} className='border-2 border-[#DBD0A2] py-2 px-10 hover:bg-[#DBD0A2] hover:border-[white] transition-[.5s] rounded-[5px]'>
                                確認
                            </button>
                        </div>
                    </div>

                    <div className={`w-full md:w-1/2 ${!isConfirm && 'hidden'} `}>

                        <div className="flex items-center my-3">
                            <div className='whitespace-nowrap px-3 w-1/3' id='modalDay'>日付</div>
                            {modalDay}
                        </div>

                        <div className="flex items-center my-3">
                            <div className='whitespace-nowrap px-3 w-1/3 '>時間</div>
                            <div className="">
                                9:00
                            </div>
                        </div>

                        <div className="flex items-center my-3">
                            <div className='whitespace-nowrap px-3 w-1/3 '>
                                <div className="">名前</div>
                                <div className="text-[.7em]">(空白なし)</div>
                            </div>
                            <div className="">
                                北川悠斗
                            </div>
                        </div>

                        <div className="flex items-center my-3">
                            <div className='whitespace-nowrap px-3 w-1/3 '>
                                <div className="">フリガナ</div>
                                <div className="text-[.7em]">(空白なし)</div>
                            </div>
                            <div className="">
                                キタガワユウト
                            </div>
                        </div>

                        <div className="flex items-center my-3">
                            <div className='whitespace-nowrap px-3 w-1/3 '>性別</div>
                            <div className="mx-1">
                                男
                            </div>
                        </div>

                        <div className="flex items-center my-3">
                            <div className='whitespace-nowrap px-3 w-1/3 '>
                                <div className="">電話番号</div>
                                <div className="text-[.7em]">(ハイフンなし)</div>
                            </div>
                            <div className="">
                                07028382961
                            </div>
                        </div>
                        
                        <div className="flex items-center my-3">
                            <div className='whitespace-nowrap px-3 w-1/3 '>メール</div>
                            <div className="">info@yutons.com</div>
                        </div>

                        <div className="flex justify-center my-5">
                            <button onClick={() => {reserve()}} className='border-2 border-[#DBD0A2] py-2 px-10 hover:bg-[#DBD0A2] hover:border-[white] transition-[.5s] rounded-[5px]'>
                                予約
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <section className={`h-[100vh] bg-[#DBD0A2] pt-20`} >
                <div className={`border-b-2 border-[#958E6E] text-[2em] bg-[#DBD0A2] w-fit m-auto`}>空き状況</div>
                <div className="flex flex-wrap justify-center">
                    <div className="w-full md:w-1/2 xl:w-2/3 p-5">
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                            <div
                                className="bg-gray-200 text-gray-700 uppercase leading-normal px-6 py-3 flex justify-between items-center">
                                <div className="p-2 cursor-pointer hover:font-bold" onClick={()=>{pre()}}>←前月</div>
                                <div className="p-2 text-[1.5em] font-bold">{year}年{month}月</div>
                                <div className="p-2 cursor-pointer hover:font-bold" onClick={()=>{next()}}>翌月→</div>
                            </div>
                            <div className="py-6">
                                <table className="w-full table-auto">
                                    <thead className="">
                                        <tr className="">
                                        <th className="px-2 py-2 text-[red]">日</th>
                                        <th className="px-2 py-2">月</th>
                                        <th className="px-2 py-2">火</th>
                                        <th className="px-2 py-2">水</th>
                                        <th className="px-2 py-2">木</th>
                                        <th className="px-2 py-2">金</th>
                                        <th className="px-2 py-2 text-[blue]">土</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {(() => {
                                        let daylist = [];
                                        const weeklist = [];
                                        let youbi = w;
                                        let day = 1;

                                        // 前月文を空白で
                                        for (let i = 0; i < youbi; i++) {
                                            daylist.push(<td className="border px-3 py-2"></td>)
                                        }

                                        while(day <= endDay){
                                            for (let i = youbi; i <= 6; i++) {
                                                if(day > endDay) {
                                                    daylist.push(<td className="border px-3 py-2"></td>)
                                                }else{
                                                    daylist.push(
                                                    <td className="border px-3 py-1 cursor-pointer hover:bg-[yellow]" data-value={year + `-` + ("0" + month).slice(-2) + `-` + ("0" + day).slice(-2)} onClick={ModalActive}>
                                                        <div className="text-lg py-1">{day}</div>
                                                        <div className="">🍋</div>
                                                    </td>
                                                    )
                                                }
                                                day++;
                                            }
                                            weeklist.push(<tr>{daylist}</tr>);
                                            youbi = 0;
                                            daylist = [];
                                        }
                                        return <>{weeklist}</>;
                                        })()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="" style={{height:"200vh",background:"blue"}}></div>
        </div>
    );
}

export default Top;
