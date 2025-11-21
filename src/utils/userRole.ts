type SidebarIcon =
  | "home-outline"
  | "receipt-outline"
  | "grid-outline"
  | "list-outline"
  | "fast-food-outline"
  | "cube-outline"
  | "people-outline"
  | "pricetag-outline"
  | "cash-outline"
  | "card-outline"
  | "bar-chart-outline"
  | "settings-outline"
  | "person-outline"
  | "shield-outline";


interface SidebarItem {
  label: string;
  icon: SidebarIcon;
  route: string;
}

export const SidebarOptions: Record<string, SidebarItem> = {
  Dashboard: { label: "Dashboard", icon: "home-outline", route: "Dashboard" },
  Orders: { label: "Orders", icon: "receipt-outline", route: "Orders" },
  Categories: { label: "Categories", icon: "grid-outline", route: "Categories" },
  SubCategories: { label: "Subcategories", icon: "list-outline", route: "SubCategories" },
  FoodItems: { label: "Food Items", icon: "fast-food-outline", route: "FoodItems" },
  Inventory: { label: "Inventory", icon: "cube-outline", route: "Inventory" },
  Staffs: { label: "Staff", icon: "people-outline", route: "Staffs" },
  Discounts: { label: "Discounts", icon: "pricetag-outline", route: "Discounts" },
  Taxes: { label: "Taxes", icon: "cash-outline", route: "Taxes" },
  Payments: { label: "Payments", icon: "card-outline", route: "Payments" },
  Reports: { label: "Reports", icon: "bar-chart-outline", route: "Reports" },
  Settings: { label: "Settings", icon: "settings-outline", route: "Settings" },
  Admins: { label: "Admins", icon: "person-outline", route: "Admins" },
  GroupAdmins: { label: "Group Admins", icon: "shield-outline", route: "GroupAdmins" },
};

export const RoleAccess = {
  superadmin: [
    "Dashboard",
    "GroupAdmins",
    "Admins",
    "Taxes",
    "Reports",
    "Settings",
  ],
  groupadmin: [
    "Dashboard",
    "Admins",
    "Discounts",
    "Payments",
    "Reports",
    "Settings",
  ],
  admin: [
    "Dashboard",
    "Staffs",
    "Categories",
    "SubCategories",
    "FoodItems",
    "Orders",
    "Inventory",
    "Payments",
  ],
  staff: [
    "Dashboard",
    "Orders",
    "Payments",
  ],
};
