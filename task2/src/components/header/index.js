import React from "react";
import { Typography, Breadcrumb } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import "./Header.css";

const items = [
    { to: '/', label: 'Users list', regExp: /^\/*/, translate: 'Список пользователей' },
    { to: '/albums/', label: 'User Album', regExp: /^\/albums\/*/, translate: 'Список альбомов' },
    { to: '/albums/photos/', label: 'Photos', regExp: /^\/albums\/photos\/$/, translate: 'Фото альбома' },
]

const { Text } = Typography;
const Header = ({ location }) => {
    const { pathname, search } = location;
    const getTranslate = () => {
        let username = null;
        const translateStr = items.find(item => item.to === pathname).translate || '';
        if (search) {
            const usernameParam = search.split('&').find(str => str.startsWith('username'));
            if (usernameParam && usernameParam.split('=').length === 2) {
                username = usernameParam.split('=').pop();
            }
        }
        return username ? `${translateStr} пользователя: ${username}` : translateStr;
    }

    return (
        <header id="header">
            <div className="header-row">
                <Breadcrumb>
                    {items.map(({ to, label, regExp }, i) =>
                        ((regExp.test(pathname) && !i) && (
                            <Breadcrumb.Item key={i}>
                                <NavLink to={to}>{label}</NavLink>
                            </Breadcrumb.Item>
                        )) || ((regExp.test(pathname)) && (
                            <Breadcrumb.Item key={i}>
                                {label}
                            </Breadcrumb.Item>
                        ))
                    )}
                </Breadcrumb>
                <Text strong>{getTranslate()}</Text>

            </div>
        </header>
    );
};

export default withRouter(Header);