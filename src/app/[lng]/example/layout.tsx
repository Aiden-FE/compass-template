import { CommonPageProps } from '@/interfaces';

function ExampleLayout({ children }: CommonPageProps) {
  return (
    <section>
      <h1>Example Layout Demo</h1>
      {children}
    </section>
  );
}

export default ExampleLayout;
