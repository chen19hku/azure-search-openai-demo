import { Example } from "./Example";

import styles from "./Example.module.css";

const DEFAULT_EXAMPLES: string[] = ["公司可以与员工签订竞业禁止协议吗？", "公司可以要求员工加班吗？", "劳动争议如何申诉和解决？"];

const GPT4V_EXAMPLES: string[] = [
    "比较利率和GDP对金融市场的影响。",
    "预计未来五年S&P 500指数的走势如何？将其与过去的S&P 500表现进行比较。",
    "你能否找出石油价格和股市趋势之间的任何相关性？"
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
