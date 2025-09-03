import NavBgWrapper from '@/components/layout/nav-bg-wrapper';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBgWrapper />
      {children}
    </>
  );
}
