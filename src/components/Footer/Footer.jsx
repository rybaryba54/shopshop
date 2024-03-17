import React from 'react'

export const Footer = () => {
	return (
		<div className='text-xs sm:text-sm flex pb-2 pt-2 font-medium fixed left-0 bottom-0 w-full justify-between bg-violet-100 z-20'>
			<div className='flex justify-between w-full max-w-[1280px] mx-auto'>
				<p className='ml-6'>г.Новосибирск</p>
				<div className='text-right relative mr-6'>
					<a className='phone' href='tel:+7-913-381-06-76'>
						+7-913-381-06-76
					</a>
					<p>Заявки принимаются ежедневно с 9-00 до 23-00</p>
				</div>
			</div>
		</div>
	)
}
