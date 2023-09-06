interface LayoutProps {
  children: React.ReactNode;
  auth: React.ReactNode;
}

export default function Layout({ children, auth }: LayoutProps) {
  return (
    <>
      <div>{children}</div>
      <div>{auth}</div>
    </>
  );
}
