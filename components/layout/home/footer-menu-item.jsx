const FooterMenu = ({children, className = ""}) => {
    return (
        <div className={`footer-menu ${className}`}>
            { children }
        </div>
    )
}

function Item({ children, className = "" }) {
    return (
        <div className={`footer-menu-item ${className}`}>
            {children}
        </div>
    )
}

function List({ children, className = "" }) {
    return (
        <div className={`footer-menu-list ${className}`}>
            {children}
        </div>
    )
}

FooterMenu.Item = Item;
FooterMenu.List = List;
export default FooterMenu;