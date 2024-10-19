import React, { useState, useRef } from 'react';
import styles from '../../css/datePicker.module.css';
import PickerPopup from './PickerPopup';

interface DatePickerProps {
    handleDateChange: (date: Date | null) => void;
}


const DatePicker: React.FC<DatePickerProps> = ({handleDateChange}) => {
    const currentDate = new Date();
    const [datePickerState, setDatePickerState] = useState({
        selectedDate: currentDate,
        isDatePickerOpen: false,
        selectedYear: currentDate.getFullYear(),
        selectedMonth: currentDate.getMonth(),
        view: 'day' as 'year' | 'month' | 'day',
    });
    const dateInputRef = useRef<HTMLInputElement>(null);

    const handleDateClick = (date: Date) => {
        setDatePickerState(prevState => ({
            ...prevState,
            selectedDate: date,
            isDatePickerOpen: false,
        }));
        handleDateChange(date);
    };

    const handleIconClick = () => {
        setDatePickerState(prevState => ({
            ...prevState,
            isDatePickerOpen: !prevState.isDatePickerOpen,
        }));
    };

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}/${month}/${day}`;
    };

    const daysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const handleYearChange = (year: number) => {
        setDatePickerState(prevState => ({
            ...prevState,
            selectedYear: year,
            view: 'month',
        }));
    };

    const handleMonthChange = (month: number) => {
        setDatePickerState(prevState => ({
            ...prevState,
            selectedMonth: month,
            view: 'day',
        }));
    };

    const renderYearPicker = () => (
        <div className={`${styles.calendar} ${styles.year}`}>
            {[...Array(5)].map((_, i) => {
                const year = new Date().getFullYear() + i;
                return (
                    <div
                        key={year}
                        className={styles.date}
                        onClick={() => handleYearChange(year)}
                    >
                        {year}
                    </div>
                );
            })}
        </div>
    );

    const renderMonthPicker = () => (
        <div className={`${styles.calendar} ${styles.month}`}>
            {Array.from({ length: 12 }, (_, i) => (
                <div
                    key={i}
                    className={styles.date}
                    onClick={() => handleMonthChange(i)}
                >
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </div>
            ))}
        </div>
    );

    const renderDatePicker = () => (
        <div className={styles.calendar}>
            {[...Array(daysInMonth(datePickerState.selectedYear, datePickerState.selectedMonth))].map((_, i) => {
                const date = new Date(datePickerState.selectedYear, datePickerState.selectedMonth, i + 1);
                return (
                    <div
                        key={i}
                        className={styles.date}
                        onClick={() => handleDateClick(date)}
                    >
                        {i + 1}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className={styles.cyberpunkDatePicker}>
            <div className={styles.inputWrapper}>
                <label htmlFor="datePicker" className={styles.label}>Select Date</label>
                <div className={styles.dateDisplay}>
                    <input
                        type="text"
                        id="datePicker"
                        ref={dateInputRef}
                        value={formatDate(datePickerState.selectedDate)}
                        readOnly
                        className={styles.dateInput}
                        onClick={handleIconClick}
                    />
                    <svg className={styles.calendarIcon} viewBox="0 0 24 24" width="24" height="24" onClick={handleIconClick}>
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm-2 2H9v2H7V5H4v4h16V5h-3v2h-2V5zm5 6H4v8h16v-8z" fill="currentColor" />
                    </svg>
                </div>
                <PickerPopup isOpen={datePickerState.isDatePickerOpen}
                    yearPickerComponent={
                        <>
                            <span onClick={() => setDatePickerState(prevState => ({ ...prevState, view: 'year' }))}>{datePickerState.selectedYear}</span>
                            {datePickerState.view !== 'year' && (
                                <span onClick={() => setDatePickerState(prevState => ({ ...prevState, view: 'month' }))}>
                                    {new Date(datePickerState.selectedYear, datePickerState.selectedMonth).toLocaleString('default', { month: 'long' })}
                                </span>
                            )}
                        </>
                    }
                >
                    {datePickerState.view === 'year' && renderYearPicker()}
                    {datePickerState.view === 'month' && renderMonthPicker()}
                    {datePickerState.view === 'day' && renderDatePicker()}
                </PickerPopup>
            </div>
        </div>
    );
};

export default DatePicker;