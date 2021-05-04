import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

//Dados de desafios
import challenges from '../data/challenges.json';
import LevelUpModal from '../components/LevelUpModal';

//Tipagem de desafios
interface Challenge {
    type: 'body' | 'eye',
    description: string,
    amount: number,
}

//Tipagem dos dados do contexto
interface ChallengesContextData {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    challengesEyesCompleted: number,
    challengesBodyCompleted: number,
    activeChallenge: Challenge,
    experienceToNextLevel: number,
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    closeLevelUpModal: () => void
}

interface ChallengesProviderProps {
    children: ReactNode,
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    challengesEyesCompleted: number,
    challengesBodyCompleted: number,
}

//Criação do contexto global
export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
    children,
    ...rest
}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
    const [challengesEyesCompleted, setChallengesEyesCompleted] = useState(rest.challengesEyesCompleted ?? 0)
    const [challengesBodyCompleted, setChallengesBodyCompleted] = useState(rest.challengesBodyCompleted ?? 0)

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
        Cookies.set('challengesEyesCompleted', String(challengesEyesCompleted))
        Cookies.set('challengesBodyCompleted', String(challengesBodyCompleted))
    }, [level, currentExperience, challengesCompleted, challengesEyesCompleted, challengesBodyCompleted])

    const levelUp = () => {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    const closeLevelUpModal = () => {
        setIsLevelUpModalOpen(false)
    }

    const startNewChallenge = () => {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio!', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    const resetChallenge = () => {
        setActiveChallenge(null)
    }

    const completeChallenge = () => {
        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge
        let finalExperience = currentExperience + amount

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)

        if (activeChallenge) {
            if(activeChallenge.type == "eye") {
                setChallengesEyesCompleted(challengesEyesCompleted + 1)
            } else {
                setChallengesBodyCompleted(challengesBodyCompleted + 1)
            }
        }
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                challengesEyesCompleted,
                challengesBodyCompleted,
                activeChallenge,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,                
                closeLevelUpModal
            }}
        >
            {children}

            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}