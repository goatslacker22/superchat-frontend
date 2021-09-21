import { collection, onSnapshot, query, where } from '@firebase/firestore';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';

import Card from '@/components/card';

import db from '../../firebase';

import { CardType } from '@/types';
const CardPage = () => {
  const router = useRouter();
  const [card, setCard] = useState<CardType | null>(null);

  useEffect(() => {
    if (router.query.id) {
      const q = query(
        collection(db, 'cards'),
        where('id', '==', router.query.id)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const card: any = [];
        querySnapshot.forEach((doc) => {
          card.push(doc.data());
        });
        setCard(card[0]);
      });
    }
  }, [router.query]);

  return (
    <div>
      {card && <Card repository={card} color={card.color} icon={card.icon} />}
    </div>
  );
};

export default CardPage;
