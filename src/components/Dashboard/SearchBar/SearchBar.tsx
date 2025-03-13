import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

const SearchBar = () => {
    return (
        <div className="flex items-center w-full max-w-md relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-10 w-full" />
        </div>
    )
}

export default SearchBar
