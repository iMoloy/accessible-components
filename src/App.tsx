import { useState, useRef } from 'react';
import { Modal } from './playground/Modal';
import { Tabs } from './playground/Tabs';
import { Disclosure } from './playground/Disclosure';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalTriggerRef = useRef<HTMLButtonElement>(null);

  const tabItems = [
    {
      id: "tab1",
      label: "Profile",
      content: <p>This is the profile tab content.</p>,
    },
    {
      id: "tab2",
      label: "Settings",
      content: <p>This is the settings tab content.</p>,
    },
    {
      id: "tab3",
      label: "Billing",
      content: <p>This is the billing tab content.</p>,
    },
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Accessible Components Playground</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2>1. Modal Dialog</h2>
        <button
          ref={modalTriggerRef}
          onClick={() => setIsModalOpen(true)}
          style={{ padding: '10px 15px', cursor: 'pointer' }}
        >
          Open Modal
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Example Modal"
          description="This is an accessible modal dialog."
          triggerRef={modalTriggerRef}
        >
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button onClick={() => setIsModalOpen(false)}>Confirm</button>
          </div>
        </Modal>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>2. Tabs</h2>
        <Tabs items={tabItems} ariaLabel="User Account Settings" />
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>3. Disclosure (Accordion)</h2>
        <Disclosure id="d1" title="What is Web Accessibility?">
          <p>
            Web accessibility means that websites, tools, and technologies are designed and developed so that people with disabilities can use them.
          </p>
        </Disclosure>
        <Disclosure id="d2" title="Why is it important?">
          <p>
            It is essential for developers and organizations that want to create high-quality websites and web tools, and not exclude people from using their products and services.
          </p>
        </Disclosure>
      </section>
    </div>
  );
}

export default App;
