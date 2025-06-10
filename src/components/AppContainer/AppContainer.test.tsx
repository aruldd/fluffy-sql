import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { AppContainer } from './AppContainer';

import '@testing-library/jest-dom';

// Mock the child components to simplify testing
vi.mock('../SideNavBar/SideNavBar', () => ({
  SideNavBar: () => <nav>Side Navigation</nav>,
}));

vi.mock('../CodeEditor/CodeEditor', () => ({
  __esModule: true,
  default: () => (
    <div role="textbox" aria-label="SQL Editor">
      Code Editor
    </div>
  ),
}));

vi.mock('../Output/Output', () => ({
  Output: () => (
    <div role="log" aria-label="Query Results">
      Query Results
    </div>
  ),
}));

vi.mock('../QueryTabs/QueryTabs', () => ({
  QueryTabs: () => <div role="tablist">Query Tabs</div>,
}));

describe('AppContainer', () => {
  const renderComponent = () => {
    return render(
      <MantineProvider>
        <AppContainer />
      </MantineProvider>
    );
  };

  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /sql editor/i })).toBeInTheDocument();
    expect(screen.getByRole('log', { name: /query results/i })).toBeInTheDocument();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders with correct layout structure', () => {
    renderComponent();

    // Check if the main content area has the correct class
    const contentArea = document.querySelector('.contentArea');
    expect(contentArea).toBeInTheDocument();

    // Check if the allotment panes are rendered
    const allotmentPanes = document.querySelectorAll('.allotment-pane');
    expect(allotmentPanes.length).toBe(2);
  });
});
