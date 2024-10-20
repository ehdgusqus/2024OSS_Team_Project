import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const WasteManagementDataApi = () => {
  const [wasteData, setWasteData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

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

  const cityData = wasteData.find((item) => item.CITY_JIDT_CD_NM === selectedCity);

  const areaChartData = cityData
    ? {
        labels: ['생활폐기물 관리구역 면적'],
        datasets: [
          {
            label: `${selectedCity}의 면적 데이터`,
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
            label: `${selectedCity}의 인구 데이터`,
            data: [cityData.LIFEWT_MNG_POP],
            backgroundColor: ['rgba(153, 102, 255, 0.6)'],
          },
        ],
      }
    : null;

  const chartOptionsPop = {
    scales: {
      y: {
        beginAtZero: true, 
        ticks: {
          stepSize: 10000, 
        },
        min: 0, 
        max: 10000000, 
      },
    },
  };

  const chartOptionsArea = {
    scales: {
      y: {
        beginAtZero: true, 
        ticks: {
          stepSize: 1000,
        },
        min: 0,
        max: 20000, 
      },
    },
  };
  

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
                <button onClick={() => setSelectedCity(item.CITY_JIDT_CD_NM)}>
                  {item.CITY_JIDT_CD_NM} 차트보기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCity && areaChartData && populationChartData && (
        <div style={{ width: '40%', margin: '50px auto' }}>
          <h2>{selectedCity}의 생활폐기물 관리구역 현황</h2>

          <div style={{ marginBottom: '50px' }}>
            <h3>면적 데이터</h3>
            <Bar data={areaChartData} options={chartOptionsArea} />
          </div>

          <div>
            <h3>인구 데이터</h3>
            <Bar data={populationChartData} options={chartOptionsPop} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteManagementDataApi;
