import React from 'react';
import styles from '../../css/datePicker.module.css';

type PickerPopupProps = {
    isOpen: boolean;
    yearPickerComponent?: React.ReactNode;
    children: React.ReactNode;
};

const PickerPopup: React.FC<PickerPopupProps> = ({
    isOpen,
    yearPickerComponent,
    children
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.datePickerPopup}>
            <div className={styles.controls}>
            {yearPickerComponent}
            </div>
            {children}
        </div>
    );
};

export default PickerPopup;