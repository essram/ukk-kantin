import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as PiIcons from "react-icons/pi";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import { IconType } from "react-icons";

type IconSetKey = 'Fa' | 'Md' | 'Pi' | 'Bi' | 'Ai' | 'Ri';

const iconSets: Record<IconSetKey, Record<string, IconType>> = {
  Fa: FaIcons,
  Md: MdIcons,
  Pi: PiIcons,
  Bi: BiIcons,
  Ai: AiIcons,
  Ri: RiIcons
};

interface DynamicIconProps {
  iconName: string;
  size?: number;
  color?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  iconName,
  size = 24,
  color = "#000",
}) => {
  const prefix = iconName?.slice(0, 2) as IconSetKey;
  const iconLib = iconSets[prefix];
  const Icon = iconLib?.[iconName as keyof typeof iconLib];

  return Icon ? <Icon size={size} color={color} /> : null;
};

export default DynamicIcon;
