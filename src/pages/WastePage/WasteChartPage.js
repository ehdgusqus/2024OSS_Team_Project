import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { LeftOutlined } from '@ant-design/icons'; 

const WasteChartPage = () => {
    const { cityName } = useParams(); 
    const [cityData, setCityData] = useState(null);
    const navigate = useNavigate(); 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json'); // 데이터 파일 경로
                const data = await response.json();
                const cityInfo = data.data.find(item => item.CITY_JIDT_CD_NM === cityName);
                setCityData(cityInfo);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        };

        fetchData();
    }, [cityName]);

    const areaChartData = cityData
        ? {
            labels: ['생활폐기물 관리구역 면적'],
            datasets: [
                {
                    label: `${cityName}의 면적 데이터`,
                    data: [cityData.LIFEWT_MNG_AREA],
                    backgroundColor: ['rgba(75, 192, 192, 0.6)'],
                },
            ],
        }
        : null;

    const populationChartData = cityData
        ? {
            labels: ['생활폐기물 관리구역 인구'],
            datasets: [
                {
                    label: `${cityName}의 인구 데이터`,
                    data: [cityData.LIFEWT_MNG_POP],
                    backgroundColor: ['rgba(153, 102, 255, 0.6)'],
                },
            ],
        }
        : null;

    return (
        <div>
            <h1>{cityName}의 생활폐기물 관리구역 현황</h1>
            {areaChartData && (
                <div>
                    <h3>면적 데이터</h3>
                    <Bar data={areaChartData} />
                </div>
            )}
            {populationChartData && (
                <div>
                    <h3>인구 데이터</h3>
                    <Bar data={populationChartData} />
                </div>
            )}
            
            <div style={{ marginTop: '20px', cursor: 'pointer' }} onClick={() => navigate('/waste-management')}>
                <LeftOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                <span style={{ marginLeft: '5px' }}>차트 목록으로 돌아가기</span>
            </div>
        </div>
    );
};

export default WasteChartPage;
