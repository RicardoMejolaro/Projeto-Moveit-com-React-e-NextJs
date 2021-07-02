import Head from 'next/head';
import { GetServerSideProps } from 'next';

//Contexto global
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengeContext';

//Estilos
import styles from "../styles/pages/Home.module.css";

//Componentes
import ExperienceBar from '../components/ExperienceBar';
import Profile from "../components/Profile";
import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import ChallengeBox from '../components/ChallengeBox';
import Footer from '../components/Footer';

interface HomeProps {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    challengesEyesCompleted: number,
    challengesBodyCompleted: number
}

export default function Home(props: HomeProps) {
    return (
        <ChallengesProvider
            level={props.level}
            currentExperience={props.currentExperience}
            challengesCompleted={props.challengesCompleted}
            challengesEyesCompleted={props.challengesEyesCompleted}
            challengesBodyCompleted={props.challengesBodyCompleted}
        >
            <div className={styles.container}>
                <Head>
                    <title>Início | Move.it</title>
                </Head>
                <ExperienceBar />

                <CountdownProvider>
                    <section>
                        <div>
                            <Profile />
                            <CompletedChallenges />
                            <Countdown />
                        </div>
                        <div>
                            <ChallengeBox />
                        </div>
                    </section>
                    <Footer/>
                </CountdownProvider>
            </div>
        </ChallengesProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { level, currentExperience, challengesCompleted, challengesEyesCompleted, challengesBodyCompleted} = ctx.req.cookies

    return {
        props: {
            level: Number(level) || 1,
            currentExperience: Number(currentExperience) || 0,
            challengesCompleted: Number(challengesCompleted) || 0,
            challengesEyesCompleted: Number(challengesEyesCompleted) || 0,
            challengesBodyCompleted: Number(challengesBodyCompleted) || 0,
        }
    }
}