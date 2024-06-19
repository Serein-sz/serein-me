import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";


export function Navigation() {
  return (
    <NavigationMenu className="w-full p-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <div className={`${navigationMenuTriggerStyle()} cursor-pointer`}>
            Blog
            {/* <NavLink to="/home/blog"> Blog</NavLink> */}
          </div>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <div className={`${navigationMenuTriggerStyle()} cursor-pointer`}>
            Projects
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
