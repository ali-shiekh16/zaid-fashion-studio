import Footer from '@/components/layout/footer';
import NavBgWrapper from '@/components/layout/nav-bg-wrapper';
import Newsletter from '@/components/layout/newsletter';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBgWrapper />
      {children}
      <Newsletter />
      <Footer />
    </>
  );
}
