import React, { useEffect, useRef } from 'react';
import style from './index.module.less';

function CardView(props: any) {
  const refCardView = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refCardView.current!.scrollTop = refCardView.current!.scrollHeight;
  });

  return (
    <div className={style['wrapper']} ref={refCardView}>
      {props.content.map((item: string, index: number) => {
        if(index == props.content.length - 1) {
          return <div key={'cardview-text' + index} style={{color: 'red'}}>{item}</div>;
        }
        return <div key={'cardview-text' + index}>{item}</div>;
      })}
    </div>
  );
}

export default CardView;
