"use client"

import "react-circular-progressbar/dist/styles.css"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"

interface Props {
    percentage: number
}

export function ProgressBar({percentage}: Props) {
    return (
        <div className="flex justify-center p-10">
            <CircularProgressbar 
                styles={buildStyles({
                    pathColor: percentage >= 100 ? '#DC2626' : '#F59E0B',
                    trailColor: '#e1e1e1',
                    textColor: percentage >= 100 ? '#DC2626' : '#F59E0B',
                    textSize: 8
                })}
                text={`${percentage}% Gastado`}
                value={percentage} 
            />
        </div>
    )
}
