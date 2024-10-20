import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

const WasteManagementDataApi = () => {
    const [wasteData, setWasteData] = useState([]);
    const navigate = useNavigate(); // navigate 훅 추가

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    '/sds/JsonApi.do?PID=NTN001&YEAR=2019&USRID=jamie123&KEY=KZMLYLCT2O96ZVGF9UD3F2IC7FY6G8CKVPJXAOJU7RXDO'
                );
                const jsonData = await response.json();

                setWasteData(jsonData.data);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>시도별 생활폐기물 관리구역 현황</h1>

            <table border="1">
                <thead>
                    <tr>
                        <th>시도</th>
                        <th>전체행정구역 면적(㎢)</th>
                        <th>전체행정구역 인구(명)</th>
                        <th>생활폐기물 관리구역 면적(㎢)</th>
                        <th>생활폐기물 관리구역 인구(명)</th>
                        <th>관리제외지역 면적(㎢)</th>
                        <th>차트 보기</th>
                    </tr>
                </thead>
                <tbody>
                    {wasteData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.CITY_JIDT_CD_NM}</td>
                            <td>{item.TOT_AREA}</td>
                            <td>{item.TOT_POP}</td>
                            <td>{item.LIFEWT_MNG_AREA}</td>
                            <td>{item.LIFEWT_MNG_POP}</td>
                            <td>{item.LIFEWT_MNGEXCPT_AREA}</td>
                            <td>
                                <button onClick={() => navigate(`/waste-chart/${item.CITY_JIDT_CD_NM}`)}>
                                    {item.CITY_JIDT_CD_NM} 차트보기
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WasteManagementDataApi;
