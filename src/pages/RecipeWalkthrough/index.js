import React, { useContext, useState } from 'react';
import { Button } from 'antd';

import UserContext from '../../contexts/UserContext';
import asPage from '../../hocs/asPage';
import styles from './styles.css';

const RecipeWalkthrough = ({ className, match, history, setDocumentTitle }) => {
  const {
    params: { id },
  } = match;
  const { findRecipe } = useContext(UserContext);
  const { directions } = findRecipe(id);

  const [index, setIndex] = useState(0);
  const handleNextStep = () => {
    if (index < directions.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePreviousStep = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  return (
    <div>
      {directions[index]}
      <div>
        <span>
          <Button type="primary" onClick={handlePreviousStep}>
            Back
          </Button>
          <Button type="primary" onClick={handleNextStep}>
            Next
          </Button>
        </span>
      </div>
    </div>
  );
};

export default RecipeWalkthrough;
