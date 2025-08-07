import { ChangeEvent, FC } from "react"
import styles from './Search.module.scss'
import { useSearch } from "./useSearch"
import { SearchList } from "./SearchList/SearchList"
import SearchField from "@/components/ui/search-field/SearchField"

export const Search: FC = () => {
    const { isSuccess, data, handleSearch, searchTerm } = useSearch()

    return (
        <div className={styles.wrapper}>
            <SearchField
                searchTerm={searchTerm}
                handleSearch={handleSearch}
            />
            {isSuccess && <SearchList movies={data || []} />}
        </div>
    )
}
