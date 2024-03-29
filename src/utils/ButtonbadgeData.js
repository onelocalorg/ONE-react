//icons for buttonbadge
import eventicon from "../images/icons-badge/Events.svg";
import orgs from "../images/icons-badge/Orgs.svg";
import sharing from "../images/icons-badge/Sharing.svg";
import services from "../images/icons-badge/Services.svg";
import roles from "../images/icons-badge/Roles.svg";
import products from "../images/icons-badge/Products.svg";
import people from "../images/icons-badge/People.svg";
import resources from "../images/icons-badge/Resources.svg";
import groups from "../images/icons-badge/GroupIcon.svg";
import project from "../images/icons-badge/Projects.svg";

const headerFilterData = [
  {
    _id: 0,
    label: "Events",
    icon: eventicon,
    bgColor: "#CB5555",
    to: "/",
  },
  { id: 1, label: "Orgs", icon: orgs, bgColor: "#BF820A", to: "/orgs" },
  {
    id: 2,
    label: "Sharing",
    icon: sharing,
    bgColor: "#197127",
    to: "/sharing",
  },
  {
    id: 3,
    label: "Services",
    icon: services,
    bgColor: "#0E80E8",
    to: "/services",
  },
  { id: 4, label: "Roles", icon: roles, bgColor: "#6AB79D", to: "/roles" },
  {
    id: 5,
    label: "Products",
    icon: products,
    bgColor: "#7744B0",
    to: "/products",
  },
  {
    id: 6,
    label: "People",
    icon: people,
    bgColor: "#BE72A4",
    to: "/peoples",
  },
  {
    id: 7,
    label: "Resources",
    icon: resources,
    bgColor: "#8B491A",
    to: "/resources",
  },
  { id: 8, label: "Gropus", icon: groups, bgColor: "#E8B635", to: "/groups" },
  {
    id: 9,
    label: "Projects",
    icon: project,
    bgColor: "#CB5601",
    to: "/projects",
  },
];

export default headerFilterData;
