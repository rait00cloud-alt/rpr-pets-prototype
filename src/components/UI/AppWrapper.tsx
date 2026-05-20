import HeaderComponent from './Header';
import FooterComponent from './Footer';
import FloatingActionButton from './FloatingActionButton';

export default function AppWrapper({ children }: any) {
  return (
    <>
      
      <main>{children}</main>
      
    </>
  );
}
