import React, { useEffect } from 'react';
import { Card } from '../../components/Card/Card';
import { collection, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../../store/itemsSlice/itemsSlice';

export const Home = () => {
  const dispatch = useDispatch();

  const { items, loading } = useSelector((state) => state.items);
  const { category } = useSelector((state) => state.category);
  const productsCollection = collection(db, 'products');

  useEffect(() => {
    let firstQ = query(productsCollection);
    dispatch(fetchItems(firstQ));
  }, []);

  return (
    <>
      {loading !== 'succeeded' && <div className="load"></div>}
      {loading === 'succeeded' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 my-4 pb-20">
          {category !== 'Вся продукция'
            ? items
                .slice()
                .sort((a, b) => {
                  if (a.productCategory > b.productCategory) {
                    return 1;
                  }
                  if (a.productCategory < b.productCategory) {
                    return -1;
                  }
                  return 0;
                })
                .filter((item) => item.productCategory === category)
                .map((item) => <Card key={item.id} {...item} />)
            : items
                .slice()
                .sort((a, b) => {
                  if (a.productCategory > b.productCategory) {
                    return 1;
                  }
                  if (a.productCategory < b.productCategory) {
                    return -1;
                  }
                  return 0;
                })
                .map((item) => <Card key={item.id} {...item} />)}
        </div>
      )}
    </>
  );
};
