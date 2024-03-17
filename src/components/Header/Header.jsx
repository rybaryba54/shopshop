import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { changeCategory } from '../../store/categorySlice/categorySlice'
import { Button } from '../Button/Button'

export const Header = () => {
	const categories = [
		'Вся продукция',
		'Спорт',
		'Иммунитет',
		'Детокс и очищение организма',
		'Суставы',
		'ANTI-AGE',
		'Поддержка ЖКТ',
		'Микрофлора кишечника',
		'Защита почек',
		'Защита печени',
		'Защита сосудов',
		'Антигеморриальные средства',
		'Поддержка костной ткани',
		'Защита зрения',
		'Профилактика аллергии',
		'Профилактика диабета',
		'Антипаразитарная защита',
		'Поддержка мозга',
		'Успокоительные средства',
		'Красота и здоровье женщин',
		'Детям',
		'Мужчинам',
		'Мультивитамины',
		'Минералы',
		'Омега 3,6,9',
		'Адаптогены',
		'Беременным и кормящим',
		'Вегетарианцам',
		'Парфюм',
		'Уход за лицом',
		'Уход за волосами',
		'Уход за телом',
		'Прочее',
		'Акции',
	]

	const [user, loading, error] = useAuthState(auth)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	return (
		<div className='grid grid-cols-4 xsm:grid-cols-2 sm:grid-cols-4 mt-4 gap-2'>
			{categories.map((category, i) => (
				<Button
					key={i}
					category={category}
					onClick={() => dispatch(changeCategory(category))}
				/>
			))}
			{user && (
				<Button
					category={'Добавить продукт'}
					onClick={() => navigate('/dashboard')}
				/>
			)}
		</div>
	)
}
