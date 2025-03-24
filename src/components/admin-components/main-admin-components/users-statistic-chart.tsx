"use client";

import {useEffect, useState} from "react";


import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts";
import {ViralityChartItem} from "@/types/chartData.type";
import {getChartData} from "@/components/admin-components/main-admin-components/action";


const chartConfig = {
    registryCount: {
        label: "Новые регистрации",
        color: "hsl(var(--chart-1))",
    },
    testCount: {
        label: "Новые пройденные опросы",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;


export default function UserStatisticsChart() {

    const [chartData, setChartData] = useState<ViralityChartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const res = await getChartData();

            if (res.success) {
                setChartData(res.chartData);
            } else {
                console.error("Ошибка при получении данных:", res.message);
            }

            setIsLoading(false);
        };

        fetchData();
    }, []);


    return (
        <Card>
            <CardHeader>
                <CardTitle>График виральности опросов</CardTitle>
                <CardDescription>
                    Показывает отношения новых пользователей на платформе к пройденным опросам
                    новыми пользователями.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center items-center">Загрузка данных...</div>
                ) : (
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                top: 12,
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false}/>
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={true}
                                content={<ChartTooltipContent indicator="dot"/>}
                            />
                            <Area
                                dataKey="registryCount"
                                type="natural"
                                fill="var(--color-mobile)"
                                fillOpacity={0.4}
                                stroke="var(--color-mobile)"
                                stackId="a"
                            />
                            <Area
                                dataKey="testCount"
                                type="natural"
                                fill="var(--color-desktop)"
                                fillOpacity={0.4}
                                stroke="var(--color-desktop)"
                                stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>


        </Card>
    );
}
