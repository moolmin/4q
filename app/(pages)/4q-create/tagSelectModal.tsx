import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'antd';
import styles from './tagSelectModal.module.css';

interface TagSelectorProps {
    selectedTags: string[];  // Pass selected tags from parent
    onSelect: (selectedTags: string[]) => void;
}

export default function TagSelector({ selectedTags, onSelect }: TagSelectorProps) {
    const [localSelectedTags, setLocalSelectedTags] = useState<string[]>(selectedTags);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const MAX_TAGS = 3;

    const moodTags = ['고전', '귀여움', '꽃무늬', '네온', '도시', '시골', '밝은', '어두운', '빈티지', '심플', '럭셔리', '자연친화적'];
    const colorTags = ['블루', '그린', '레드', '옐로우', '퍼플', '블랙', '화이트', '흑백'];
    const seasonTags = ['봄', '여름', '가을', '겨울'];

    useEffect(() => {
        setLocalSelectedTags(selectedTags);  // Sync local state with prop
    }, [selectedTags]);

    const handleTagClick = (tag: string) => {
        if (localSelectedTags.includes(tag)) {
            setLocalSelectedTags(localSelectedTags.filter(t => t !== tag));
            setShowAlert(false); // Hide alert when a tag is deselected
        } else if (localSelectedTags.length < MAX_TAGS) {
            setLocalSelectedTags([...localSelectedTags, tag]);
            setShowAlert(false); // Hide alert when a tag is added within the limit
        } else {
            setShowAlert(true); // Show alert when the tag limit is reached
        }
    };

    const handleConfirm = () => {
        onSelect(localSelectedTags);
    };

    return (
        <div className={styles.container}>
            {showAlert && (
                <Alert message={`태그는 최대 ${MAX_TAGS}개까지 선택 가능합니다.`} type="warning" showIcon banner/>
            )}
            <div className={styles.tagList}>
                <div className={styles.tagListTitle}>분위기</div>
                <div className={styles.tagItemContainer}>
                    {moodTags.map(tag => (
                        <div
                            key={tag}
                            className={`${styles.tagItem} ${localSelectedTags.includes(tag) ? styles.selected : ''}`}
                            onClick={() => handleTagClick(tag)}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.tagList}>
                <div className={styles.tagListTitle}>색상</div>
                <div className={styles.tagItemContainer}>
                    {colorTags.map(tag => (
                        <div
                            key={tag}
                            className={`${styles.tagItem} ${localSelectedTags.includes(tag) ? styles.selected : ''}`}
                            onClick={() => handleTagClick(tag)}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.tagList}>
                <div className={styles.tagListTitle}>계절</div>
                <div className={styles.tagItemContainer}>
                    {seasonTags.map(tag => (
                        <div
                            key={tag}
                            className={`${styles.tagItem} ${localSelectedTags.includes(tag) ? styles.selected : ''}`}
                            onClick={() => handleTagClick(tag)}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.btnContainer}>
                <Button type="primary" onClick={handleConfirm} size="middle" className={styles.subBtn}>
                    선택 완료
                </Button>
            </div>
        </div>
    );
}
