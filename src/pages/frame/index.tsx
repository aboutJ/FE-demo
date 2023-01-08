import React, { useState } from 'react';
import {
  AliwangwangOutlined,
  BlockOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import '@/assets/style/gobal.less';
import style from './index.module.less';
import ICONIMG from '@/assets/images/react.png';
import { history } from 'umi';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('javascript技巧', '/javascript', <AliwangwangOutlined />, [
    getItem('防抖节流', '/javascript/basic-knowledge', <BlockOutlined />)
  ]),
];

const Frame: React.FC = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuStyle, setMenuStyle] = useState({
    width: 256,
  });

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    if (collapsed) {
      setMenuStyle({
        width: 256,
      });
    } else {
      setMenuStyle({
        width: 80,
      });
    }
  };

  const menuClick: MenuProps['onClick'] = (e) => {
    history.push(e.key)
  }

  return (
    <div className={style['wrapper']}>
      <div className={style['frame-wrapper']} style={menuStyle}>
        {collapsed ? (
          <div className={style['title']}>
            <img className={style['logo-img']} src={ICONIMG} alt="" />
          </div>
        ) : (
          <div className={style['title']}>
            <img className={style['logo-img']} src={ICONIMG} alt="" />
            <div className={style['logo-text']}>场景demo管理后台</div>
          </div>
        )}
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
          onClick={menuClick}
        />
      </div>
      <div className={style['main-header']}>
        <div className={style['header-nav']}>
          <Button className={style['collapse-btn']} type="text" onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <div className={style['router-tags']}></div>
        <div className={style['content']}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Frame;
