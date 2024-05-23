import classes from './Dropdown.module.css'
import React from "react";
import DropdownToggler from "./DropdownToggler/DropdownToggler";

const Dropdown = ({ className, togglerClassName, isOpen, toggleDropdown, options, placeholder, value, onSelect }) => {


    let optionsClassName = classes['options-list']
    if (className) {
        optionsClassName = `${optionsClassName} ${className}`
    }

    const onClick = () => {
        toggleDropdown()
    }

    const onOptionSelect = (selectedOptionValue) => {
        onSelect(selectedOptionValue)
        toggleDropdown()
    }

    let currentOption = options.find(option => option.value === value)

    const renderedOptions = options.map((option) => {
        let optionClass = classes.option;

        if (option.value === value) {
            optionClass = `${classes.option} ${classes.selected}`
        }

        return (
            <li key={option.value} className={optionClass}>
                <div onClick={() => onOptionSelect(option.value)}>
                    {option.display}
                </div>
            </li>
        )
    })

    return (
        <div>
            <DropdownToggler
                className={togglerClassName}
                placeholder={placeholder}
                value={currentOption && currentOption.display}
                onClick={onClick}
            />
            {isOpen && (
                <ul className={optionsClassName}>
                    {renderedOptions}
                </ul>
            )}
        </div>
    )
}

export default Dropdown;