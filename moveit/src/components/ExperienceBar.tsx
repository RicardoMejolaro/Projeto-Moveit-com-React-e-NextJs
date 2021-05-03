import { useContext } from "react";

//Conxtexto global
import { ChallengesContext } from "../contexts/ChallengeContext";

import styles from "../styles/components/ExperienceBar.module.css";

export default function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext)

    const percentToNextLevel = Math.round((currentExperience * 100) / experienceToNextLevel) || 0

    return (
        <header className={styles.experienceBarContainer}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }}></div>
                <span
                    className={styles.currentExperience}
                    style={{ left: `${percentToNextLevel}%` }}
                >
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}