import React, { useEffect, useState } from 'react';
import './MultiSelect.css';

export default function MultiSelect({ value, onChange, options }) {

    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0);
    }, [isOpen])

    const clearOptions = () => {
        onChange([]);
    }

    const selectOption = (option) => {
        if (value.includes(option)) {
            onChange(value.filter(o => o !== option));
        } else {
            onChange([...value, option]);
        } 
    }

    const isOptionSelected = (option) => {
        return value.includes(option);
    }

    if (!options) return null;
    return (
        <div
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen(prev => !prev)} 
        tabIndex={3} 
        className='multi-select-container'
        >
            <span className='multi-select-value'>
                { value.map(v => (
                    <button 
                    key={v.role} 
                    onClick={e => {
                        e.stopPropagation();
                        selectOption(v);
                    }}
                    className='multi-select-option-badge'
                    >
                        {v.role}
                        <span className='multi-select-remove-btn'>
                            &times;
                        </span>
                    </button>
                )) }
            </span>
            <button 
            className='multi-select-clear-btn'
            onClick={e => {
                e.stopPropagation();
                clearOptions();
            }}
            >
                &times;
            </button>
            <div className='multi-select-divider'></div>
            <div className='multi-select-caret'></div>
            <ul className={`multi-select-options ${isOpen ? 'multi-select-show' : ''}`}>
                {
                    options.map((option, index) => (
                        <li 
                        onClick={e => {
                            e.stopPropagation();
                            selectOption(option);
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={option.role} 
                        value={option.role} 
                        className={`multi-select-option ${isOptionSelected(option) ? 'multi-select-selected' : ''} ${index === highlightedIndex ? 'multi-select-highlighted' : ''}`}
                        >
                            {option.role}
                        </li>
                    ))
                }
            </ul>
        </div>
    );

}