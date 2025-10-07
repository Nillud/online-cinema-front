import { FC } from 'react'
import makeAnimated from 'react-select/animated'
import ReactSelect from 'react-select'
import { IOption, ISelect } from './select.interface'
import { OnChangeValue } from 'react-select'
import styles from './Select.module.scss'

const animatedComponents = makeAnimated()

const Select: FC<ISelect> = ({
    placeholder,
    error,
    isLoading,
    isMulti,
    options,
    field,
}) => {
    const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
        field.onChange(isMulti ? (newValue as IOption[]).map(item => item.value) : (newValue as IOption).value)
    }

    const getValue = () => {
        if (field.value) return isMulti
            ? options.filter(option => field.value.indexOf(option.value) >= 0)
            : options.find(option => option.value === field.value)
        else return isMulti ? [] : ''
    }

    return (
        <div className={styles.selectContainer}>
            <label>
                <span>{placeholder}</span>
                <ReactSelect
                    classNamePrefix={'custom-select'}
                    options={options}
                    value={getValue()}
                    onChange={onChange}
                    isMulti={isMulti}
                    isLoading={isLoading}
                    components={animatedComponents}
                />
                {error && <div className={styles.error}>{error.message}</div>}
            </label>
        </div>
    )
}

export default Select