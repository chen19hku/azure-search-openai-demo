import { useEffect, useState } from "react";
import { Stack, IDropdownOption, Dropdown, IDropdownProps } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";

import styles from "./VectorSettings.module.css";
import { HelpCallout } from "../../components/HelpCallout";
import { RetrievalMode, VectorFieldOptions } from "../../api";
import { toolTipText } from "../../i18n/tooltips.js";

interface Props {
    showImageOptions?: boolean;
    defaultRetrievalMode: RetrievalMode;
    updateRetrievalMode: (retrievalMode: RetrievalMode) => void;
    updateVectorFields: (options: VectorFieldOptions[]) => void;
}

export const VectorSettings = ({ updateRetrievalMode, updateVectorFields, showImageOptions, defaultRetrievalMode }: Props) => {
    const [retrievalMode, setRetrievalMode] = useState<RetrievalMode>(RetrievalMode.Hybrid);
    const [vectorFieldOption, setVectorFieldOption] = useState<VectorFieldOptions>(VectorFieldOptions.Both);

    const onRetrievalModeChange = (_ev: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<RetrievalMode> | undefined) => {
        setRetrievalMode(option?.data || RetrievalMode.Hybrid);
        updateRetrievalMode(option?.data || RetrievalMode.Hybrid);
    };

    const onVectorFieldsChange = (_ev: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<RetrievalMode> | undefined) => {
        setVectorFieldOption(option?.key as VectorFieldOptions);
        updateVectorFields([option?.key as VectorFieldOptions]);
    };

    useEffect(() => {
        showImageOptions
            ? updateVectorFields([VectorFieldOptions.Embedding, VectorFieldOptions.ImageEmbedding])
            : updateVectorFields([VectorFieldOptions.Embedding]);
    }, [showImageOptions]);

    const retrievalModeId = useId("retrievalMode");
    const retrievalModeFieldId = useId("retrievalModeField");
    const vectorFieldsId = useId("vectorFields");
    const vectorFieldsFieldId = useId("vectorFieldsField");

    return (
        <Stack className={styles.container} tokens={{ childrenGap: 10 }}>
            <Dropdown
                id={retrievalModeFieldId}
                label="检索模式"
                selectedKey={defaultRetrievalMode.toString()}
                options={[
                    { key: "hybrid", text: "向量 + 文本（混合）", selected: retrievalMode == RetrievalMode.Hybrid, data: RetrievalMode.Hybrid },
                    { key: "vectors", text: "向量", selected: retrievalMode == RetrievalMode.Vectors, data: RetrievalMode.Vectors },
                    { key: "text", text: "文本", selected: retrievalMode == RetrievalMode.Text, data: RetrievalMode.Text }
                ]}
                required
                onChange={onRetrievalModeChange}
                aria-labelledby={retrievalModeId}
                onRenderLabel={(props: IDropdownProps | undefined) => (
                    <HelpCallout labelId={retrievalModeId} fieldId={retrievalModeFieldId} helpText={toolTipText.retrievalMode} label={props?.label} />
                )}
            />

            {showImageOptions && [RetrievalMode.Vectors, RetrievalMode.Hybrid].includes(retrievalMode) && (
                <Dropdown
                    id={vectorFieldsFieldId}
                    label="向量字段（多查询向量搜索）"
                    options={[
                        { key: VectorFieldOptions.Embedding, text: "文本嵌入", selected: vectorFieldOption === VectorFieldOptions.Embedding },
                        { key: VectorFieldOptions.ImageEmbedding, text: "图像嵌入", selected: vectorFieldOption === VectorFieldOptions.ImageEmbedding },
                        { key: VectorFieldOptions.Both, text: "文本和图像嵌入", selected: vectorFieldOption === VectorFieldOptions.Both }
                    ]}
                    onChange={onVectorFieldsChange}
                    aria-labelledby={vectorFieldsId}
                    onRenderLabel={(props: IDropdownProps | undefined) => (
                        <HelpCallout labelId={vectorFieldsId} fieldId={vectorFieldsFieldId} helpText={toolTipText.vectorFields} label={props?.label} />
                    )}
                />
            )}
        </Stack>
    );
};
