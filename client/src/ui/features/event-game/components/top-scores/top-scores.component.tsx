import React, { useEffect, useState } from 'react';
import { getTopScoresByEvent } from '../../../../../data/explore/events.data.ts';
import './top-scores.style.scss';

export interface IScore {
    player: {
        firstName: string;
        lastName: string;
        image: string;
    };
    score: number;
    maxScore?: number;
}

interface TopScoresProps {
    eventId: string;
    allMatched: boolean;
    userRole: string;
    scores: IScore[];
}

const TopScores: React.FC<TopScoresProps> = ({ scores, userRole, allMatched, eventId }) => {


    const maskName = (name: string) => {
        return name.length > 1 ? name.slice(0, 1) + '*'.repeat(name.length - 1) : name;
    };

    return (
        <div className="top-scores">
            <h3>🏆 Top 3 Scores 🏆</h3>
            {scores.length > 0 ? (
                <ul>
                    {scores.slice(0, 3).map((score, index) => ( // Limit to top 3 scores
                        <li key={index} className="top-score-item">
                            <span className="player-name">
                                {userRole !== 'admin'
                                    ? `${maskName(score.player.firstName)}*${maskName(score.player.lastName)}`
                                    : `${score.player.firstName} ${score.player.lastName}`}
                            </span>
                            <span className="player-score">{score.maxScore}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No scores available yet.</p>
            )}
        </div>
    );
};

export default TopScores;
