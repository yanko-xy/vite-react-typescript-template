import { setName, setNameAsync } from '@/store/user/index';

const Layout = () => {
    const { username } = useAppSelector((state) => state.user);
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
