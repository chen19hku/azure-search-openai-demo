import { Example } from "./Example";

import styles from "./Example.module.css";

const DEFAULT_EXAMPLES: string[] = [
    "What are the conditions, requirements, and procedures for transferring a listing from GEM to the Main Board?",
    "How are casual vacancies in the Listing Review Committee filled, and what are the eligibility criteria for the replacement member? ",
    "What are the approved methods for bringing securities to listing, aside from the initial public offering?"
];

const GPT4V_EXAMPLES: string[] = [
    "What are the conditions, requirements, and procedures for transferring a listing from GEM to the Main Board?",
    "How are casual vacancies in the Listing Review Committee filled, and what are the eligibility criteria for the replacement member? ",
    "What are the approved methods for bringing securities to listing, aside from the initial public offering?"
];

interface Props {
    onExampleClicked: (value: string) => void;
    useGPT4V?: boolean;
}

export const ExampleList = ({ onExampleClicked, useGPT4V }: Props) => {
    return (
        <ul className={styles.examplesNavList}>
            {(useGPT4V ? GPT4V_EXAMPLES : DEFAULT_EXAMPLES).map((question, i) => (
                <li key={i}>
                    <Example text={question} value={question} onClick={onExampleClicked} />
                </li>
            ))}
        </ul>
    );
};
