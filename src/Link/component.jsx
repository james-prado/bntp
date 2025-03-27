const Link = ({ href, children }) => {
    // handle the special links
    if (href.match(/^(chrome|file|javascript):/)) {
        return (<a href={href} onClick={(e) => {
                e.preventDefault();
                chrome.tabs.create({ url: href }).catch(console.error);
            }}>
        {children}
      </a>);
    }
    return <a href={href}>{children}</a>;
};
export default Link;
