import React from 'react';

function ExampleLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <h1>Example Layout Demo</h1>
      {children}
    </section>
  );
}

export default ExampleLayout;
