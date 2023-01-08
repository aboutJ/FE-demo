import React, { useState } from 'react';
import style from './index.module.less';
import { Button, Col, Row, Input, message } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import CardView from '@/components/cardview';

const str = `您点击了一次`;

const Func: React.FC = (props) => {
  const [size, setSize] = useState<SizeType>('large');
  const [list, setList] = useState<String[]>([]);
  const [debounceTask, setDebounceTask] = useState<any>();

  const notThrottle = () => {
    let res = '';
    res = str + '非节流操作按钮';
    setList([...list, res]);
  };

  const throttleClick = () => {
    let res = '';
    res = str + '节流操作按钮';
    setList([...list, res]);
  };

  const throttle = (func: any, delay: number) => {
    return function() {
      if(func.id) {
        return;
      }
      func.id = setTimeout(func, delay);
    }
  }

  const notDebounce = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = e.target;
    if(value) {
      message.info(value);
    }
  }

  const debounce = (func: any, delay: number) => {
    return function() {
      if(debounceTask) {
        clearTimeout(debounceTask);
      }
      setDebounceTask(setTimeout(func, delay));
    }
  }

  const debounceOpt = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    return debounce(function() {
      message.info(e.target.value);
    },1000);
  }

  return (
    <div className={style['func-wrapper']}>
      <Row>
        <Col span={12}>
          <Button
            type="primary"
            size={size}
            style={{ marginRight: '100px' }}
            onClick={notThrottle}
          >
            非节流操作
          </Button>
          <Button type="primary" size={size} onClick={throttle(throttleClick, 1000)}>
            节流操作
          </Button>
          <div className={style['board']}>
            <CardView content={list} />
          </div>
        </Col>
        <Col span={12}>
          <Row justify="space-between">
            <Col span={11}>
              <Input placeholder="非防抖操作" onChange={notDebounce} allowClear />
            </Col>
            <Col span={11}>
              <Input placeholder="防抖操作" onChange={(e) => {debounceOpt(e)()}} allowClear />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Func;
