import React from 'react';
import { ReactComponent as DelteSVG } from '../../assets/trash-solid.svg';
import { ReactComponent as EditSVG } from '../../assets/edit-solid.svg';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../store/itemsSlice/itemsSlice';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

export const Card = (props) => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickDelete = () => {
    const result = window.confirm('Удалить?');
    if (result) {
      dispatch(deleteItem(props.id));
    }
  };

  const onClickEdit = () => {
    navigate(`/items/${props.id}`);
  };

  return (
    <div className="container h-full max-h-[352px] md:max-h-[448px] lgsm:max-h-[560px]">
      <div className=" lg:max-w-[296px]">
        <div className="bg-white shadow-md h-full hover:shadow-lg transition duration-500 rounded-lg relative">
          <img
            className="rounded-t-md sm:rounded-t-lg h-40 mdsm:h-48 lgsm:h-60 sm:h-48 md:h-64 lg:h-64 w-full"
            src={props.productImg}
            alt={props.productName}
          />
          {user && (
            <div className="flex gap-2 sm:gap-3 absolute z-10 right-1 top-1 sm:right-3 sm:top-3">
              <EditSVG className="w-4 sm:w-5 cursor-pointer" onClick={onClickEdit} />
              <DelteSVG onClick={onClickDelete} className="w-3 sm:w-4 cursor-pointer" />
            </div>
          )}
          <div className="py-2 md:py-4 lg:py-4 px-2 md:px-4 lg:px-4 rounded-lg bg-white flex justify-between flex-col h-40">
            <h1 className="text-gray-700 font-bold text-xs text-justify mdsm:text-sm mdsm:text-center mb-3">
              {props.productName}
            </h1>
            <p className="text-gray-700 font-bold text-xs text-justify mdsm:text-base mdsm:text-center sm:text-sm tracking-wide flex justify-between">
              <span>
                {props.productCount}{' '}
                {props.productUnit === 'kilogramm'
                  ? 'кг.'
                  : props.productUnit === 'gramm'
                  ? 'гр.'
                  : 'шт.'}
              </span>
              <span>{props.productPrice} ₽</span>
            </p>
            {/* <button className="mt-6 py-2 px-4 bg-yellow-400 text-gray-800 font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300">
                Buy Now
              </button> */}
          </div>
          {/* <div className="absolute top-2 right-2 py-2 px-4 bg-white rounded-lg">
              <span className="text-md">$150</span>
            </div> */}
        </div>
      </div>
    </div>
  );
};
