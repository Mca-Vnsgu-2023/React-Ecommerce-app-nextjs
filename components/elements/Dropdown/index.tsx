import Link from "next/link";
import React from "react";
import { Dropdown as BSDropdown } from "react-bootstrap";
import { DropDirection } from "react-bootstrap/esm/DropdownContext";
import { useSelector } from "react-redux";


interface IDropdown {
    title: string,
    items: string[],
    drop?: DropDirection | undefined,
    linkPrefix: string
}

function Dropdown(props: IDropdown) {

    const { title, items, drop, linkPrefix } = props
    const { themeMode } = useSelector((state: any) => state.theme)

    return (
        <BSDropdown drop={drop || 'end'}>
            <BSDropdown.Toggle as={CustomToggle} id="dropdown-basic">
                {title}
            </BSDropdown.Toggle>
            <BSDropdown.Menu variant={themeMode} as={CustomMenu}>
                {items.map((item, index) => (
                    <BSDropdown.Item  as={CustomLink} key={index} href={`${linkPrefix || ''}/${item}`}>{item}</BSDropdown.Item>
                ))}
            </BSDropdown.Menu>
        </BSDropdown>
    )

}

export default Dropdown

interface ILink {
    children: string
    href: string
    className: string
  }
  
  const CustomLink = React.forwardRef<ILink, any>((props, ref) => {
    const { children, href, className } = props
    return (<Link className={className} href={href}>{children}</Link>)
  });
  
  CustomLink.displayName = 'CustomLink'
  
  interface IProps {
    onClick: React.MouseEventHandler<HTMLAnchorElement>,
    children: string,
    className: string
  }
  
  const CustomToggle = React.forwardRef<any>((props, ref) => {
    const { children, onClick, className } = props as IProps
    return (
      <a
        href="#"
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
        &nbsp; {className.includes('show') ? <i className="fa-solid fa-caret-up"></i> :
          <i className="fa-solid fa-caret-down"></i>}
      </a>
    )
  });
  CustomToggle.displayName = 'CustomToggle';
  
  const CustomMenu = React.forwardRef<any>(
    (props, ref) => {
      const { children, style, className, 'aria-labelledby': labeledBy } = props as any
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {children.map((x: any) => {
              return x
            })}
          </ul>
        </div>
      );
    },
  );
  CustomMenu.displayName = 'CustomMenu';