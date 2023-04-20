import {
  DashboardOutlined,
  AddToPhotosOutlined,
  AspectRatioOutlined,
  AssignmentTurnedInOutlined,
  AlbumOutlined,
  SwitchCameraOutlined,
  SwitchLeftOutlined,
  DescriptionOutlined,
  AutoAwesomeMosaicOutlined,
  CalendarTodayOutlined,
} from "@material-ui/icons/";

const Menuitems = [
  {
    title: "캘린더",
    icon: CalendarTodayOutlined,
    href: "/main",
  },
  {
    title: "게시판",
    icon: AutoAwesomeMosaicOutlined,
    href: "/tables/basic-table",
  },
  {
    title: "Dashboard",
    icon: DashboardOutlined,
    href: "/dashboards/dashboard",
  },
  {
    title: "Autocomplete",
    icon: AddToPhotosOutlined,
    href: "/form-elements/autocomplete",
  },
  {
    title: "Buttons",
    icon: AspectRatioOutlined,
    href: "/form-elements/button",
  },
  {
    title: "Checkbox",
    icon: AssignmentTurnedInOutlined,
    href: "/form-elements/checkbox",
  },
  {
    title: "Radio",
    icon: AlbumOutlined,
    href: "/form-elements/radio",
  },
  {
    title: "Slider",
    icon: SwitchCameraOutlined,
    href: "/form-elements/slider",
  },
  {
    title: "Switch",
    icon: SwitchLeftOutlined,
    href: "/form-elements/switch",
  },
  {
    title: "Form",
    icon: DescriptionOutlined,
    href: "/form-layouts/form-layouts",
  },
];

export default Menuitems;
