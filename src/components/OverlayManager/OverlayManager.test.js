import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OverlayManager from './OverlayManager';

describe('<OverlayManager />', () => {
  test('it should mount', () => {
    render(<OverlayManager />);
    
    const overlayManager = screen.getByTestId('OverlayManager');

    expect(overlayManager).toBeInTheDocument();
  });
});