interface INavBarItem {
  label: string;
  iconName: string;
  href: string;
  active: boolean;
}
const NavBarItem = (props: INavBarItem) => {
  const { label, iconName, href, active } = props;
  return <div> </div>;
};

const NavBar = () => {};
