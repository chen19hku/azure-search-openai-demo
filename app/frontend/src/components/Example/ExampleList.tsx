import { Example } from "./Example";

import styles from "./Example.module.css";

export type ExampleModel = {
    text: string;
    value: string;
};

const EXAMPLES: ExampleModel[] = [
    {
        text: "公司可以与员工签订竞业禁止协议吗？",
        value: "公司可以与员工签订竞业禁止协议吗？"
    },
    { text: "公司可以要求员工加班吗？", value: "公司可以要求员工加班吗？" },
    { text: "劳动争议如何申诉和解决？", value: "劳动争议如何申诉和解决？" }
];

interface Props {
    onExampleClicked: (value: string) => void;
}

export const ExampleList = ({ onExampleClicked }: Props) => {
    return (
        <ul className={styles.examplesNavList}>
            {EXAMPLES.map((x, i) => (
                <li key={i}>
                    <Example text={x.text} value={x.value} onClick={onExampleClicked} />
                </li>
            ))}
        </ul>
    );
};
