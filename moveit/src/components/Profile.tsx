import { useContext } from 'react';

//Contexto global
import { ChallengesContext } from '../contexts/ChallengeContext';

import styles from '../styles/components/Profile.module.css';

export default function Profile() {
    const { level } = useContext(ChallengesContext)

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/RicardoMejolaro.png" alt="Ricardo Mejolaro" />
            <div>
                <strong>Ricardo Mejolaro</strong>
                <p>
                    <img src="icons/level.svg" alt="Ícone de level" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}