import React, { useState, useEffect } from 'react';
import './event-game.screen.scss';
import backCard from '../../../../assets/images/events/playing_card_back_by_feivelyn_defaezm-fullview.jpg';
import MatchedEvent from "../components/matched-event/matched-event.component.tsx";
import { useParams } from "react-router-dom";
import {
    getEventCardsByEvent,
    getTopScoresByEvent,
    IEventCard,
    saveEventScore
} from "../../../../data/explore/events.data.ts";
import { api_url } from "../../../../utils/domain/back.ts";
import { useAuth } from "../../../../contexts/traveler-auth.context.tsx";
import {IScore} from "../components/top-scores/top-scores.component.tsx";

// Function to create duplicate cards
const createCardDeck = (cards: IEventCard[]): IEventCard[] => {
    const duplicates = cards.map(card => ({ ...card, _id: `${card._id}_duplicate` }));
    return [...cards, ...duplicates];
};

const MemoryGame: React.FC = () => {
    const { userRole } = useAuth();
    const { eventId } = useParams();
    const [originalCards, setOriginalCards] = useState<IEventCard[]>([]);
    const [cards, setCards] = useState<IEventCard[]>([]);
    const [turns, setTurns] = useState<number>(0);
    const [choiceOne, setChoiceOne] = useState<IEventCard | null>(null);
    const [choiceTwo, setChoiceTwo] = useState<IEventCard | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [matchedEvents, setMatchedEvents] = useState<IEventCard[]>([]);
    const [allMatched, setAllMatched] = useState<boolean>(false);
    const [score, setScore] = useState<number>(1000); // Initial score

    useEffect(() => {
        getEventCardsByEvent(eventId || '').then(result => {
            setOriginalCards(result.data);
            setCards(createCardDeck(result.data));
        });
    }, []);

    const [scores, setScores] = useState<IScore[]>([]);

    useEffect(() => {
        const fetchTopScores = async () => {
            try {
                const response = await getTopScoresByEvent(eventId);
                setScores(response.data);
                console.log('response', response.data);
            } catch (error) {
                console.error('Error fetching top scores:', error);
            }
        };

        fetchTopScores();
    }, [allMatched]);

    // Shuffle cards
    const shuffleCards = () => {
        const shuffledCards = createCardDeck(originalCards)
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, matched: false, flipped: false }));
        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);
        setMatchedEvents([]);
        setAllMatched(false);
        setScore(1000); // Reset score
    };

    const handleChoice = (card: IEventCard) => {
        if (!disabled && !card.flipped) {
            choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
            setCards(prevCards =>
                prevCards.map(c => (c._id === card._id ? { ...c, flipped: true } : c))
            );
        }
    };

    useEffect(() => {
        if (userRole === "admin") {
            // Set all cards to flipped and matched for admin
            const matchedCards = cards.map(card => ({ ...card, flipped: true, matched: true }));
            setCards(matchedCards);
            setMatchedEvents(originalCards); // Show all events as matched
            setAllMatched(false); // Prevent showing congrats message
            setDisabled(true); // Disable further interaction
        }
    }, [userRole, cards, originalCards]);

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.name === choiceTwo.name) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.name === choiceOne.name) {
                            return { ...card, matched: true };
                        }
                        return card;
                    });
                });
                setMatchedEvents(prev => [...prev, choiceOne]);
                setScore(prevScore => prevScore + 50); // Bonus for matching
                resetTurn();
            } else {
                setTimeout(() => {
                    setCards(prevCards =>
                        prevCards.map(card =>
                            card._id === choiceOne._id || card._id === choiceTwo._id
                                ? { ...card, flipped: false }
                                : card
                        )
                    );
                    setScore(prevScore => prevScore - 15); // Deduct for mismatch
                    resetTurn();
                }, 800);
            }
        }
    }, [choiceOne, choiceTwo]);

    useEffect(() => {
        if (matchedEvents.length !== 0 && matchedEvents.length === originalCards.length) {

            const fetchTopScores = async () => {
                try {
                    const response = await getTopScoresByEvent(eventId);
                    setScores(response.data);
                    console.log('response', response.data);
                } catch (error) {
                    console.error('Error fetching top scores:', error);
                }
            };
            setAllMatched(true);
            saveScore().then(response =>{
                fetchTopScores()
            });
        }
    }, [matchedEvents]);

    // Function to save the score when all cards are matched
    const saveScore = async () => {
        try {
            await saveEventScore(eventId || '', score);
            console.log('Score saved successfully!');
        } catch (error) {
            console.error('Error saving score:', error);
        }
    };

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prev => prev + 1);
        setScore(prevScore => prevScore - 10); // Deduct points per turn
        setDisabled(false);
    };

    useEffect(() => {
        shuffleCards();
    }, []);

    return (
        <div className="memory-game-container">
            <div className="memory-game">
                <h1>Memory Matching Game</h1>
                {
                    userRole!=='admin' &&
                    <button onClick={shuffleCards}>New Game</button>
                }
                <div className="card-grid">
                    {cards.map(card => (
                        <div
                            key={card._id}
                            className={`card ${card.flipped || card.matched ? 'flipped' : ''}`}
                            onClick={() => handleChoice(card)}
                        >
                            <img className="front" src={`${api_url}/${card.image}`} alt="card front" />
                            <img className="back" src={backCard} alt="card back" />
                        </div>
                    ))}
                </div>
                {
                    userRole !== 'admin' &&
                    <div className="score-container">
                        <h2>Score: {score}</h2>
                        <h2>Turns: {turns}</h2>
                    </div>
                }
            </div>
            {
                userRole &&
                <MatchedEvent
                    scores={scores}
                    userRole={userRole}
                    eventId={eventId as string}
                    matchedEvents={matchedEvents}
                    allMatched={allMatched && userRole !== "admin"} // Don't show congrats for admin
                />
            }
        </div>
    );
};

export default MemoryGame;
