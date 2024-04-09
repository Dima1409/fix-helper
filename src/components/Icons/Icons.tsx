import { IconType } from "react-icons";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiTwotoneEdit, AiOutlineLogout, AiOutlineHome } from "react-icons/ai";
import { IoMdLogIn } from "react-icons/io";
import { MdDoneOutline, MdAccessibilityNew } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { FaAngleUp } from "react-icons/fa";
import { theme } from "theme/theme";

interface CustomIconProps {
  icon: IconType;
  size?: string;
  color?: string;
}

const defaultSize = window.devicePixelRatio > 1 ? "30" : "25";
const defaultColor = theme.colors.accent;

const CustomIcon: React.FC<CustomIconProps> = ({ icon: Icon, size, color }) => {
  const iconSize = size || defaultSize;
  const iconColor = color || defaultColor;

  return <Icon size={iconSize} color={iconColor} />;
};

const IconWrapper: React.FC<{
  icon: IconType;
  size?: string;
  color?: string;
}> = ({ icon, size, color }) => (
  <CustomIcon icon={icon} size={size} color={color} />
);

const HomeIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={AiOutlineHome} {...props} />
);

const SigInIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={MdAccessibilityNew} {...props} />
);

const LoginIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={IoMdLogIn} {...props} />
);

const DeleteIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={RiDeleteBinLine} {...props} />
);

const EditIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={AiTwotoneEdit} {...props} />
);

const DoneIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={MdDoneOutline} {...props} />
);

const CloseIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={GrClose} {...props} />
);

const LogOutIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={AiOutlineLogout} {...props} />
);

const TopIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={FaAngleUp} {...props} />
);

export {
  HomeIcon,
  SigInIcon,
  LoginIcon,
  DeleteIcon,
  EditIcon,
  DoneIcon,
  CloseIcon,
  LogOutIcon,
  TopIcon,
};