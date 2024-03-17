import React from 'react'
import { useSelector } from 'react-redux'

export const Button = ({ category, onClick }) => {
	const activeCategory = useSelector(state => state.category.category)

	return (
		<button
			onClick={onClick}
			className={
				activeCategory === category
					? 'bg-violet-800 text-white font-bold py-2 px-4 border border-violet-800 rounded cursor-pointer sm:p-1 xsm:p-[2px] sm:text-sm xsm:text-xs'
					: 'bg-violet-200 hover:bg-violet-300 text-black font-bold py-2 px-4 border border-violet-200 rounded cursor-pointer sm:p-1 xsm:p-[2px] sm:text-sm xsm:text-xs'
			}
		>
			{category}
		</button>
	)
}
