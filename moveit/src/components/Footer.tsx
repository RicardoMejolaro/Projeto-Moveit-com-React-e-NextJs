import { useContext } from 'react';

//Contexto global
import { ChallengesContext } from '../contexts/ChallengeContext';

import styles from '../styles/components/Footer.module.css';

export default function Footer() {
    const { challengesCompleted, challengesEyesCompleted, challengesBodyCompleted } = useContext(ChallengesContext)

    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerChallengesContainer}>
                <div>
                    <span><img src={`icons/eye.svg`} alt="Icone de desafio" /> Desafios completos para os olhos: </span>
                    <span>{challengesEyesCompleted}</span>
                </div>
                <div>
                    <span><img src={`icons/body.svg`} alt="Icone de desafio" /> Desafios completos para o corpo: </span>
                    <span>{challengesBodyCompleted}</span>
                </div>
            </div>
            <div className={styles.footerAboutMeContainer}>
                <span>Desenvolvido com 💙️ por Ricardo Mejolaro.</span>
            </div>
        </div>

    )
}