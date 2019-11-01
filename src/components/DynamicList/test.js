import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ordinal from 'ordinal-number-suffix';

import DynamicList from '.';

describe('DynamicList', () => {
  let header;
  let placeholder;
  let elements;
  let setElementsMock;

  beforeEach(() => {
    header = 'Ingredients';
    placeholder = 'ingredient';
    elements = [null];
    setElementsMock = jest.fn();
  });

  it('renders', () => {
    const { getByTestId } = render(
      <DynamicList
        header={header}
        placeholder={placeholder}
        elements={elements}
        setElements={setElementsMock}
      />,
    );

    expect(getByTestId('DynamicList')).toBeInTheDocument();
  });

  it('renders as many fields as elements has', () => {
    const { getByPlaceholderText } = render(
      <DynamicList
        header={header}
        placeholder={placeholder}
        elements={elements.concat('')}
        setElements={setElementsMock}
      />,
    );

    expect(
      getByPlaceholderText(`${ordinal(1)} ${placeholder}`),
    ).toBeInTheDocument();
    expect(
      getByPlaceholderText(`${ordinal(2)} ${placeholder}`),
    ).toBeInTheDocument();
  });

  it('renders delete button on subsequent fields only', () => {
    const { container, getByPlaceholderText } = render(
      <DynamicList
        header={header}
        placeholder={placeholder}
        elements={elements.concat('')}
        setElements={setElementsMock}
      />,
    );

    expect(
      getByPlaceholderText(`${ordinal(2)} ${placeholder}`),
    ).toBeInTheDocument();

    expect(
      container.querySelector('span.ant-input-suffix'),
    ).toBeInTheDocument();
  });

  it('add button adds another field', () => {
    const { getByText } = render(
      <DynamicList
        header={header}
        placeholder={placeholder}
        elements={elements.concat('two')}
        setElements={setElementsMock}
      />,
    );

    fireEvent.click(getByText(`Add ${placeholder}`));
    expect(setElementsMock).toHaveBeenCalledWith([null, 'two', null]);
  });

  it('delete button removes corresponding field', () => {
    const { container } = render(
      <DynamicList
        header={header}
        placeholder={placeholder}
        elements={elements.concat('two', 'three')}
        setElements={setElementsMock}
      />,
    );

    fireEvent.click(container.querySelector('button'));
    expect(setElementsMock).toHaveBeenCalledWith([null, 'three']);
  });
});
