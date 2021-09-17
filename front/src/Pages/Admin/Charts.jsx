import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import Preloader from "../Assets/Preloader";
import classes from "../styles/Chart.module.css";

export const Charts = ({ questionStatistic, isnew, rightAnswer }) => {
    const [chartData, setChartData] = useState({
        pie: [],
        bar: []
    })

    useEffect(() => {
        setChartData({
            pie: calculatePieChart(),
            bar: calculateBarChart()
        }) 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isnew])

    const calculateBarChart = () => {
        const total = Array.isArray(questionStatistic) ? questionStatistic.length : 0;
        let rightAnswers = 0
        Array.isArray(questionStatistic) && questionStatistic.forEach((result) => {
            result.answer === rightAnswer && rightAnswers++
        })
        return ["Question", total, rightAnswers]
    }

    const calculatePieChart = () => {
        let countArray = []
        let countObject = {}
        Array.isArray(questionStatistic) && questionStatistic.forEach((result) => {
            countObject[result.answer] ? countObject[result.answer] += 1 : countObject[result.answer] = 1
        })
        Object.keys(countObject).forEach((key) => {
            countArray.push([String(key), countObject[key]])
        })
        return countArray
    }

    return <div>
        {questionStatistic && chartData.pie && chartData.bar &&
            <div className={classes.container}>
                <div className={classes.PieChart}>
                    <Chart
                        height={'100%'}
                        chartType="PieChart"
                        loader={<Preloader />}
                        data={[
                            ['Answers', 'All time'],
                            ...chartData.pie
                        ]}
                        options={{
                            title: "Answers"
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
                <div className={classes.BarChart}>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="BarChart"
                        loader={<Preloader />}
                        data={[
                            ['Question', 'Total', 'Right'],
                            [...chartData.bar]
                        ]}
                        options={{
                            title: 'Population of Largest U.S. Cities',
                            chartArea: { width: '50%' },
                            hAxis: {
                                title: 'Amount',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Question',
                            },
                        }}
                        // For tests
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
            </div>


        }
    </div>
}