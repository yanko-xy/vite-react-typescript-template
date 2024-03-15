import React from 'react';
import { setName, setNameAsync } from '@/store/user/index';
import { RootState } from '@/store';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

const Layout = () => {
    const username = useAppSelector((state: RootState) => state.user.username);
    const dispatch = useAppDispatch();

    const clickHandler = () => {
        dispatch(
            setName({
                name: 'newsheep'
            })
        );
    };

    const clickHandlerAsync = () => {
        dispatch(setNameAsync('sheepnb'));
    };

    return (
        <div>
            layout
            {username}
            <Header />
            <AntdButton onClick={clickHandler}>同步</AntdButton>
            <AntdButton onClick={clickHandlerAsync}>异步</AntdButton>
            <IconMdiAccountBox />
        </div>
    );
};

export default Layout;
