// indicator
import CustomIndicator from './indicator/Indicator';
import SuspendIndicator from './indicator/SuspendIndicator';
// layout
import Content from './layout/Content';
import Footer from './layout/Footer';
import Header from './layout/Header';

// wrapper
import WithIndicator from './wrapper/WithIndicator';

// export
export const Indicator = CustomIndicator;
export const DelayedFallback = SuspendIndicator;
export const ContentLayout = Content;
export const FooterLayout = Footer;
export const HeaderLayout = Header;
export const WithIndicatorWrapper = WithIndicator;
