import React from 'react';
import PropTypes from 'prop-types';

import ProblemTypeSelect from './content/ProblemTypeSelect';
import Preview from './content/Preview';
import AdvanceTypeSelect from './content/AdvanceTypeSelect';
import SelectTypeWrapper from './SelectTypeWrapper';
import hooks from './hooks';
import { Col, Container, Row } from '@edx/paragon';
import { AdvanceProblemKeys } from '../../../../data/constants/problem';

export const SelectTypeModal = ({
  onClose,
}) => {
  const { selected, setSelected } = hooks.selectHooks();
  hooks.useArrowNav(selected, setSelected);

  return (
    <SelectTypeWrapper onClose={onClose} selected={selected}>
      <Container className="mx-4 my-3 px-3 py-2">
        <Row className="justify-content-center">
        {(!Object.values(AdvanceProblemKeys).includes(selected)) ? (
          <>
            <Col>
              <ProblemTypeSelect selected={selected} setSelected={setSelected} />
            </Col>
            <Col>
              <Preview problemType={selected} />
            </Col>
          </>
        ) : <AdvanceTypeSelect selected={selected} setSelected={setSelected} />}
        </Row>
      </Container>
    </SelectTypeWrapper>
  );
};

SelectTypeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SelectTypeModal;
